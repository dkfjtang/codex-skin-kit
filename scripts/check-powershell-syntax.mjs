import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "assets/reference-skin/scripts/lib.ps1",
  "assets/reference-skin/scripts/install-signal-garden-skin.ps1",
  "assets/reference-skin/scripts/start-signal-garden-skin.ps1",
  "assets/reference-skin/scripts/verify-signal-garden-skin.ps1",
  "assets/reference-skin/scripts/restore-signal-garden-skin.ps1",
];

const shell = process.platform === "win32" ? "powershell" : "pwsh";
const probe = spawnSync(shell, ["-NoProfile", "-Command", "$PSVersionTable.PSVersion.ToString()"], {
  encoding: "utf8",
});

if (probe.status !== 0) {
  if (process.env.CI_WINDOWS_REQUIRED === "1") {
    console.error(`PowerShell syntax check required, but ${shell} was not available.`);
    process.exit(1);
  }
  console.log("PowerShell syntax check skipped: PowerShell is not available on this platform.");
  process.exit(0);
}

const failures = [];
for (const rel of files) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    failures.push(`missing PowerShell script: ${rel}`);
    continue;
  }
  const command = `[scriptblock]::Create((Get-Content -Raw -LiteralPath '${full.replaceAll("'", "''")}')) | Out-Null`;
  const result = spawnSync(shell, ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", command], {
    encoding: "utf8",
  });
  if (result.status !== 0) {
    failures.push(`${rel}: ${result.stderr || result.stdout}`.trim());
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("PowerShell syntax scan passed.");
