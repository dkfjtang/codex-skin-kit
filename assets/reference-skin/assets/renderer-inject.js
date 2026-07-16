((cssText, artDataUrl, stillDataUrl) => {
  const STATE_KEY = "__CODEX_SKIN_KIT_SIGNAL_GARDEN_STATE__";
  const STYLE_ID = "codex-skin-kit-signal-garden-style";
  const CHROME_ID = "codex-skin-kit-signal-garden-chrome";
  window.__CODEX_SKIN_KIT_SIGNAL_GARDEN_DISABLED__ = false;

  const previous = window[STATE_KEY];
  if (previous?.observer) previous.observer.disconnect();
  if (previous?.timer) clearInterval(previous.timer);
  if (previous?.scheduler?.timeout) clearTimeout(previous.scheduler.timeout);
  const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const selectedArt = prefersReducedMotion ? stillDataUrl : artDataUrl;
  const artUrl = previous?.artUrl || (() => {
    const comma = selectedArt.indexOf(",");
    const mime = selectedArt.slice(5, selectedArt.indexOf(";"));
    const binary = atob(selectedArt.slice(comma + 1));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return URL.createObjectURL(new Blob([bytes], { type: mime }));
  })();
  const existingStyle = document.getElementById(STYLE_ID);
  if (existingStyle) {
    existingStyle.textContent = cssText;
    existingStyle.dataset.signalGardenVersion = "1";
  }

  const ensure = () => {
    if (window.__CODEX_SKIN_KIT_SIGNAL_GARDEN_DISABLED__) return;
    const root = document.documentElement;
    if (!root) return;
    root.classList.add("codex-skin-kit-signal-garden");
    root.style.setProperty("--signal-garden-art", `url("${artUrl}")`);

    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      (document.head || root).appendChild(style);
    }
    if (style.dataset.signalGardenVersion !== "1") {
      style.textContent = cssText;
      style.dataset.signalGardenVersion = "1";
    }

    const shellMain = document.querySelector("main.main-surface") || document.querySelector("main");
    const home = document.querySelector('[role="main"]:has([data-testid="home-icon"])');
    for (const candidate of document.querySelectorAll('[role="main"].signal-garden-home')) {
      if (candidate !== home) candidate.classList.remove("signal-garden-home");
    }
    if (home) home.classList.add("signal-garden-home");

    if (!shellMain || !document.body) return;
    shellMain.classList.toggle("signal-garden-home-shell", Boolean(home));
    let chrome = document.getElementById(CHROME_ID);
    if (!chrome || chrome.parentElement !== document.body) {
      chrome?.remove();
      chrome = document.createElement("div");
      chrome.id = CHROME_ID;
      chrome.setAttribute("aria-hidden", "true");
      chrome.innerHTML = `
        <div class="signal-garden-brand"><span class="signal-garden-note">◇</span><span><b>Signal Garden</b><small>FLOW · CODE · LOCAL</small></span></div>
        <div class="signal-garden-signature">TTFlows theme layer</div>
        <div class="signal-garden-sparkles"><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="signal-garden-ribbon"><span>◆</span> Local theme active <span>◆</span></div>
        <div class="signal-garden-polaroid"></div>`;
      document.body.appendChild(chrome);
    }
    const shellBox = shellMain.getBoundingClientRect();
    chrome.style.left = `${Math.round(shellBox.left)}px`;
    chrome.style.top = `${Math.round(shellBox.top)}px`;
    chrome.style.width = `${Math.round(shellBox.width)}px`;
    chrome.style.height = `${Math.round(shellBox.height)}px`;
    chrome.classList.toggle("signal-garden-home-shell", Boolean(home));
  };

  const cleanup = () => {
    window.__CODEX_SKIN_KIT_SIGNAL_GARDEN_DISABLED__ = true;
    document.documentElement?.classList.remove("codex-skin-kit-signal-garden");
    document.documentElement?.style.removeProperty("--signal-garden-art");
    document.querySelectorAll(".signal-garden-home").forEach((node) => node.classList.remove("signal-garden-home"));
    document.querySelectorAll(".signal-garden-home-shell").forEach((node) => node.classList.remove("signal-garden-home-shell"));
    document.getElementById(STYLE_ID)?.remove();
    document.getElementById(CHROME_ID)?.remove();
    const state = window[STATE_KEY];
    state?.observer?.disconnect();
    if (state?.timer) clearInterval(state.timer);
    if (state?.scheduler?.timeout) clearTimeout(state.scheduler.timeout);
    if (state?.artUrl) URL.revokeObjectURL(state.artUrl);
    delete window[STATE_KEY];
    return true;
  };

  const scheduler = { timeout: null };
  const scheduleEnsure = () => {
    if (scheduler.timeout) clearTimeout(scheduler.timeout);
    scheduler.timeout = setTimeout(() => {
      scheduler.timeout = null;
      ensure();
    }, 180);
  };
  const observer = new MutationObserver(scheduleEnsure);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  const timer = setInterval(ensure, 5000);
  window[STATE_KEY] = { ensure, cleanup, observer, timer, scheduler, artUrl, version: "1.0.0" };
  ensure();
  return { installed: true, version: "1.0.0" };
})(__SIGNAL_GARDEN_CSS_JSON__, __SIGNAL_GARDEN_ART_JSON__, __SIGNAL_GARDEN_STILL_JSON__)