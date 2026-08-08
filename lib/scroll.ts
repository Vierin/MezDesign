const SCROLL_INTENT_KEY = "mez-scroll-intent";
const HEADER_OFFSET = 96;

export type ScrollIntent = "portfolio" | "kontakt";

export function setScrollIntent(intent: ScrollIntent) {
  try {
    sessionStorage.setItem(SCROLL_INTENT_KEY, intent);
  } catch {
    // ignore
  }
}

export function consumeScrollIntent(): ScrollIntent | null {
  try {
    const value = sessionStorage.getItem(SCROLL_INTENT_KEY);
    sessionStorage.removeItem(SCROLL_INTENT_KEY);
    if (value === "portfolio" || value === "kontakt") return value;
  } catch {
    // ignore
  }
  return null;
}

export function clearScrollIntent() {
  try {
    sessionStorage.removeItem(SCROLL_INTENT_KEY);
  } catch {
    // ignore
  }
}

export function scrollToTop(smooth = false) {
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}

export function scrollToHash(hash: string, smooth = true) {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  return true;
}

/** Retry until the target exists (client nav content may mount late). */
export function scrollToHashWhenReady(hash: string, smooth = true, attempts = 40) {
  if (scrollToHash(hash, smooth)) return;

  let left = attempts;
  const tick = () => {
    if (scrollToHash(hash, smooth) || --left <= 0) return;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
