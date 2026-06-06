# Extngo Next.js

This is a Next.js conversion of the Extngo product landing page.

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Move Assets to Public Folder

Move all images from the `assets/` and `uploads/` folders to the `public/` directory:

```bash
# Create public directory if it doesn't exist
mkdir -p public

# Move assets
cp assets/* public/
cp uploads/* public/
```

The following images are required in the `public/` folder:
- `hero-bg.jpg`
- `product-reel.png`
- `use-car.png`
- `use-lan.png`
- `use-office.png`
- `conference-room.png`
- `specs-lifestyle.png`
- `color-variants.png`
- `retractable-unit.png`

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with fonts
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
└── components/
    ├── ExtngoLogo.tsx
    ├── NavBar.tsx
    ├── GiantWordmark.tsx
    ├── Word.tsx
    ├── HeroScene.tsx
    ├── HeroSafe.tsx
    ├── PinnedProduct.tsx
    ├── ProductDetail.tsx
    ├── ProductSections.tsx
    ├── UseCases.tsx
    ├── SpecsOnTheFly.tsx
    ├── ColorVariants.tsx
    ├── BonusUnit.tsx
    └── FooterCTA.tsx
```

## Key Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript support
- ✅ Optimized Google Fonts (Bricolage Grotesque & Geist)
- ✅ Next.js Image optimization
- ✅ Smooth scroll animations
- ✅ Responsive design
- ✅ Client-side interactivity
- ✅ Pinned product scroll effect

## Technologies Used

- **Next.js 15** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS-in-JS** - Inline styles with CSS variables
- **Google Fonts** - Bricolage Grotesque & Geist

## Notes

- All animations are preserved from the original design
- The pinned product effect smoothly transitions from hero to detail section
- Responsive breakpoints match the original design
- All interactive elements (hover states, scroll effects) are maintained

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
