# Enterprise IT Marketing Site - Setup Instructions

This is a React + Vite + TailwindCSS marketing site based on the provided design mockup.

## Installation

1. Install dependencies with yarn:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

The site will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Container.tsx
│   ├── Section.tsx
│   └── GradientBg.tsx
├── sections/           # Page sections
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── PainPoints.tsx
│   ├── Partner.tsx
│   ├── Pricing.tsx
│   ├── AddOns.tsx
│   ├── FAQ.tsx
│   ├── CTAFinal.tsx
│   └── Footer.tsx
├── lib/               # Utilities
│   ├── design.ts      # Design data loader
│   └── utils.ts       # Utility functions
└── App.tsx            # Main app component
```

## Features Implemented

✅ **Complete Section Structure**
- Sticky navbar with blur effect
- Hero section with gradient background
- Pain points (features) section
- Partner section with image placeholder
- Pricing cards (3 plans with featured highlight)
- Add-ons grid (2x3 layout)
- FAQ accordion
- Final CTA section
- Footer with social links

✅ **Design System**
- CSS variables based theming
- Responsive design (mobile-first)
- TailwindCSS for styling
- Data-driven content from `design.json`

✅ **Accessibility**
- Semantic HTML structure
- Focus management
- Screen reader support
- Keyboard navigation

✅ **Performance**
- CSS-only gradients
- Optimized bundle with Vite
- Tree-shaking for icons

## Next Steps

To complete the setup, you may want to:

1. Install additional dependencies for animations:
```bash
yarn add framer-motion
```

2. Add image assets to `public/images/` folder

3. Configure any additional build tools as needed

## Design Tokens

All design tokens are defined in `design.json` and loaded via the design data utility. The site automatically applies the color scheme, typography, and spacing defined in the design file.

## Build for Production

```bash
yarn build
```

The built files will be in the `dist/` directory.
