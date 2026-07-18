Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Script:SignalGardenScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Script:SignalGardenSkillRoot = Split-Path -Parent $Script:SignalGardenScriptDir
$Script:SignalGardenStateRoot = if ($env:CODEX_SKIN_KIT_SIGNAL_GARDEN_STATE_ROOT) {
  $env:CODEX_SKIN_KIT_SIGNAL_GARDEN_STATE_ROOT
} else {
  Join-Path $env:APPDATA "Codex Skin Kit\Signal Garden"
}

function Stop-SignalGarden {
  param([string]$Message)
  throw "[signal-garden] $Message"
}

function Test-SignalGardenPort {
  param([int]$Port)
  if ($Port -lt 1024 -or $Port -gt 65535) {
    Stop-SignalGarden "Invalid port: $Port"
  }
}

function Get-SignalGardenNode {
  if ($env:CODEX_SKIN_KIT_SIGNAL_GARDEN_NODE) {
    return $env:CODEX_SKIN_KIT_SIGNAL_GARDEN_NODE
  }
  $command = Get-Command node -ErrorAction SilentlyContinue
  if (-not $command) {
    Stop-SignalGarden "Node.js was not found. Install Node.js 18+ or set CODEX_SKIN_KIT_SIGNAL_GARDEN_NODE."
  }
  return $command.Source
}

function Get-SignalGardenConfigPath {
  if ($env:CODEX_SKIN_KIT_SIGNAL_GARDEN_CONFIG_PATH) {
    return $env:CODEX_SKIN_KIT_SIGNAL_GARDEN_CONFIG_PATH
  }
  return Join-Path $HOME ".codex\config.toml"
}

function Get-SignalGardenCodexPath {
  param([string]$AppPath)
  if ($AppPath) {
    if (Test-Path -LiteralPath $AppPath) { return (Resolve-Path -LiteralPath $AppPath).Path }
    Stop-SignalGarden "Codex app path does not exist: $AppPath"
  }
  if ($env:CODEX_SKIN_KIT_SIGNAL_GARDEN_APP_PATH) {
    $candidate = $env:CODEX_SKIN_KIT_SIGNAL_GARDEN_APP_PATH
    if (Test-Path -LiteralPath $candidate) { return (Resolve-Path -LiteralPath $candidate).Path }
    Stop-SignalGarden "CODEX_SKIN_KIT_SIGNAL_GARDEN_APP_PATH does not exist: $candidate"
  }

  $candidates = @(
    (Join-Path $env:LOCALAPPDATA "Programs\Codex\Codex.exe"),
    (Join-Path $env:LOCALAPPDATA "Programs\OpenAI Codex\Codex.exe"),
    (Join-Path $env:LOCALAPPDATA "Programs\OpenAI\Codex.exe"),
    (Join-Path $env:ProgramFiles "Codex\Codex.exe"),
    (Join-Path $env:ProgramFiles "OpenAI Codex\Codex.exe")
  )
  foreach ($candidate in $candidates) {
    if ($candidate -and (Test-Path -LiteralPath $candidate)) {
      return (Resolve-Path -LiteralPath $candidate).Path
    }
  }

  Stop-SignalGarden "Codex Windows app was not found. Re-run with --AppPath or set CODEX_SKIN_KIT_SIGNAL_GARDEN_APP_PATH."
}

function Test-SignalGardenTargets {
  param([int]$Port)
  try {
    $targets = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/json/list" -TimeoutSec 1
    return [bool](@($targets | Where-Object { $_.type -eq "page" -and $_.url -like "app://*" }).Count)
  } catch {
    return $false
  }
}

function Test-SignalGardenPortInUse {
  param([int]$Port)
  try {
    $client = [System.Net.Sockets.TcpClient]::new()
    $result = $client.BeginConnect("127.0.0.1", $Port, $null, $null)
    $success = $result.AsyncWaitHandle.WaitOne(250, $false)
    if ($success) { $client.EndConnect($result) }
    $client.Close()
    return $success
  } catch {
    return $false
  }
}

function Get-SignalGardenCodexProcesses {
  Get-Process -ErrorAction SilentlyContinue |
    Where-Object { $_.ProcessName -in @("Codex", "OpenAI Codex") }
}

function Stop-SignalGardenInjector {
  param([string]$StatePath)
  if (-not (Test-Path -LiteralPath $StatePath)) { return }
  try {
    $state = Get-Content -Raw -LiteralPath $StatePath | ConvertFrom-Json
    if ($state.injectorPid) {
      Stop-Process -Id ([int]$state.injectorPid) -Force -ErrorAction SilentlyContinue
    }
  } catch {
    return
  }
}

function New-SignalGardenLauncher {
  param(
    [string]$Name,
    [string]$ScriptPath,
    [string]$Arguments = ""
  )
  $desktop = if ($env:CODEX_SKIN_KIT_SIGNAL_GARDEN_DESKTOP_DIR) {
    $env:CODEX_SKIN_KIT_SIGNAL_GARDEN_DESKTOP_DIR
  } else {
    [Environment]::GetFolderPath("Desktop")
  }
  New-Item -ItemType Directory -Force -Path $desktop | Out-Null
  $cmdPath = Join-Path $desktop "$Name.cmd"
  $escapedScript = $ScriptPath.Replace('"', '""')
  $content = "@echo off`r`npowershell -NoProfile -ExecutionPolicy Bypass -File ""$escapedScript"" $Arguments %*`r`n"
  Set-Content -LiteralPath $cmdPath -Value $content -Encoding ASCII
}
