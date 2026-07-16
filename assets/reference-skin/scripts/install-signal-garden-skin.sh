#!/bin/zsh
set -euo pipefail

source "$(dirname "$0")/lib.sh"
PORT=9335
NO_LAUNCHERS=0
NO_COPY=0
while (( $# )); do
  case "$1" in
    --port) PORT="${2:-}"; shift 2 ;;
    --no-launchers) NO_LAUNCHERS=1; shift ;;
    --no-copy) NO_COPY=1; shift ;;
    -h|--help) print -- "Usage: $0 [--port 9335] [--no-launchers] [--no-copy]"; exit 0 ;;
    *) signal_garden_die "未知参数：$1" ;;
  esac
done
signal_garden_validate_port "$PORT"
NODE="$(signal_garden_find_node)"
/bin/mkdir -p "$SIGNAL_GARDEN_STATE_ROOT"

INSTALL_ROOT="$HOME/.codex/skills/codex-skin-kit-signal-garden"
ACTIVE_ROOT="$SIGNAL_GARDEN_SKILL_ROOT"
if (( ! NO_COPY )) && [[ "$SIGNAL_GARDEN_SKILL_ROOT" != "$INSTALL_ROOT" ]]; then
  /bin/mkdir -p "${INSTALL_ROOT:h}"
  /usr/bin/ditto "$SIGNAL_GARDEN_SKILL_ROOT" "$INSTALL_ROOT"
  ACTIVE_ROOT="$INSTALL_ROOT"
  print -- "已将完整工具目录安装到：$INSTALL_ROOT"
fi
/bin/chmod +x "$ACTIVE_ROOT"/scripts/*.sh

CONFIG_PATH="${CODEX_SKIN_KIT_SIGNAL_GARDEN_CONFIG_PATH:-$HOME/.codex/config.toml}"
"$NODE" "$ACTIVE_ROOT/scripts/theme-config.mjs" install "$CONFIG_PATH" "$SIGNAL_GARDEN_STATE_ROOT/config.before-signal-garden-skin.toml"

create_launcher() {
  local name="$1" script_path="$2" extra_arg="$3"
  local desktop_dir="${CODEX_SKIN_KIT_SIGNAL_GARDEN_DESKTOP_DIR:-$HOME/Desktop}"
  local app="$desktop_dir/$name.app"
  local bundle_id="com.local.codex-skin-kit-signal-garden.${script_path:t:r}"
  /bin/mkdir -p "$app/Contents/MacOS"
  /bin/cat > "$app/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleExecutable</key><string>launcher</string>
  <key>CFBundleIdentifier</key><string>$bundle_id</string>
  <key>CFBundleName</key><string>$name</string>
  <key>CFBundleDisplayName</key><string>$name</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleVersion</key><string>1</string>
  <key>CFBundleShortVersionString</key><string>1.0</string>
  <key>LSUIElement</key><true/>
</dict></plist>
PLIST
  local quoted_script="${(q)script_path}"
  /bin/cat > "$app/Contents/MacOS/launcher" <<LAUNCHER
#!/bin/zsh
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:\${PATH:-}"
export CODEX_SKIN_KIT_SIGNAL_GARDEN_NODE=${(q)NODE}
exec $quoted_script --port $PORT $extra_arg >>"\$HOME/Library/Application Support/CodexSkinKitSignalGarden/desktop-launcher.log" 2>&1
LAUNCHER
  /bin/chmod +x "$app/Contents/MacOS/launcher"
  /usr/bin/codesign --force --sign - "$app" >/dev/null 2>&1
  /usr/bin/touch "$app"
}

if (( ! NO_LAUNCHERS )); then
  /bin/mkdir -p "${CODEX_SKIN_KIT_SIGNAL_GARDEN_DESKTOP_DIR:-$HOME/Desktop}"
  create_launcher "Signal Garden" "$ACTIVE_ROOT/scripts/start-signal-garden-skin.sh" "--restart-existing"
  create_launcher "Signal Garden - Restore" "$ACTIVE_ROOT/scripts/restore-signal-garden-skin.sh" ""
fi

print -- "安装完成。双击桌面的“Signal Garden”即可启动；双击 Restore 可一键还原。"
