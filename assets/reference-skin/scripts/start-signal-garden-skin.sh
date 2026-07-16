#!/bin/zsh
set -euo pipefail
unsetopt BG_NICE

source "$(dirname "$0")/lib.sh"

PORT=9335
RESTART_EXISTING=0
PROFILE_PATH=""
FOREGROUND_INJECTOR=0
SCREENSHOT_PATH=""
while (( $# )); do
  case "$1" in
    --port) PORT="${2:-}"; shift 2 ;;
    --restart-existing) RESTART_EXISTING=1; shift ;;
    --profile-path) PROFILE_PATH="${2:-}"; shift 2 ;;
    --foreground-injector) FOREGROUND_INJECTOR=1; shift ;;
    --screenshot) SCREENSHOT_PATH="${2:-}"; shift 2 ;;
    -h|--help)
      print -- "Usage: $0 [--port 9335] [--restart-existing] [--profile-path PATH] [--foreground-injector] [--screenshot PATH]"
      exit 0 ;;
    *) signal_garden_die "未知参数：$1" ;;
  esac
done

signal_garden_validate_port "$PORT"
NODE="$(signal_garden_find_node)"
APP_PATH="$(signal_garden_find_app)"
APP_EXE="$(signal_garden_app_executable "$APP_PATH")"
APP_PROCESS="${APP_EXE:t}"
INJECTOR="$SIGNAL_GARDEN_SCRIPT_DIR/injector.mjs"
STATE_PATH="$SIGNAL_GARDEN_STATE_ROOT/state.json"
STDOUT_PATH="$SIGNAL_GARDEN_STATE_ROOT/injector.log"
STDERR_PATH="$SIGNAL_GARDEN_STATE_ROOT/injector-error.log"
LAUNCH_LOG="$SIGNAL_GARDEN_STATE_ROOT/codex-launch.log"
LOCK_DIR="$SIGNAL_GARDEN_STATE_ROOT/start.lock"
/bin/mkdir -p "$SIGNAL_GARDEN_STATE_ROOT"
if ! /bin/mkdir "$LOCK_DIR" 2>/dev/null; then
  signal_garden_die "另一个启动流程正在运行；请稍后重试。"
fi
trap '/bin/rmdir "$LOCK_DIR" 2>/dev/null || true' EXIT INT TERM

signal_garden_app_pids() {
  local pid command_line
  while IFS=' ' read -r pid command_line; do
    [[ "$command_line" == "$APP_EXE" || "$command_line" == "$APP_EXE "* ]] && print -r -- "$pid"
  done < <(/bin/ps -axo pid=,command= 2>/dev/null)
  return 0
}

DEBUG_READY=0
signal_garden_has_targets "$PORT" && DEBUG_READY=1
if (( ! DEBUG_READY )) && signal_garden_port_in_use "$PORT"; then
  signal_garden_die "端口 $PORT 已被其他程序占用。请用 --port 选择其他端口。"
fi

local_pids="$(signal_garden_app_pids)"
if (( ! DEBUG_READY )) && [[ -z "$PROFILE_PATH" && -n "$local_pids" ]]; then
  if (( ! RESTART_EXISTING )); then
    signal_garden_die "Codex 已在运行，但没有开放端口 $PORT。请先退出 Codex，或使用 --restart-existing。"
  fi
  print -- "正在重新启动 Codex 以启用本机 CDP…"
  for pid in ${(f)local_pids}; do kill -TERM "$pid" 2>/dev/null || true; done
  for _ in {1..60}; do
    [[ -n "$(signal_garden_app_pids)" ]] || break
    sleep 0.1
  done
  remaining="$(signal_garden_app_pids)"
  for pid in ${(f)remaining}; do kill -KILL "$pid" 2>/dev/null || true; done
  sleep 0.4
fi

if ! signal_garden_has_targets "$PORT"; then
  launch_args=("--remote-debugging-address=127.0.0.1" "--remote-debugging-port=$PORT")
  if [[ -n "$PROFILE_PATH" ]]; then
    /bin/mkdir -p "$PROFILE_PATH"
    launch_args+=("--user-data-dir=$PROFILE_PATH")
  fi
  print -- "正在从 $APP_PATH 启动 Codex…"
  /usr/bin/open -na "$APP_PATH" --args "${launch_args[@]}" >>"$LAUNCH_LOG" 2>&1
fi

ready=0
for _ in {1..100}; do
  if signal_garden_has_targets "$PORT"; then ready=1; break; fi
  sleep 0.3
done
(( ready )) || signal_garden_die "Codex 未能在 30 秒内开放 CDP 端口 $PORT。请查看：$LAUNCH_LOG"

signal_garden_stop_injector "$NODE" "$HOME/Library/Application Support/LegacyTheme/state.json"
signal_garden_stop_injector "$NODE" "$STATE_PATH"
if (( FOREGROUND_INJECTOR )); then
  exec "$NODE" "$INJECTOR" --watch --port "$PORT"
fi

/usr/bin/nohup "$NODE" "$INJECTOR" --watch --port "$PORT" >"$STDOUT_PATH" 2>"$STDERR_PATH" </dev/null &
DAEMON_PID=$!
"$NODE" -e 'const fs=require("fs"); const [file,port,pid,root,profile,app]=process.argv.slice(1); fs.writeFileSync(file, JSON.stringify({port:Number(port),injectorPid:Number(pid),startedAt:new Date().toISOString(),skillRoot:root,profilePath:profile||null,appPath:app},null,2)+"\n")' \
  "$STATE_PATH" "$PORT" "$DAEMON_PID" "$SIGNAL_GARDEN_SKILL_ROOT" "$PROFILE_PATH" "$APP_PATH"

verified=0
for _ in {1..45}; do
  sleep 0.7
  verify_args=("$INJECTOR" --verify --port "$PORT")
  [[ -n "$SCREENSHOT_PATH" ]] && verify_args+=(--screenshot "$SCREENSHOT_PATH")
  if "$NODE" "${verify_args[@]}" >/dev/null 2>&1; then verified=1; break; fi
done
if (( ! verified )); then
  signal_garden_die "皮肤已启动，但自动验证失败。请查看：$STDERR_PATH"
fi
print -- "Signal Garden皮肤已在端口 $PORT 生效。"
