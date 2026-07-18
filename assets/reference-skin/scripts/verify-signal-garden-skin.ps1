param(
  [int]$Port = 9335,
  [string]$Screenshot = "",
  [switch]$Reload
)

. "$PSScriptRoot\lib.ps1"

Test-SignalGardenPort -Port $Port
$node = Get-SignalGardenNode
$arguments = @((Join-Path $Script:SignalGardenScriptDir "injector.mjs"), "--verify", "--port", "$Port")
if ($Screenshot) { $arguments += @("--screenshot", $Screenshot) }
if ($Reload) { $arguments += "--reload" }
& $node @arguments
exit $LASTEXITCODE
