const SCROLL_INTENT_KEY = "mez-scroll-intent";

export type ScrollIntent = "portfolio" | "uslugi" | "kontakt";

/** Header hides on scroll-down; pull past section padding so content sits tight. */
function getHeaderOffset(targetY: number, el: HTMLElement) {
  const topbar = document.querySelector<HTMLElement>(".site-header .topbar");
  const headerH = topbar
    ? Math.round(topbar.getBoundingClientRect().height)
    : 70;

  const padTop = parseFloat(getComputedStyle(el).paddingTop) || 0;
  // Eat most of the section's top padding so the block doesn't look floated down
  const padPull = Math.round(padTop * 0.65);

  const scrollingDown = targetY > window.scrollY + 4;
  if (scrollingDown && targetY > 120) return -padPull;

  const header = document.querySelector(".site-header");
  if (header?.classList.contains("is-hidden")) return -padPull;

  return headerH - padPull;
}

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
    if (value === "portfolio" || value === "uslugi" || value === "kontakt") {
      return value;
    }
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

  const elTop = el.getBoundingClientRect().top + window.scrollY;
  const top = elTop - getHeaderOffset(elTop, el);
  window.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
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
