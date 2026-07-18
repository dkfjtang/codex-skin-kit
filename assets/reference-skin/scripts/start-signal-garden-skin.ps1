param(
  [int]$Port = 9335,
  [switch]$RestartExisting,
  [string]$AppPath = "",
  [string]$ProfilePath = "",
  [switch]$ForegroundInjector,
  [string]$Screenshot = ""
)

. "$PSScriptRoot\lib.ps1"

Test-SignalGardenPort -Port $Port
$node = Get-SignalGardenNode
$app = Get-SignalGardenCodexPath -AppPath $AppPath
$injector = Join-Path $Script:SignalGardenScriptDir "injector.mjs"
$stateRoot = $Script:SignalGardenStateRoot
$statePath = Join-Path $stateRoot "state.json"
$stdoutPath = Join-Path $stateRoot "injector.log"
$stderrPath = Join-Path $stateRoot "injector-error.log"
New-Item -ItemType Directory -Force -Path $stateRoot | Out-Null

$debugReady = Test-SignalGardenTargets -Port $Port
if (-not $debugReady -and (Test-SignalGardenPortInUse -Port $Port)) {
  Stop-SignalGarden "Port $Port is already in use. Use --Port to choose another port."
}

$running = @(Get-SignalGardenCodexProcesses)
if (-not $debugReady -and -not $ProfilePath -and $running.Count -gt 0) {
  if (-not $RestartExisting) {
    Stop-SignalGarden "Codex is running without the requested CDP port. Close it first, or use -RestartExisting."
  }
  $running | Stop-Process -Force -ErrorAction SilentlyContinue
  Start-Sleep -Milliseconds 500
}

if (-not (Test-SignalGardenTargets -Port $Port)) {
  $args = @("--remote-debugging-address=127.0.0.1", "--remote-debugging-port=$Port")
  if ($ProfilePath) {
    New-Item -ItemType Directory -Force -Path $ProfilePath | Out-Null
    $args += "--user-data-dir=$ProfilePath"
  }
  Start-Process -FilePath $app -ArgumentList $args -WindowStyle Hidden | Out-Null
}

$ready = $false
for ($i = 0; $i -lt 100; $i++) {
  if (Test-SignalGardenTargets -Port $Port) { $ready = $true; break }
  Start-Sleep -Milliseconds 300
}
if (-not $ready) {
  Stop-SignalGarden "Codex did not expose CDP on 127.0.0.1:$Port within 30 seconds."
}

Stop-SignalGardenInjector -StatePath $statePath
if ($ForegroundInjector) {
  & $node $injector --watch --port $Port
  exit $LASTEXITCODE
}

$process = Start-Process -FilePath $node -ArgumentList @($injector, "--watch", "--port", "$Port") -RedirectStandardOutput $stdoutPath -RedirectStandardError $stderrPath -WindowStyle Hidden -PassThru
[pscustomobject]@{
  port = $Port
  injectorPid = $process.Id
  startedAt = (Get-Date).ToUniversalTime().ToString("o")
  skillRoot = $Script:SignalGardenSkillRoot
  profilePath = $(if ($ProfilePath) { $ProfilePath } else { $null })
  appPath = $app
} | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $statePath -Encoding UTF8

$verified = $false
for ($i = 0; $i -lt 45; $i++) {
  Start-Sleep -Milliseconds 700
  $verifyArgs = @($injector, "--verify", "--port", "$Port")
  if ($Screenshot) { $verifyArgs += @("--screenshot", $Screenshot) }
  & $node @verifyArgs *> $null
  if ($LASTEXITCODE -eq 0) { $verified = $true; break }
}
if (-not $verified) {
  Stop-SignalGarden "Skin started, but automatic verification failed. See $stderrPath"
}

Write-Host "Signal Garden is active on 127.0.0.1:$Port"
