
# Enterprise-grade IT for Small Businesses — React (Vite) Build

This repo ships a single-page marketing site (based on the provided mock) using **React**, **Vite**, **TailwindCSS**, **shadcn/ui**, **lucide-react**, **framer-motion**, and optional **21st.dev** effects. Content and tokens are **data-driven** via `design.json`.

> If you previously saw a Next.js setup, this README is the **React/Vite** edition.

---

## 🧭 Information Architecture
Sections in order (single route `/`):
1) Navbar (sticky)
2) Hero (gradient bg, headline, CTAs, trust pills)
3) Pain Points (3-up features)
4) Partner (split with image and bullets)
5) Pricing (3 plans, Proactive featured)
6) Add-ons (2×3 card grid)
7) FAQ (accordion)
8) Final CTA (headphones)
9) Footer

All copy/pricing/FAQ/images map to **`design.json`** under `components.*`.

---

## 🛠️ Tech Stack
- Vite + React 18 (TypeScript)
- TailwindCSS
- shadcn/ui (Radix + Tailwind components)
- lucide-react (icons)
- framer-motion (subtle animations)
- 21st.dev (optional visual effects)

---

## ⚡ Quick Start (React + Vite)

```bash
# 1) Scaffold Vite React + TS
npm create vite@latest it-site -- --template react-ts
cd it-site

# 2) TailwindCSS
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# tailwind.config.js → add:
#  content: ['./index.html','./src/**/*.{ts,tsx}']

# src/index.css → include:
#  @tailwind base;
#  @tailwind components;
#  @tailwind utilities;

# 3) Dependencies
npm i lucide-react framer-motion clsx tailwind-merge

# 4) shadcn/ui
npx shadcn@latest init -d
# When prompted, choose the React/Vite setup if available.
# Then add components we use:
npx shadcn@latest add button card accordion badge tabs dialog tooltip

# 5) (Optional) 21st.dev
npm i @twentyfirstdev/react
```

---

## 📂 Project Structure

```
/public/images
/src
  /components       # primitives (Container, Section, GradientBg)
  /sections         # Navbar, Hero, Pricing, AddOns, FAQ, CTAFinal, Footer
  /lib              # design loader + helpers
  main.tsx
  App.tsx
/design.json        # content + tokens (already provided)
/PRD.md             # product requirements
/.cursorrules       # Cursor automation rules
```

**Routing**: Single page (no router needed). Anchor links use native hash navigation with smooth scroll.

---

## 🧩 Implementation Notes

- **Design tokens**: map Tailwind variables in `src/styles/theme.css` (or `index.css`) using CSS variables that mirror `design.tokens`.
- **Data loading**: a small util (`/src/lib/design.ts`) loads `design.json` and exposes typed slices for sections.
- **Accessibility**: semantic landmarks, focus styles (`focus-visible:ring-2 ring-offset-2`), alt text on images, Radix primitives via shadcn/ui.
- **Motion**: guard animations with `prefers-reduced-motion`.

---

## ✅ Acceptance Criteria

- Pixel-accurate layout (mobile → desktop).
- Pricing and FAQ render from `design.json` (no hardcoded copy).
- Lighthouse: ≥95 (A11y + Best Practices). LCP ≤ 3.5s mobile.
- Keyboard navigation works across all interactive elements.

---

## 🧪 Useful Scripts

```jsonc
// package.json (examples)
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

---

## 🧱 Components to Build

- **Primitives**: `Container`, `Section`, `GradientBg`.
- **UI**: `FeatureCard`, `SplitPanel`, `PricingCard`, `AddOnCard`, `FAQItem`.
- **Sections**: `Navbar`, `Hero`, `PainPoints`, `Partner`, `Pricing`, `AddOns`, `FAQ`, `CTAFinal`, `Footer`.

---

## 🔒 Accessibility & Performance

- AA color contrast.
- Logical tab order; ESC closes dialogs.
- Lazy-load non-critical images; CSS gradients instead of hero images.
- Tree-shake shadcn imports (component-by-component).

---

## 📄 License
MIT © 2025
