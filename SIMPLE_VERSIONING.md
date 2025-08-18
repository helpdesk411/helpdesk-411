# Simple A/B/C Page Versioning

This is a much simpler approach to A/B/C testing. Each version is a separate page component that can be modified completely independently.

## 🎯 **How It Works**

### URLs
- **Version A**: `http://localhost:5173/` → `PageA.tsx`
- **Version B**: `http://localhost:5173/b` → `PageB.tsx`  
- **Version C**: `http://localhost:5173/c` → `PageC.tsx`

### Files Structure
```
src/
├── pages/
│   ├── PageA.tsx    # Version A - Original
│   ├── PageB.tsx    # Version B - Blue theme example
│   └── PageC.tsx    # Version C - Green theme example
├── sections/        # Shared components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Pricing.tsx
│   └── ...
└── components/      # Shared UI components
```

## 🛠 **Making Changes**

### To modify a specific version:
1. Edit the page file directly:
   - **Version A**: Edit `src/pages/PageA.tsx`
   - **Version B**: Edit `src/pages/PageB.tsx`  
   - **Version C**: Edit `src/pages/PageC.tsx`

### Examples of what you can change per version:

#### Background Colors
```tsx
// PageA.tsx - Original
<div className="min-h-screen bg-background p-2 md:px-6 md:py-6">

// PageB.tsx - Blue theme
<div className="min-h-screen bg-blue-50 p-2 md:px-6 md:py-6">

// PageC.tsx - Green theme  
<div className="min-h-screen bg-green-50 p-2 md:px-6 md:py-6">
```

#### Different Section Order
```tsx
// PageA.tsx - Standard order
<main>
  <Hero />
  <PainPoints />
  <Partner />
  <Pricing />
  <AddOns />
  <FAQ />
  <CTAFinal />
</main>

// PageB.tsx - Pricing first
<main>
  <Hero />
  <Pricing />
  <PainPoints />
  <Partner />
  <AddOns />
  <FAQ />
  <CTAFinal />
</main>

// PageC.tsx - Remove some sections
<main>
  <Hero />
  <PainPoints />
  <Pricing />
  <CTAFinal />
</main>
```

#### Completely Different Layouts
```tsx
// PageB.tsx - Grid layout example
<div className="min-h-screen bg-blue-50 grid grid-cols-2 gap-8 p-8">
  <div>
    <Hero />
    <Pricing />
  </div>
  <div>
    <PainPoints />
    <FAQ />
  </div>
</div>
```

#### Custom CSS Classes
```tsx
// PageC.tsx - Add custom styling
<div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-2">
  <div className="backdrop-blur-sm bg-white/30 rounded-3xl">
    <Navbar />
    <main className="space-y-12">
      <Hero />
      <div className="grid md:grid-cols-2 gap-8">
        <PainPoints />
        <Pricing />
      </div>
    </main>
  </div>
</div>
```

## 🚀 **Benefits of This Approach**

✅ **Complete Isolation** - Each page is totally independent  
✅ **No Complex Logic** - Simple page components, no version props  
✅ **Shared Components** - Still reuse all your sections/components  
✅ **Drastic Changes** - Can completely change layout, sections, styling  
✅ **Easy Testing** - Use the page switcher or navigate directly  
✅ **Fast Development** - Make changes and see them instantly  

## 🧪 **Testing Your Changes**

1. **Start dev server**: `yarn dev`
2. **Use page switcher** in top-right corner
3. **Or navigate directly**:
   - `localhost:5173/` (Version A)
   - `localhost:5173/b` (Version B)
   - `localhost:5173/c` (Version C)

## 📦 **Deployment**

Each version can be deployed to different domains:
- `yourdomain.com` → PageA
- `b.yourdomain.com` → PageB  
- `c.yourdomain.com` → PageC

Or use path-based routing:
- `yourdomain.com/` → PageA
- `yourdomain.com/b` → PageB
- `yourdomain.com/c` → PageC

## 💡 **Pro Tips**

- **Start with copying** - Copy PageA.tsx to create new versions
- **Share components** - Keep using the same sections/components when possible
- **Test all versions** after making changes to shared components
- **Version control** - Commit each version separately for easy tracking
- **A/B test ready** - Perfect for sending different URLs to different user groups

This approach gives you maximum flexibility with minimum complexity!
