// Scrollspy leve e progressivo, sem dependências — destaca no menu (fixo e
// mobile) qual seção da página está em vista durante o scroll. Resolve o
// achado do impeccable critique de 2026-09-15 (heurística #1, visibilidade
// do status do sistema): o menu nunca indicava a seção atual.
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("[data-nav-link]")];

if (sections.length && navLinks.length && "IntersectionObserver" in window) {
  const linksByHash = new Map();
  for (const link of navLinks) {
    const hash = link.getAttribute("href");
    if (!linksByHash.has(hash)) linksByHash.set(hash, []);
    linksByHash.get(hash).push(link);
  }

  const setActive = (hash) => {
    for (const [linkHash, links] of linksByHash) {
      const isActive = linkHash === hash;
      for (const link of links) {
        link.style.color = isActive ? "var(--color-brand-gold-ink)" : "";
        link.style.fontWeight = isActive ? "600" : "";
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length === 0) return;
      const topMost = visible.reduce((a, b) =>
        a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
      );
      const hash = `#${topMost.target.id}`;
      if (linksByHash.has(hash)) setActive(hash);
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
  );

  for (const section of sections) {
    if (linksByHash.has(`#${section.id}`)) observer.observe(section);
  }
}
