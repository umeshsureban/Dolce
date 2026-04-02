# Dolce Hotels & Resorts — Weddings & Events Landing Page

A luxury marketing landing page for Dolce Hotels and Resorts, built with React 19, TypeScript, and Vite.

## Tech Stack

- **React 19** + **TypeScript 5.9**
- **Vite 7** — build tool with HMR
- **Tailwind CSS 3.4** — utility-first styling
- **shadcn/ui** — component library (Radix UI primitives)
- **Google Fonts** — Newsreader, Noto Serif, Work Sans, Material Symbols
- **Debby Script** — custom cursive font via cdnfonts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Deployment

The project is deployed on **Vercel** via GitHub integration.

- **Repository:** [github.com/umeshsureban/Dolce](https://github.com/umeshsureban/Dolce)
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Configuration:** [`vercel.json`](vercel.json)

Every push to `main` triggers an automatic Vercel deployment. The `vercel.json` includes a catch-all rewrite to `index.html` to support client-side routing.

## Project Structure

```
src/
├── App.tsx          # Entire landing page (single component)
├── App.css          # Material Symbols icon styles
├── index.css        # Global styles, animations, scroll-reveal classes
├── main.tsx         # React DOM entry point
├── components/ui/   # shadcn/ui components (available, not all used)
├── hooks/           # useIsMobile hook
└── lib/utils.ts     # cn() utility (clsx + tailwind-merge)

public/
├── dolce-logo.png
├── venue1.jpg
├── venue2.jpg
└── venue3.jpg
```

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#84001a` | Burgundy — headings, icons, accents |
| Primary Container | `#ab162b` | CTA buttons |
| Surface | `#fbf9fc` | Page background |
| On-Surface Variant | `#5a4040` | Body text |
