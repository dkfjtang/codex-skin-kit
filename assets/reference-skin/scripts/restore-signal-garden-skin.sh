#!/bin/zsh
set -euo pipefail

source "$(dirname "$0")/lib.sh"
PORT=9335
UNINSTALL=0
RESTORE_BASE_THEME=0
while (( $# )); do
  case "$1" in
    --port) PORT="${2:-}"; shift 2 ;;
    --uninstall) UNINSTALL=1; shift ;;
    --restore-base-theme) RESTORE_BASE_THEME=1; shift ;;
    -h|--help) print -- "Usage: $0 [--port 9335] [--uninstall] [--restore-base-theme]"; exit 0 ;;
    *) signal_garden_die "未知参数：$1" ;;
  esac
done
signal_garden_validate_port "$PORT"
NODE="$(signal_garden_find_node)"
STATE_PATH="$SIGNAL_GARDEN_STATE_ROOT/state.json"
STATE_PORT="$(signal_garden_state_value "$NODE" "$STATE_PATH" port)"
[[ "$STATE_PORT" == <-> ]] && PORT="$STATE_PORT"
signal_garden_stop_injector "$NODE" "$STATE_PATH"
sleep 0.2
if signal_garden_has_targets "$PORT"; then
  "$NODE" "$SIGNAL_GARDEN_SCRIPT_DIR/injector.mjs" --remove --port "$PORT" --timeout-ms 3000 >/dev/null 2>&1 || true
fi
/bin/rm -f "$STATE_PATH"

if (( UNINSTALL )); then
  DESKTOP_DIR="${FLOWDECK_SIGNAL_GARDEN_DESKTOP_DIR:-$HOME/Desktop}"
  /bin/rm -rf "$DESKTOP_DIR/Signal Garden.app" "$DESKTOP_DIR/Signal Garden - Restore.app" \
    "$DESKTOP_DIR/Signal Garden.app" "$DESKTOP_DIR/Signal Garden - Restore.app"
fi
if (( RESTORE_BASE_THEME )); then
  CONFIG_PATH="${FLOWDECK_SIGNAL_GARDEN_CONFIG_PATH:-$HOME/.codex/config.toml}"
  "$NODE" "$SIGNAL_GARDEN_SCRIPT_DIR/theme-config.mjs" restore "$CONFIG_PATH" "$SIGNAL_GARDEN_STATE_ROOT/config.before-signal-garden-skin.toml"
fi
print -- "Signal Garden皮肤已从当前窗口移除。"
