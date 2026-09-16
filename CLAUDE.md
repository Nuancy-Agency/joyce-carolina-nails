## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Hardening: never let JS-only rules hide real content

`.reveal` (scroll-in effect) and any Alpine `x-cloak`-gated element (mobile nav, floating CTA) must never be the *only* thing standing between the visitor and real content/CTAs. If the script fails (CSP, ad-blocker, slow/broken network, JS disabled), that content must still be reachable.

- `BaseLayout.astro`'s `<head>` already ships a `<noscript>` block forcing `.reveal` to `opacity:1`, hiding the JS-only toggle button (`data-js-toggle`), and force-opening the mobile nav (`#menu-mobile[x-cloak]`). Keep it in sync: any new `x-cloak`-gated nav/CTA panel needs its `id` added to that block's selectors.
- When adding a new reveal/menu/floating-CTA pattern, either make it visible-by-default with JS only adding the transition class, or extend the existing `<noscript>` block — from the first version, not as a later fix.
- Found 2026-09-16 via `/impeccable harden`: this exact bug existed in all 5 Nuance Agency sites (shared site-forge template). Logged in Obsidian `Atualizações.md` → "Checklist Técnico (Todos os Sites)".
