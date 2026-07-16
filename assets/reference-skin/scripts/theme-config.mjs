import fs from "node:fs";
import path from "node:path";

const [mode, configPath, backupPath] = process.argv.slice(2);
if (!mode || !configPath || !backupPath) {
  throw new Error("Usage: theme-config.mjs <install|restore> <config> <backup>");
}

const keys = ["appearanceTheme", "appearanceLightCodeThemeId", "appearanceLightChromeTheme"];
const settings = new Map([
  ["appearanceTheme", 'appearanceTheme = "light"'],
  ["appearanceLightCodeThemeId", 'appearanceLightCodeThemeId = "codex"'],
  ["appearanceLightChromeTheme", 'appearanceLightChromeTheme = { accent = "#E7903E", contrast = 58, fonts = { code = "SF Mono", ui = "PingFang SC" }, ink = "#493620", opaqueWindows = true, semanticColors = { diffAdded = "#BFD9B0", diffRemoved = "#F1B49B", skill = "#E6A23C" }, surface = "#FFF8DF" }'],
]);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sectionBounds(content) {
  const match = /^\[desktop\][ \t]*\r?\n/gm.exec(content);
  if (!match) return null;
  const start = match.index + match[0].length;
  const rest = content.slice(start);
  const next = /^\[[^\r\n]+\][ \t]*$/m.exec(rest);
  return { headerStart: match.index, start, end: next ? start + next.index : content.length };
}

function ensureDesktop(content) {
  if (sectionBounds(content)) return content;
  return `${content.trimEnd()}${content.trim() ? "\n\n" : ""}[desktop]\n`;
}

function setLine(content, key, line) {
  content = ensureDesktop(content);
  const bounds = sectionBounds(content);
  let body = content.slice(bounds.start, bounds.end);
  const pattern = new RegExp(`^${escapeRegex(key)}\\s*=.*$`, "m");
  if (pattern.test(body)) body = body.replace(pattern, line);
  else body = `${body.trimEnd()}${body.trim() ? "\n" : ""}${line}\n`;
  return content.slice(0, bounds.start) + body + content.slice(bounds.end);
}

function savedLine(content, key) {
  const bounds = sectionBounds(content);
  if (!bounds) return null;
  const body = content.slice(bounds.start, bounds.end);
  return body.match(new RegExp(`^${escapeRegex(key)}\\s*=.*$`, "m"))?.[0] ?? null;
}

function removeLine(content, key) {
  const bounds = sectionBounds(content);
  if (!bounds) return content;
  const body = content.slice(bounds.start, bounds.end);
  const pattern = new RegExp(`^${escapeRegex(key)}\\s*=.*(?:\\r?\\n|$)`, "m");
  return content.slice(0, bounds.start) + body.replace(pattern, "") + content.slice(bounds.end);
}

function removeEmptyDesktopSection(content) {
  const bounds = sectionBounds(content);
  if (!bounds || content.slice(bounds.start, bounds.end).trim()) return content;
  const before = content.slice(0, bounds.headerStart).trimEnd();
  const after = content.slice(bounds.end).replace(/^[\r\n]+/, "");
  if (!before) return after;
  return `${before}${after ? "\n\n" : "\n"}${after}`;
}

fs.mkdirSync(path.dirname(backupPath), { recursive: true });
if (mode === "install") {
  if (!fs.existsSync(configPath)) throw new Error(`Codex config not found: ${configPath}`);
  if (!fs.existsSync(backupPath)) fs.copyFileSync(configPath, backupPath);
  let content = fs.readFileSync(configPath, "utf8");
  for (const [key, line] of settings) content = setLine(content, key, line);
  fs.writeFileSync(configPath, content.endsWith("\n") ? content : `${content}\n`, "utf8");
} else if (mode === "restore") {
  if (!fs.existsSync(backupPath)) throw new Error("No pre-install config backup is available.");
  let content = fs.readFileSync(configPath, "utf8");
  const backup = fs.readFileSync(backupPath, "utf8");
  for (const key of keys) {
    const line = savedLine(backup, key);
    content = line ? setLine(content, key, line) : removeLine(content, key);
  }
  if (!sectionBounds(backup)) content = removeEmptyDesktopSection(content);
  fs.writeFileSync(configPath, content.endsWith("\n") ? content : `${content}\n`, "utf8");
} else {
  throw new Error(`Unknown mode: ${mode}`);
}
