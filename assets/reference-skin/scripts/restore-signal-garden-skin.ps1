param(
  [int]$Port = 9335,
  [switch]$Uninstall,
  [switch]$RestoreBaseTheme
)

. "$PSScriptRoot\lib.ps1"

Test-SignalGardenPort -Port $Port
$node = Get-SignalGardenNode
$stateRoot = $Script:SignalGardenStateRoot
$statePath = Join-Path $stateRoot "state.json"
if (Test-Path -LiteralPath $statePath) {
  try {
    $state = Get-Content -Raw -LiteralPath $statePath | ConvertFrom-Json
    if ($state.port) { $Port = [int]$state.port }
  } catch {
  }
}

Stop-SignalGardenInjector -StatePath $statePath
Start-Sleep -Milliseconds 200
if (Test-SignalGardenTargets -Port $Port) {
  & $node (Join-Path $Script:SignalGardenScriptDir "injector.mjs") --remove --port $Port --timeout-ms 3000 *> $null
}
Remove-Item -LiteralPath $statePath -Force -ErrorAction SilentlyContinue

if ($Uninstall) {
  $desktop = if ($env:CODEX_SKIN_KIT_SIGNAL_GARDEN_DESKTOP_DIR) {
    $env:CODEX_SKIN_KIT_SIGNAL_GARDEN_DESKTOP_DIR
  } else {
    [Environment]::GetFolderPath("Desktop")
  }
  Remove-Item -LiteralPath (Join-Path $desktop "Signal Garden.cmd") -Force -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath (Join-Path $desktop "Signal Garden - Restore.cmd") -Force -ErrorAction SilentlyContinue
}

if ($RestoreBaseTheme) {
  $configPath = Get-SignalGardenConfigPath
  & $node (Join-Path $Script:SignalGardenScriptDir "theme-config.mjs") restore $configPath (Join-Path $stateRoot "config.before-signal-garden-skin.toml")
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host "Signal Garden has been removed from the current window when a CDP target was available."
