# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # TypeScript check (tsc -b) + Vite production bundle
npm run lint      # ESLint across all files
npm run preview   # Serve the production build locally
```

No test runner is configured.

## Architecture

This is a **React 19 + TypeScript + Vite** single-page landing page for Dolce Hotels & Resorts (luxury weddings/events). The entire page lives in a **single monolithic component** — `src/App.tsx` (~750+ lines).

### Key files

- [src/App.tsx](src/App.tsx) — The entire landing page: loading screen, navbar, all content sections, all event handlers, all animations
- [src/index.css](src/index.css) — Global styles + all CSS keyframe animations and scroll-reveal classes
- [src/lib/utils.ts](src/lib/utils.ts) — `cn()` helper (clsx + tailwind-merge)
- [src/hooks/use-mobile.ts](src/hooks/use-mobile.ts) — `useIsMobile()` hook at 768px breakpoint
- [src/components/ui/](src/components/ui/) — 53 shadcn/ui components (available but minimally used; App.tsx uses raw Tailwind instead)

### Animation system

Animations use two mechanisms working together:

1. **CSS keyframes + reveal classes** in `index.css` — Classes like `.reveal`, `.reveal-left`, `.reveal-scale` with `.visible` toggled by JS. Stagger delays via `.stagger-1` through `.stagger-6` (100ms increments each).
2. **JavaScript** in App.tsx — `IntersectionObserver` adds `.visible` to `.reveal*` elements on scroll; scroll event listener drives hero parallax (40% offset); a 3-step loading sequence (2s delay → 800ms logo animation → content fade-in) controlled by `loading` / `logoAnimating` / `showContent` state.

### Styling conventions

- **Primary brand color:** `#84001a` (burgundy), secondary `#ab162b`
- **Tailwind CSS** is the primary styling tool; inline styles used only for dynamic values (e.g., `animation-delay`)
- **Fonts:** Newsreader, Noto Serif, Work Sans (Google Fonts) + Debby Script (cdnfonts) + Material Symbols icons — all loaded via `index.html`
- Dark mode uses `class` strategy via CSS custom properties (HSL format)
- Path alias `@/*` maps to `src/*`

### Content & data

All content is **hardcoded in JSX** — no backend, no API calls, no environment variables. Images are either local (`/public/*.jpg`) or external Google userContent URLs.

### Adding new sections

Follow the existing pattern in App.tsx: add a `<section>` with `reveal` classes on inner elements, include the section in the navbar links if needed, and use the existing Tailwind + brand-color conventions.
