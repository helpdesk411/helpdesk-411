# PRD — Enterprise-grade IT for Small Businesses (Marketing Site)

**Goal:** Launch a single-page marketing site that converts visitors into demo calls and trials. It must closely match the provided mock (see `Desktop.png`) using React + TailwindCSS, shadcn/ui, and 21st.dev where appropriate.

## Success Criteria
- Pixel-accurate responsive layout matching the mock across **sm / md / lg / xl**.
- CLS < 0.1, LCP < 2.5s on desktop, < 3.5s on mobile.
- Lighthouse ≥ 95 for accessibility and best practices.
- Pricing cards and FAQ are fully data-driven (JSON-configurable).

## Information Architecture
Single route: `/` with sections (in order):
1. **Navbar** (sticky, glass/blur)
2. **Hero** with radial pastel gradient background, headline, sub-copy, primary/secondary CTAs, chat bubbles/trust pills
3. **Pain Points** three-column features
4. **Partner** split-image with bullets
5. **Pricing** three plan cards with “Proactive” featured
6. **Add-ons** 2×3 card grid with images and badges
7. **FAQ** accordion (5 items)
8. **Final CTA** with headphones visual and two buttons
9. **Footer** with three columns and social links

## Visual System
- **Typography:** Inter (variable). Display tracking −0.02em, bold headings, regular body.
- **Colors:** From `design.json/tokens.colors`. Background uses soft radial gradient `start → mid → end` (peach ↔ lilac).
- **Corners:** Rounded-2xl for cards/sections; small radius for pills.
- **Shadows:** Soft elevation for cards; no harsh borders.
- **Imagery:** One hero ambient background (pure CSS gradient), one partner image, six add-on tiles, headphone CTA image.

## Components
Use shadcn/ui primitives and 21st.dev layout/visual components.
- `Navbar`: brand left; links to #features, #pricing, #faq; CTA “Contact”.
- `Hero`: gradient bg, `SparklesText` for headline flare (21st.dev, optional), pills row, two buttons.
- `FeatureCard`: icon (lucide-react), title, copy.
- `SplitPanel`: image right on desktop, stacked on mobile.
- `PricingCard`: price, per, features list, CTA; supports `isFeatured` style.
- `AddOnCard`: image, title, desc, optional badge.
- `FAQItem`: `Accordion` from shadcn/ui.
- `Footer`: 3 column links + socials.
- Utility components: `Container`, `Section`, `GradientBg`.

## Data
All copy and options live in `design.json` under `components`. The UI reads from there, enabling easy edits without code changes. Add-on and plan schemas are defined in the same file.

## States & Interactions
- Sticky navbar adds drop-shadow after 8px scroll.
- Pricing hover lifts card; featured card has larger shadow and accent ring.
- Smooth-scroll for anchor links with reduced-motion respect.
- FAQ items individually collapsible; first item expanded on load is **off** by default.

## Accessibility
- Semantic landmarks: `header`, `main`, `section`, `footer`.
- Color contrast AA minimum. Focus rings visible (`ring-2 ring-offset-2`).
- Images require `alt` text; decorative images `aria-hidden`.
- Keyboard tab order and ESC to dismiss any overlay.

## Performance
- Use CSS-only gradients; defer non-critical scripts.
- `next/image`-style responsive images if using Next.js; otherwise `loading="lazy"`.
- Static SVG for icons (lucide-react).
- Tree-shake shadcn components; import per-file.

## Tech Notes
- Framework: Next.js (recommended) or Vite + React.
- Styling: TailwindCSS with shadcn/ui tokens mapped to `--primary`, etc.
- Icons: `lucide-react`.
- Animations: `framer-motion` for subtle fades/slide-ins.
- 21st.dev: `BackgroundBeams`, `SparklesText`, `Marquee`, `AnimatedBadge` used sparingly.

## Acceptance Tests
- Navigation links scroll correctly and highlight active section.
- Prices and features render from `design.json` (change file → UI updates).
- Mobile: pricing cards stack, paddings remain generous, text wraps without overflow.
- FAQ expands/collapses with keyboard and screen readers.
- Lighthouse budgets met.

## Out of Scope
- CMS, blog, account/login.
- Backend forms (use `mailto:` or dummy handler).

