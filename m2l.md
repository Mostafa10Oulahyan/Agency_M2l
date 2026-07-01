# M²L — Project Brief & Technical Documentation

> **Create Anything. Dominate Every Platform.**
> A cinematic, Awwwards-grade landing page for an AI-powered creative agency.

---

## 1. Concept

**M²L** is an AI-powered creative agency that produces premium visual content for
creators, brands, startups and businesses — reels, ads, AI product photography,
commercial videos, branding, motion graphics, avatars and full campaigns.

The website is not a generic SaaS page. It is an **interactive cinematic
experience**: every scroll reveals something new, nothing is static, and the
first three seconds are engineered to stop the visitor and communicate
"we create world-class content."

**Aesthetic direction:** luxury · cinematic · ultra-minimal · editorial · futuristic.
Black-dominant, with depth from dark green/azure and a disciplined gold accent
reserved strictly for CTAs.

**Inspiration:** Apple · Stripe · Linear · Raycast · Framer · Vercel · Awwwards winners.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router) |
| UI runtime | **React 19** |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS v4** (CSS-first `@theme` tokens, native cascade layers) |
| Animation | **GSAP 3** + **ScrollTrigger** |
| Smooth scroll | **Lenis** (driven off the GSAP ticker) |
| Icons | **lucide-react** + **react-icons** |
| Fonts | **Clash Display** (display) + **Satoshi** (body) via Fontshare |

**Why these:** GSAP/ScrollTrigger for frame-accurate scroll choreography; Lenis for
buttery inertia synced to the same rAF loop; Tailwind v4 for token-driven theming
without a config file. No premium GSAP plugins — a custom `splitText()` utility
handles character/word splitting, keeping the build dependency-light and portable.

---

## 3. Design System

### Color palette (`@theme` tokens in `globals.css`)

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#000000` | Primary background (dominant) |
| `--color-pine` | `#003333` | Secondary background — dark green |
| `--color-azure` | `#003152` | Cards — dark azure |
| `--color-gold` | `#FDBF2D` | Primary accent — **CTAs only** |
| `--color-citron` | `#FAF92A` | Hover accent |
| `--color-martian` | `#99CC33` | Premium highlight |
| `--color-forest` | `#006633` | Success |
| `--color-sand` | `#FFCC99` | Soft neutral |
| `--color-mist` | `#ADDFF1` | Cinematic lighting only |
| `--color-ruby` | `#990000` | Error |
| `--color-bone` | `#F4F1EA` | Off-white text |
| `--color-haze` | `#8A9BA3` | Muted text |

**Rules:** black dominates; gold is reserved for CTAs; citron for hover; azure/pine
build depth; mist appears only as lighting; bright colors are never overused;
contrast stays AA+.

### Typography
- **Display:** Clash Display — large editorial headlines, tight `-0.03em` tracking, `0.92` line-height.
- **Body:** Satoshi — refined, readable.
- Helper classes: `.display-hero`, `.eyebrow` (0.32em uppercase), `.text-gradient-gold`, `.text-outline`.

### Atmosphere
Animated film grain overlay, blurred radial glows, faint grid texture with radial
masks, glassmorphism (`.glass`), and dramatic layered shadows.

---

## 4. Architecture

```
app/
  layout.tsx        SEO/OpenGraph metadata, fonts, grain overlay, viewport
  page.tsx          Orchestrates preloader state + all sections
  globals.css       Design system — @theme tokens, @layer base/utilities, atmosphere
lib/
  gsap.ts           Plugin registration + custom splitText() (chars/words)
components/
  SmoothScroll.tsx  Lenis ↔ GSAP ticker ↔ ScrollTrigger sync; exposes scrollTo()
  Cursor.tsx        Dual-layer magnetic cursor with hover/view states
  Preloader.tsx     Counter + word cycle + reveal transition
  MagneticButton.tsx Reusable magnetic hover (button | anchor)
  anim.tsx          SplitHeading + Reveal scroll primitives
  Nav.tsx           Sticky pill nav, magnetic CTA, mobile sheet
  Hero.tsx          Headline reveal, floating cards, mouse parallax, scroll fade
  Marquee.tsx       Velocity-reactive infinite marquee
  Trust.tsx         Count-up statistics grid
  Services.tsx      11 services as 3D-tilt cards + pointer glow
  Showcase.tsx      Pinned horizontal scroll gallery with parallax interiors
  Process.tsx       Scrubbed timeline spine, 6 steps
  WhyUs.tsx         Bento grid of 6 differentiators
  Testimonials.tsx  Dual infinite marquee of glass quote cards
  FAQ.tsx           Animated grid-rows accordion
  FinalCTA.tsx      Emotional close, breathing glow, glowing CTA
  Footer.tsx        Luxury footer, animated socials, oversized wordmark, back-to-top
```

### Page flow
Preloader → Nav → Hero → Marquee → Trust → Services → Showcase → Process →
WhyUs → Testimonials → FAQ → FinalCTA → Footer.

---

## 5. Animation & Interaction Inventory

**Core systems**
- **Smooth scroll (Lenis):** `duration 1.15`, exponential easing; `lenis.raf` called from
  `gsap.ticker` with `lagSmoothing(0)` so ScrollTrigger never desyncs. Single rAF loop = no jitter.
- **Custom cursor:** precise dot (fast `quickTo`) + lagging ring (slow `quickTo`); grows/labels
  over `[data-cursor]` elements (`hover` → ring expands, `view` → gold fill + label text).
- **Magnetic buttons:** element eases toward pointer, inner content at a softer ratio for depth,
  elastic snap-back on leave.

**Preloader**
- Logo blur-in (scale + filter), `000 → 100%` count-up, word sequence
  **CREATE → DESIGN → ANIMATE → LAUNCH → DOMINATE** (masked vertical swap),
  progress bar `scaleX`, then full-screen `yPercent:-100` `power4.inOut` wipe to reveal the hero.

**Hero**
- Character-by-character masked headline reveal (`splitText`, `yPercent 120 → 0`, staggered `power4.out`).
- Floating glass cards: entrance `back.out`, continuous mouse parallax via `[data-depth]`,
  scroll drift faster than content.
- Background blob parallax, grid texture with radial mask, animated scroll cue.
- Scroll-scrub: content fades + rises, cards drift.

**Section reveals (`anim.tsx`)**
- `SplitHeading` — per-character masked rise with slight rotation, fires once at `top 85%`.
- `Reveal` — fade + blur + rise, once at `top 88%`.

**Per-section motion**
- **Marquee:** auto-scroll (`modifiers` loop) + scroll-velocity skew & timeScale (reverses on upscroll).
- **Trust:** number tween count-up on enter; staggered cell entrance; hover underline sweep.
- **Services:** pointer-driven 3D `rotateX/Y` tilt, radial glow following the cursor, elastic reset,
  top border-sweep on hover.
- **Showcase:** `matchMedia`-gated horizontal pin (desktop), `scrub` translation across `scrollWidth`,
  `containerAnimation` parallax on each panel's interior; mobile falls back to vertical stack.
- **Process:** gradient spine `scaleY` scrubbed to scroll; steps slide in; dots ignite gold as they pass.
- **WhyUs:** bento reveal with hover glow + border shift.
- **Testimonials:** two CSS-keyframe marquees (opposite directions), pause on hover, edge mask.
- **FAQ:** `grid-template-rows 0fr → 1fr` accordion with `cubic-bezier(0.16,1,0.3,1)`, plus icon rotate-to-X.
- **FinalCTA:** masked headline reveal + infinite breathing glow (`yoyo`).
- **Footer:** lift-on-hover social pills, link underline grow, oversized translucent wordmark, back-to-top.

**Techniques covered:** ScrollTrigger, custom SplitText, char/word animation, blur reveal,
fade, scale, rotation, pinning, horizontal scroll, image-mask reveal, infinite marquee,
mouse parallax, floating layers, magnetic buttons, cursor follower, section transitions,
velocity-aware motion.

---

## 6. Performance & Quality

- GPU-friendly transforms (`x/y/scale`, `will-change`), single shared rAF loop.
- `matchMedia` disables heavy pinning on mobile.
- Full `prefers-reduced-motion` fallback (animations/transitions neutralized).
- SEO: title templates, description, keywords, OpenGraph + Twitter cards, robots.
- Accessibility: AA+ contrast, semantic landmarks, focusable controls, aria labels.
- Production bundle: **~172 kB** First Load JS for `/`.

### Notable engineering note — Tailwind v4 cascade layers
In v4, `@import "tailwindcss"` wraps utilities in real `@layer` rules. An **unlayered**
global reset (`* { padding: 0 }`) therefore *beats every utility* (`px-6`, `max-w-7xl`, …),
collapsing all spacing. Fix: base resets live in `@layer base`, helpers in `@layer utilities`,
and Tailwind's own preflight handles the universal reset — so utilities win as intended.

---

## 7. Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production
```

---

## 8. Content Map

- **Tagline:** Create Anything. Dominate Every Platform.
- **Hero:** "Create Ads People Remember."
- **Services (11):** Instagram · TikTok · Facebook Ads · YouTube · Branding · Product Posters ·
  AI Photography · AI Videos · Marketing · Motion Design · Creative Strategy.
- **Trust stats:** 2,400+ Projects · 380+ Clients · 42 Countries · 6,800+ Videos ·
  920+ Campaigns · 1.2B Views.
- **Process (6):** Discover → Strategy → AI Production → Creative Direction → Delivery → Unlimited Revisions.
- **Why M²L (6):** Fast Delivery · Professional Results · Latest AI Models · Human Quality ·
  Affordable Pricing · Unlimited Creativity.
- **Sections also:** Showcase, Testimonials, FAQ, Final CTA, Footer.

---

*Built to feel worthy of Awwwards Site of the Day, CSS Design Awards and FWA.*
<!-- aero_live_6xSjk0lifZvhKiGXhA3_8A2VSSBO3vbAOlfKS41Rv5U -->
// aero_live_Hdfs9QL-7RBqzuOgRvyMWJf2UZqUMrJGfEr-YhtaBHU