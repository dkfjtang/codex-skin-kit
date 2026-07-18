param(
  [string]$InstallRoot = $(if ($env:CODEX_SKIN_KIT_SIGNAL_GARDEN_INSTALL_ROOT) { $env:CODEX_SKIN_KIT_SIGNAL_GARDEN_INSTALL_ROOT } else { Join-Path $HOME ".codex\skills\codex-skin-kit-signal-garden" }),
  [switch]$NoLaunchers
)

. "$PSScriptRoot\lib.ps1"

$node = Get-SignalGardenNode
$sourceRoot = Split-Path -Parent $PSScriptRoot
$stateRoot = $Script:SignalGardenStateRoot
New-Item -ItemType Directory -Force -Path $stateRoot | Out-Null
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $InstallRoot) | Out-Null

if (Test-Path -LiteralPath $InstallRoot) {
  Remove-Item -LiteralPath $InstallRoot -Recurse -Force
}
Copy-Item -LiteralPath $sourceRoot -Destination $InstallRoot -Recurse -Force

$configPath = Get-SignalGardenConfigPath
& $node (Join-Path $InstallRoot "scripts\theme-config.mjs") install $configPath (Join-Path $stateRoot "config.before-signal-garden-skin.toml")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (-not $NoLaunchers) {
  New-SignalGardenLauncher -Name "Signal Garden" -ScriptPath (Join-Path $InstallRoot "scripts\start-signal-garden-skin.ps1") -Arguments "-RestartExisting"
  New-SignalGardenLauncher -Name "Signal Garden - Restore" -ScriptPath (Join-Path $InstallRoot "scripts\restore-signal-garden-skin.ps1")
}

Write-Host "Install complete. Signal Garden was copied to $InstallRoot"
Write-Host "Appearance theme fields were backed up and written in $configPath"
