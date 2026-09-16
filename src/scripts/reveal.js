// Scroll reveal leve e progressivo, sem dependências.
// Respeita prefers-reduced-motion: a transição em si já é neutralizada via
// CSS (ver src/styles/global.css), aqui só garantimos que o conteúdo nunca
// fica preso em opacity:0 caso o IntersectionObserver não dispare (ex.:
// elemento já visível no load, ou navegador sem suporte).
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const revealTargets = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  revealTargets.forEach((el) => observer.observe(el));
}
