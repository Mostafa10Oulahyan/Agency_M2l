# M²L — AI Creative Agency

**Create Anything. Dominate Every Platform.**

A cinematic, Awwwards-grade landing page for an AI-powered creative agency.

## Stack
- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **GSAP + ScrollTrigger** (animation engine, custom dependency-free text splitter)
- **Lenis** (smooth scroll, synced to the GSAP ticker)
- **lucide-react** + **react-icons** (iconography)
- Fonts: **Clash Display** + **Satoshi** (Fontshare)

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Architecture
```
app/
  layout.tsx      SEO metadata, fonts, grain overlay
  page.tsx        Orchestrates preloader + all sections
  globals.css     Design system: palette, type, atmosphere utilities
lib/
  gsap.ts         Plugin registration + splitText() utility
components/
  SmoothScroll    Lenis ↔ ScrollTrigger sync
  Cursor          Dual-layer magnetic cursor
  Preloader       Counter + word cycle (CREATE→DOMINATE) reveal
  MagneticButton  Reusable magnetic hover
  anim.tsx        SplitHeading + Reveal scroll primitives
  Nav · Hero · Marquee · Trust · Services · Showcase ·
  Process · WhyUs · Testimonials · FAQ · FinalCTA · Footer
```

## Highlights
- Cinematic preloader with animated percentage + word sequence
- Char-by-char masked headline reveals
- Velocity-reactive infinite marquees
- Count-up trust statistics
- 3D-tilt service cards with pointer-tracked glow
- Pinned horizontal showcase with parallax interiors
- Scrubbed timeline spine for the process section
- Magnetic buttons + custom cursor states throughout
- Full reduced-motion fallback, AA contrast, SEO metadata
