import { ScrollSmoother } from "gsap/ScrollSmoother";

export function scrollToHash(hash: string, smooth = true) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(el, smooth, "top 96px");
  } else {
    el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  }
}
