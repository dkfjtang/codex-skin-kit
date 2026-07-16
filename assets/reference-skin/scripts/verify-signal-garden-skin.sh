#!/bin/zsh
set -euo pipefail

source "$(dirname "$0")/lib.sh"
PORT=9335
SCREENSHOT_PATH=""
RELOAD=0
while (( $# )); do
  case "$1" in
    --port) PORT="${2:-}"; shift 2 ;;
    --screenshot) SCREENSHOT_PATH="${2:-}"; shift 2 ;;
    --reload) RELOAD=1; shift ;;
    -h|--help) print -- "Usage: $0 [--port 9335] [--screenshot PATH] [--reload]"; exit 0 ;;
    *) signal_garden_die "未知参数：$1" ;;
  esac
done
signal_garden_validate_port "$PORT"
NODE="$(signal_garden_find_node)"
arguments=("$SIGNAL_GARDEN_SCRIPT_DIR/injector.mjs" --verify --port "$PORT")
[[ -n "$SCREENSHOT_PATH" ]] && arguments+=(--screenshot "$SCREENSHOT_PATH")
(( RELOAD )) && arguments+=(--reload)
exec "$NODE" "${arguments[@]}"
