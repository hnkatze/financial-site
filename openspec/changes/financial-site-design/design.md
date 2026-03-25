# Design: Financial Site — Complete Design & Build

## Technical Approach

Build a static-first financial website on the existing Astro 6 + Tailwind v4 scaffold. The architecture follows Astro's content-site sweet spot: every page is server-rendered HTML with zero client JS, except for a single Preact island (loan calculator) hydrated lazily via `client:visible`. Design consistency is enforced through a Tailwind v4 `@theme {}` token system using oklch colors. SEO is baked into the shared `Layout.astro` via typed props that generate meta tags, OG tags, and JSON-LD structured data per page.

This maps directly to the proposal's 5-phase approach: foundation → homepage → inner pages → calculator → polish.

---

## Component Hierarchy

```
Layout.astro (SEO <head>, Inter font, global styles)
├── Header.astro (glassmorphism nav, mobile toggle)
├── <slot /> ← page content injected here
│
│   index.astro (Homepage)
│   ├── Hero.astro
│   ├── Features.astro
│   │   └── Card.astro (×N)
│   ├── ServicesPreview.astro
│   │   └── Card.astro (×N)
│   ├── Stats.astro
│   ├── Testimonials.astro
│   │   └── Card.astro (×N)
│   ├── Partners.astro
│   └── CTA.astro
│       └── Button.astro
│
│   about.astro (About)
│   ├── Mission.astro
│   │   └── Container.astro
│   ├── Values.astro
│   │   └── Card.astro (×N)
│   ├── Team.astro
│   │   └── Card.astro (×N)
│   └── Timeline.astro
│
│   services.astro (Services)
│   ├── SectionHeading.astro
│   ├── ServiceCard.astro (×N)
│   │   └── Badge.astro, Button.astro
│   └── ServiceDetail.astro
│
│   contact.astro (Contact)
│   └── ContactForm.astro
│       └── Button.astro
│
│   calculator.astro (Calculator)
│   ├── SectionHeading.astro
│   └── LoanCalculator.tsx [client:visible] ← Preact island
│
└── Footer.astro
```

### Component Classification

| Category | Components | Hydration |
|----------|-----------|-----------|
| **Layout** | Layout.astro, Header.astro, Footer.astro | Static (zero JS) |
| **UI Primitives** | Button.astro, Card.astro, Badge.astro, SectionHeading.astro, Container.astro | Static (zero JS) |
| **Homepage Sections** | Hero.astro, Features.astro, ServicesPreview.astro, Stats.astro, Testimonials.astro, Partners.astro, CTA.astro | Static (zero JS) |
| **About Sections** | Mission.astro, Values.astro, Team.astro, Timeline.astro | Static (zero JS) |
| **Service Sections** | ServiceCard.astro, ServiceDetail.astro | Static (zero JS) |
| **Contact** | ContactForm.astro | Static (zero JS — HTML form + CSS validation) |
| **Islands** | LoanCalculator.tsx | `client:visible` (Preact) |

**Total: 24 components — 23 static Astro, 1 Preact island.**

---

## Design Token Architecture

### Color System — oklch

All colors use oklch for P3 wide-gamut support and perceptual uniformity. Hue values:
- **Primary (teal)**: hue ~175
- **Secondary (navy)**: hue ~260
- **Accent (amber)**: hue ~85
- **Neutral (slate)**: hue ~260, very low chroma
- **Success (green)**: hue ~145
- **Warning (amber)**: hue ~85
- **Error (red)**: hue ~25

### Exact `@theme {}` Block

This goes in `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  /* ── Typography ── */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Inter", ui-sans-serif, system-ui, sans-serif;

  /* ── Primary (Teal) ── hue 175 */
  --color-primary-50:  oklch(0.97 0.02 175);
  --color-primary-100: oklch(0.93 0.04 175);
  --color-primary-200: oklch(0.87 0.08 175);
  --color-primary-300: oklch(0.79 0.12 175);
  --color-primary-400: oklch(0.70 0.15 175);
  --color-primary-500: oklch(0.62 0.17 175);
  --color-primary-600: oklch(0.53 0.15 175);
  --color-primary-700: oklch(0.45 0.13 175);
  --color-primary-800: oklch(0.38 0.10 175);
  --color-primary-900: oklch(0.32 0.08 175);
  --color-primary-950: oklch(0.24 0.06 175);

  /* ── Secondary (Navy) ── hue 260 */
  --color-secondary-50:  oklch(0.97 0.01 260);
  --color-secondary-100: oklch(0.93 0.02 260);
  --color-secondary-200: oklch(0.87 0.04 260);
  --color-secondary-300: oklch(0.78 0.07 260);
  --color-secondary-400: oklch(0.67 0.10 260);
  --color-secondary-500: oklch(0.55 0.13 260);
  --color-secondary-600: oklch(0.45 0.14 260);
  --color-secondary-700: oklch(0.37 0.12 260);
  --color-secondary-800: oklch(0.30 0.10 260);
  --color-secondary-900: oklch(0.24 0.08 260);
  --color-secondary-950: oklch(0.18 0.06 260);

  /* ── Accent (Amber/Gold) ── hue 85 */
  --color-accent-50:  oklch(0.98 0.02 85);
  --color-accent-100: oklch(0.95 0.05 85);
  --color-accent-200: oklch(0.90 0.10 85);
  --color-accent-300: oklch(0.84 0.15 85);
  --color-accent-400: oklch(0.78 0.17 85);
  --color-accent-500: oklch(0.72 0.18 85);
  --color-accent-600: oklch(0.63 0.16 85);
  --color-accent-700: oklch(0.53 0.13 85);
  --color-accent-800: oklch(0.44 0.10 85);
  --color-accent-900: oklch(0.36 0.08 85);
  --color-accent-950: oklch(0.27 0.06 85);

  /* ── Neutral (Slate) ── hue 260, low chroma */
  --color-neutral-50:  oklch(0.98 0.005 260);
  --color-neutral-100: oklch(0.96 0.007 260);
  --color-neutral-200: oklch(0.91 0.008 260);
  --color-neutral-300: oklch(0.85 0.010 260);
  --color-neutral-400: oklch(0.70 0.012 260);
  --color-neutral-500: oklch(0.55 0.014 260);
  --color-neutral-600: oklch(0.45 0.012 260);
  --color-neutral-700: oklch(0.37 0.010 260);
  --color-neutral-800: oklch(0.27 0.008 260);
  --color-neutral-900: oklch(0.20 0.006 260);
  --color-neutral-950: oklch(0.14 0.005 260);

  /* ── Semantic: Success ── hue 145 */
  --color-success-500: oklch(0.62 0.17 145);
  --color-success-600: oklch(0.53 0.15 145);

  /* ── Semantic: Warning ── hue 85 */
  --color-warning-500: oklch(0.75 0.15 85);
  --color-warning-600: oklch(0.65 0.14 85);

  /* ── Semantic: Error ── hue 25 */
  --color-error-500: oklch(0.60 0.20 25);
  --color-error-600: oklch(0.52 0.19 25);

  /* ── Surface (for glassmorphism) ── */
  --color-surface-glass: oklch(1.00 0 0 / 0.70);
  --color-surface-glass-dark: oklch(0.20 0.01 260 / 0.70);

  /* ── Border radius ── */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* ── Shadows ── */
  --shadow-soft: 0 2px 15px -3px oklch(0.00 0 0 / 0.07), 0 10px 20px -2px oklch(0.00 0 0 / 0.04);
  --shadow-glow: 0 0 30px oklch(0.62 0.17 175 / 0.15);
}
```

### Token Usage Patterns

| Purpose | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Body background | `bg-neutral-50` | `dark:bg-neutral-950` |
| Card background | `bg-white` | `dark:bg-neutral-900` |
| Primary text | `text-neutral-900` | `dark:text-neutral-100` |
| Secondary text | `text-neutral-500` | `dark:text-neutral-400` |
| Primary button | `bg-primary-600 text-white` | `dark:bg-primary-500` |
| Primary button hover | `hover:bg-primary-700` | `dark:hover:bg-primary-400` |
| Links | `text-primary-600` | `dark:text-primary-400` |
| Section backgrounds | `bg-secondary-900` (dark sections) | `dark:bg-secondary-950` |
| Glassmorphism | `bg-surface-glass backdrop-blur-xl` | `dark:bg-surface-glass-dark` |
| Card border | `border-neutral-200` | `dark:border-neutral-800` |

---

## Island Architecture

### Hydration Strategy

```
Page Load
  │
  ├── Layout.astro ──────── Static HTML (zero JS)
  │   ├── Header.astro ──── Static HTML + CSS-only mobile nav
  │   ├── [Page].astro ──── Static HTML
  │   │   ├── Sections ──── Static HTML (zero JS)
  │   │   └── LoanCalculator.tsx ─── Deferred (client:visible)
  │   └── Footer.astro ──── Static HTML (zero JS)
  │
  ▼ User scrolls to calculator viewport
  │
  └── Preact runtime loads → LoanCalculator hydrates
      (~4KB Preact + ~2KB component ≈ 6KB gzipped)
```

### Interactive Behaviors — Implementation

| Behavior | Approach | JS Cost |
|----------|----------|---------|
| Loan calculator | Preact island, `client:visible` | ~6KB (lazy) |
| Mobile nav toggle | CSS-only with `<input type="checkbox">` + `:checked` sibling selector | 0KB |
| Stats counter animation | CSS `@keyframes` + `animation-timeline: view()` (scroll-driven) | 0KB |
| Entrance animations | CSS `@keyframes fade-in-up` + `animation-timeline: view()` | 0KB |
| Smooth scroll | CSS `scroll-behavior: smooth` on `<html>` | 0KB |
| Form validation | HTML5 native (`:valid`, `:invalid`, `required`, `pattern`) | 0KB |

**Rationale for CSS-only mobile nav**: A checkbox-based toggle is sufficient for a show/hide menu. It avoids loading any JS framework for a simple open/close interaction. The pattern uses `<input id="nav-toggle" type="checkbox" class="sr-only peer">` and styles the nav with `peer-checked:translate-x-0`.

### Why Preact Over React

- Preact: ~3KB gzipped vs React: ~40KB gzipped
- API-compatible (hooks, JSX) — no learning curve difference
- Only one island in the entire site; keeping it minimal is critical for Lighthouse scores
- `@astrojs/preact` is a first-class Astro integration

### Why `client:visible` Over `client:load`

- The calculator lives below the fold on its dedicated page
- `client:visible` defers hydration until the user scrolls to it
- Keeps initial page load at zero JS (better LCP, better TTI)
- If the user never scrolls there, the JS never loads

---

## Data Flow

### Static Data → Page Render

```
src/data/*.json (static data files)
        │
        ▼ imported in Astro frontmatter
src/pages/*.astro (page components)
        │
        ▼ passed as props
src/components/**/*.astro (section components)
        │
        ▼ passed as props
src/components/ui/*.astro (UI primitives)
        │
        ▼
Static HTML output (zero JS)
```

**Example flow for Homepage**:

```
src/data/services.json ──→ index.astro frontmatter
                               │
                               ▼
                      ServicesPreview.astro (receives services[])
                               │
                               ▼
                      Card.astro (receives title, description, icon)
                               │
                               ▼
                      <article> HTML
```

### Calculator Interaction Flow

```
User Input (amount, rate, term)
        │
        ▼ onChange with 300ms debounce
Preact state update (setAmount, setRate, setTerm)
        │
        ▼ useEffect with dependency array
calculateMonthlyPayment(amount, rate, term) ← pure function from lib/calculator.ts
calculateTotalInterest(amount, rate, term)
calculateAmortizationSchedule(amount, rate, term)
        │
        ▼ setState
Render results (monthly payment, total interest, total cost)
        │
        ▼ Conditional render
Amortization table (collapsible)
```

**Sequence Diagram — Calculator**:

```
User            LoanCalculator.tsx           lib/calculator.ts
  │                    │                           │
  │─── types amount ──→│                           │
  │                    │── debounce 300ms ────────→│
  │                    │                           │
  │                    │                           │── calculateMonthlyPayment()
  │                    │                           │── calculateTotalInterest()
  │                    │                           │── calculateAmortization()
  │                    │◀── { monthly, total,      │
  │                    │      schedule } ──────────│
  │                    │                           │
  │◀── render results ─│                           │
  │                    │                           │
```

### SEO Data Flow

```
Page Component (frontmatter)
  │
  │  defines: { title, description, image?, url, type?, jsonLd? }
  │
  ▼
Layout.astro (Props)
  │
  ├── <title>{title}</title>
  ├── <meta name="description" content={description} />
  ├── <meta property="og:title" content={title} />
  ├── <meta property="og:description" content={description} />
  ├── <meta property="og:image" content={image} />
  ├── <meta property="og:url" content={url} />
  ├── <meta property="og:type" content={type} />
  ├── <link rel="canonical" href={url} />
  └── <script type="application/ld+json">{jsonLd}</script>
        │
        ▲
        │
  generateJsonLd(type, data) ← from lib/seo.ts
```

---

## SEO Architecture

### Layout.astro Props Interface

```typescript
interface Props {
  title: string;
  description: string;
  image?: string;          // OG image URL (defaults to site-wide image)
  url: string;             // Canonical URL for this page
  type?: string;           // OG type: "website" | "article" (default: "website")
  jsonLd?: object | null;  // JSON-LD structured data (null = no structured data)
}
```

### JSON-LD Schemas Per Page

| Page | JSON-LD Type | Key Properties |
|------|-------------|----------------|
| Homepage | `Organization` + `WebSite` | name, url, logo, sameAs, searchAction |
| About | `Organization` (extended) | founders, foundingDate, description, address |
| Services | `Service[]` via `Organization.hasOfferCatalog` | serviceType, provider, areaServed |
| Contact | `LocalBusiness` | address, telephone, openingHours, geo |
| Calculator | `WebApplication` | name, applicationCategory, offers (Free) |

### `src/lib/seo.ts` — Helper Signatures

```typescript
interface SiteConfig {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  social: string[];  // sameAs URLs
}

function generateOrganizationJsonLd(config: SiteConfig): object;
function generateLocalBusinessJsonLd(config: SiteConfig): object;
function generateServiceJsonLd(services: Service[], config: SiteConfig): object;
function generateFaqJsonLd(faqs: { question: string; answer: string }[]): object;
function generateWebAppJsonLd(name: string, description: string, url: string): object;
function generateBreadcrumbJsonLd(items: { name: string; url: string }[]): object;
```

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://www.example.com/sitemap-index.xml
```

### Sitemap

Generated automatically by `@astrojs/sitemap` integration. Configured with `site` in `astro.config.mjs`. Outputs `sitemap-index.xml` with all 5 pages.

---

## File Structure

```
src/
├── components/
│   ├── Header.astro                    # Glassmorphism nav, CSS-only mobile toggle
│   ├── Footer.astro                    # Links, social, copyright
│   │
│   ├── ui/                             # Reusable primitives
│   │   ├── Button.astro                # Primary/secondary/outline variants
│   │   ├── Card.astro                  # Versatile card with optional icon, image
│   │   ├── Badge.astro                 # Small label/tag
│   │   ├── SectionHeading.astro        # Title + subtitle + optional badge
│   │   └── Container.astro             # Max-width centered wrapper
│   │
│   ├── home/                           # Homepage sections
│   │   ├── Hero.astro                  # Gradient bg, headline, dual CTAs
│   │   ├── Features.astro              # Icon cards grid (3-col)
│   │   ├── ServicesPreview.astro       # Service cards linking to /services
│   │   ├── Stats.astro                 # Animated stat counters
│   │   ├── Testimonials.astro          # Testimonial cards grid
│   │   ├── Partners.astro              # Logo strip
│   │   └── CTA.astro                   # Full-width gradient CTA banner
│   │
│   ├── about/                          # About page sections
│   │   ├── Mission.astro               # Company mission statement
│   │   ├── Values.astro                # Core values cards
│   │   ├── Team.astro                  # Team member cards grid
│   │   └── Timeline.astro             # Company timeline/milestones
│   │
│   ├── services/                       # Services page sections
│   │   ├── ServiceCard.astro           # Individual service overview card
│   │   └── ServiceDetail.astro         # Expanded service detail section
│   │
│   ├── contact/                        # Contact page sections
│   │   └── ContactForm.astro           # Form with HTML5 validation
│   │
│   └── islands/                        # Hydrated (JS) components
│       └── LoanCalculator.tsx          # Preact loan calculator
│
├── data/                               # Static JSON data
│   ├── navigation.json                 # Nav links structure
│   ├── services.json                   # Service offerings
│   ├── testimonials.json               # Customer testimonials
│   ├── team.json                       # Team members
│   ├── partners.json                   # Partner/client logos
│   └── site.json                       # Site config (name, url, address, social)
│
├── layouts/
│   └── Layout.astro                    # Root layout (SEO head, header, footer)
│
├── lib/
│   ├── calculator.ts                   # Pure loan calculation functions
│   └── seo.ts                          # JSON-LD generator helpers
│
├── pages/
│   ├── index.astro                     # Homepage
│   ├── about.astro                     # About page
│   ├── services.astro                  # Services page
│   ├── contact.astro                   # Contact page
│   └── calculator.astro                # Calculator page
│
├── styles/
│   └── global.css                      # @theme {} tokens + @keyframes animations
│
└── types/
    └── index.ts                        # Shared TypeScript interfaces

public/
├── robots.txt                          # Crawler directives
├── favicon.svg                         # (existing)
└── images/
    └── og-default.jpg                  # Default OG image

astro.config.mjs                        # + preact + sitemap integrations
package.json                            # + @astrojs/preact, preact, @astrojs/sitemap
```

---

## Interfaces / Contracts

### Component Props — TypeScript

```typescript
// src/types/index.ts

// ── UI Primitives ──

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;         // renders <a> if present, <button> otherwise
  class?: string;        // additional Tailwind classes
}

interface CardProps {
  variant?: 'default' | 'glass' | 'elevated';
  class?: string;
}

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'accent';
  class?: string;
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;         // optional small label above title
  align?: 'left' | 'center';
}

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';   // max-width variants
  class?: string;
}

// ── Data Models ──

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;           // icon name or SVG path identifier
  features: string[];
  href: string;           // link to detail or anchor
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;        // image path
  rating: number;         // 1-5
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

interface Partner {
  name: string;
  logo: string;           // image path in public/
}

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface Stat {
  label: string;
  value: number;
  suffix?: string;       // e.g., "+", "%", "M"
  prefix?: string;       // e.g., "$"
}

// ── Calculator ──

interface LoanInput {
  amount: number;         // principal
  annualRate: number;     // annual interest rate as percentage (e.g., 5.5)
  termMonths: number;     // loan term in months
}

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationEntry[];
}

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

// ── SEO ──

interface SiteConfig {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  social: string[];
}

interface LayoutProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
  jsonLd?: object | null;
}
```

### Calculator Pure Functions — `src/lib/calculator.ts`

```typescript
function calculateMonthlyPayment(input: LoanInput): number;
function calculateTotalInterest(input: LoanInput): number;
function calculateLoan(input: LoanInput): LoanResult;
function calculateAmortizationSchedule(input: LoanInput): AmortizationEntry[];
function formatCurrency(amount: number): string;
```

All functions are pure (no side effects), testable in isolation, and shared between the Preact island and any future server-side usage.

---

## Architecture Decisions

### Decision: Preact Over React for Islands

**Choice**: Preact with `@astrojs/preact`
**Alternatives considered**: React (`@astrojs/react`), Svelte, vanilla JS
**Rationale**: Preact is ~3KB gzipped vs React's ~40KB. Since we have exactly one interactive island, the framework overhead dominates. Preact's hooks API is identical to React's, so there's no DX penalty. Svelte would be even smaller but introduces a new paradigm; Preact stays in the JSX/hooks world. Vanilla JS was considered but managing form state, derived calculations, and conditional rendering without a framework leads to brittle imperative code.

### Decision: `client:visible` Over `client:load` for Calculator

**Choice**: `client:visible` (Intersection Observer-based lazy hydration)
**Alternatives considered**: `client:load` (immediate), `client:idle` (requestIdleCallback)
**Rationale**: The calculator lives on a dedicated `/calculator` page but still below a page header/intro section. `client:visible` means the Preact runtime only loads when the user scrolls to the calculator. This keeps the initial page load at zero JS, improving LCP and TTI. `client:idle` would load slightly earlier (after main thread is idle) but still before the user needs it.

### Decision: CSS-Only Mobile Navigation

**Choice**: `<input type="checkbox">` + CSS `:checked` / `peer-checked:` selector
**Alternatives considered**: Preact island for nav, inline `<script>`, Astro `<script>` tag
**Rationale**: A mobile nav toggle is a binary open/close state — no complex logic. Using a hidden checkbox + CSS peer selectors keeps the entire header at zero JS. This is a well-established pattern. A Preact island for just a toggle would load the Preact runtime on every page unnecessarily. An inline `<script>` would work but adds JS to the critical path; CSS-only avoids that entirely.

### Decision: Static JSON Over Content Collections

**Choice**: JSON files in `src/data/`, imported in Astro frontmatter
**Alternatives considered**: Astro content collections, MDX files, headless CMS
**Rationale**: The data (services, team, testimonials, partners) is structured key-value data, not prose content. Content collections are designed for markdown/MDX documents with frontmatter — overkill for pure data. JSON imports are simpler, type-safe with `satisfies`, and don't require schema definitions in `content/config.ts`. If the site later adds a blog (prose content), content collections would be the right choice for that.

### Decision: oklch Over hex/hsl for Color Tokens

**Choice**: oklch color space in `@theme {}`
**Alternatives considered**: hex codes, hsl(), oklch via custom properties outside @theme
**Rationale**: oklch provides perceptual uniformity — a lightness of 0.62 looks equally "light" across different hues. This makes it trivial to create consistent scales (all 500-level colors feel the same weight). oklch also accesses the P3 wide gamut on supported displays, giving more vibrant teals and navies. Tailwind v4 natively supports oklch in `@theme {}`. hex/hsl would work but hsl's "lightness" is not perceptually uniform (50% lightness in yellow looks much brighter than 50% in blue).

### Decision: CSS `prefers-color-scheme` Over JS Toggle

**Choice**: System preference via `@media (prefers-color-scheme: dark)` using Tailwind's `dark:` variants
**Alternatives considered**: JS toggle with localStorage, Astro `<script>` for theme switching
**Rationale**: For the initial build, respecting the OS setting with zero JS is the simplest, most performant approach. Adding a manual toggle later is straightforward (small inline script in `<head>` to set a class before paint). Starting without it keeps the zero-JS promise intact across all pages.

### Decision: HTML5 Form Validation Over JS Validation

**Choice**: Native HTML5 validation attributes (`required`, `type="email"`, `pattern`, `minlength`) + CSS `:valid`/`:invalid` pseudo-classes
**Alternatives considered**: Preact form island, validation library
**Rationale**: The contact form has no backend — it's a demo/placeholder. Native HTML validation provides immediate, accessible feedback with zero JS. The form can be progressively enhanced with a backend later (submitting to an API endpoint). Using a Preact island for the form would add JS to the contact page unnecessarily.

---

## Dark Mode Strategy

### Approach

Use Tailwind's built-in `dark:` variant with `prefers-color-scheme` media query (Tailwind v4 default behavior). Every component that uses color tokens MUST include its `dark:` counterpart.

### Implementation Pattern

```html
<!-- Every color utility gets a dark: pair -->
<div class="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
  <p class="text-neutral-500 dark:text-neutral-400">...</p>
</div>
```

### Glassmorphism in Dark Mode

Light mode glass:
```html
<header class="bg-surface-glass backdrop-blur-xl border-b border-neutral-200/50">
```

Dark mode glass:
```html
<header class="bg-surface-glass dark:bg-surface-glass-dark backdrop-blur-xl
               border-b border-neutral-200/50 dark:border-neutral-800/50">
```

The dark glass token (`oklch(0.20 0.01 260 / 0.70)`) provides a semi-transparent dark surface that still shows background blur effects, maintaining the glassmorphism aesthetic without being too transparent or too opaque.

### Component Dark Mode Mapping

| Element | Light | Dark |
|---------|-------|------|
| Page bg | `bg-neutral-50` | `bg-neutral-950` |
| Card bg | `bg-white` | `bg-neutral-900` |
| Card border | `border-neutral-200` | `border-neutral-800` |
| Heading text | `text-neutral-900` | `text-neutral-100` |
| Body text | `text-neutral-600` | `text-neutral-400` |
| Muted text | `text-neutral-500` | `text-neutral-400` |
| Primary btn bg | `bg-primary-600` | `bg-primary-500` |
| Primary btn hover | `hover:bg-primary-700` | `dark:hover:bg-primary-400` |
| Glass surface | `bg-surface-glass` | `bg-surface-glass-dark` |
| Shadow | `shadow-soft` | `shadow-none` (shadows invisible on dark) |
| Gradient sections | `from-secondary-900 to-secondary-800` | `from-secondary-950 to-secondary-900` |

---

## CSS Animations — `@keyframes`

Defined in `src/styles/global.css` alongside the `@theme {}` block:

```css
/* ── Entrance: fade-in-up ── */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(1.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Stats counter: count-up ── */
@keyframes count-up {
  from {
    --num: 0;
  }
}

/* ── Subtle float for decorative elements ── */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* ── Utility classes ── */
.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

Entrance animations use `animation-timeline: view()` (CSS scroll-driven animations) so they trigger when the element enters the viewport — no JS Intersection Observer needed. Browsers that don't support scroll-driven animations simply show the element without animation (progressive enhancement).

---

## Sequence Diagrams

### Page Render Flow

```
Browser                    Astro Server              File System
   │                           │                        │
   │── GET /about ────────────→│                        │
   │                           │── read about.astro ───→│
   │                           │◀── page component ─────│
   │                           │                        │
   │                           │── read data/team.json →│
   │                           │◀── team data ──────────│
   │                           │                        │
   │                           │── render Layout.astro  │
   │                           │   ├── <head> (SEO)     │
   │                           │   ├── Header.astro     │
   │                           │   ├── Mission.astro    │
   │                           │   ├── Values.astro     │
   │                           │   ├── Team.astro       │
   │                           │   │   └── Card ×N      │
   │                           │   ├── Timeline.astro   │
   │                           │   └── Footer.astro     │
   │                           │                        │
   │◀── Full HTML response ────│                        │
   │    (zero JS)              │                        │
```

### Calculator Page — Hydration Sequence

```
Browser                     Astro SSR            Preact Runtime
   │                           │                      │
   │── GET /calculator ───────→│                      │
   │                           │── render HTML ──────→│ (not loaded yet)
   │◀── HTML + <astro-island   │                      │
   │    data-island> marker ───│                      │
   │                           │                      │
   │── paints above-fold ──────│                      │
   │   (header, intro text)    │                      │
   │                           │                      │
   │── user scrolls ───────────│                      │
   │   IntersectionObserver    │                      │
   │   fires                   │                      │
   │                           │                      │
   │── fetch preact + island ──│─────────────────────→│
   │◀── JS bundles ────────────│                      │
   │                           │              hydrate()│
   │                           │                      │── attach event listeners
   │                           │                      │── initial calculation
   │◀── interactive calculator │                      │
   │                           │                      │
```

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `astro.config.mjs` | Modify | Add `@astrojs/preact` and `@astrojs/sitemap` integrations, add `site` URL |
| `package.json` | Modify | Add `@astrojs/preact`, `preact`, `@astrojs/sitemap` as dependencies |
| `src/styles/global.css` | Modify | Add full `@theme {}` token block, `@keyframes`, animation utilities, base dark mode styles |
| `src/layouts/Layout.astro` | Modify | Complete rewrite: typed props, SEO `<head>`, Inter font `<link>`, Header/Footer composition |
| `src/pages/index.astro` | Modify | Complete rewrite: import and compose all homepage sections |
| `src/components/Welcome.astro` | Delete | Replaced by actual homepage sections |
| `src/assets/astro.svg` | Delete | Astro starter asset, no longer needed |
| `src/assets/background.svg` | Delete | Astro starter asset, no longer needed |
| `src/components/Header.astro` | Create | Glassmorphism responsive nav with CSS-only mobile toggle |
| `src/components/Footer.astro` | Create | Multi-column footer with links, social, copyright |
| `src/components/ui/Button.astro` | Create | Button/link primitive with variant props |
| `src/components/ui/Card.astro` | Create | Card primitive with glass/elevated variants |
| `src/components/ui/Badge.astro` | Create | Small label/tag component |
| `src/components/ui/SectionHeading.astro` | Create | Section title + subtitle + badge |
| `src/components/ui/Container.astro` | Create | Max-width centered wrapper |
| `src/components/home/Hero.astro` | Create | Gradient hero with headline and CTAs |
| `src/components/home/Features.astro` | Create | 3-column icon feature cards |
| `src/components/home/ServicesPreview.astro` | Create | Service cards grid linking to /services |
| `src/components/home/Stats.astro` | Create | Animated stat counter section |
| `src/components/home/Testimonials.astro` | Create | Testimonial cards |
| `src/components/home/Partners.astro` | Create | Partner logo strip |
| `src/components/home/CTA.astro` | Create | Full-width gradient call-to-action |
| `src/components/about/Mission.astro` | Create | Mission statement section |
| `src/components/about/Values.astro` | Create | Core values cards grid |
| `src/components/about/Team.astro` | Create | Team member cards |
| `src/components/about/Timeline.astro` | Create | Company milestones timeline |
| `src/components/services/ServiceCard.astro` | Create | Service overview card |
| `src/components/services/ServiceDetail.astro` | Create | Expanded service section |
| `src/components/contact/ContactForm.astro` | Create | HTML5-validated contact form |
| `src/components/islands/LoanCalculator.tsx` | Create | Preact loan calculator island |
| `src/pages/about.astro` | Create | About page composing about sections |
| `src/pages/services.astro` | Create | Services page composing service sections |
| `src/pages/contact.astro` | Create | Contact page with form |
| `src/pages/calculator.astro` | Create | Calculator page hosting Preact island |
| `src/lib/calculator.ts` | Create | Pure loan calculation functions |
| `src/lib/seo.ts` | Create | JSON-LD generation helpers |
| `src/data/navigation.json` | Create | Navigation structure |
| `src/data/services.json` | Create | Service offerings data |
| `src/data/testimonials.json` | Create | Testimonial content |
| `src/data/team.json` | Create | Team member data |
| `src/data/partners.json` | Create | Partner names/logos |
| `src/data/site.json` | Create | Site-wide config (name, address, social) |
| `src/types/index.ts` | Create | All shared TypeScript interfaces |
| `public/robots.txt` | Create | Crawler directives with sitemap URL |

**Summary: 3 modified, 3 deleted, 37 created = 43 file operations.**

---

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| **Unit** | `lib/calculator.ts` — monthly payment, total interest, amortization schedule with known inputs | Pure function tests (can use `vitest` if added later) |
| **Unit** | `lib/seo.ts` — JSON-LD output structure validation | Snapshot or structural assertion |
| **Visual** | All 5 pages at 320px, 768px, 1024px, 1440px | Manual browser testing or Playwright screenshots |
| **Visual** | Dark mode on all pages | Toggle OS preference, verify all components |
| **A11y** | Semantic HTML, ARIA, keyboard nav, contrast | Lighthouse accessibility audit (target ≥ 95), manual keyboard walkthrough |
| **SEO** | JSON-LD structured data | Google Rich Results Test validator |
| **SEO** | Sitemap generation | Verify `/sitemap-index.xml` contains all 5 pages |
| **Performance** | Lighthouse scores | Target: Performance ≥ 90, SEO ≥ 95 |
| **Integration** | Calculator inputs → correct outputs | Manual test with known loan values (e.g., $200,000 at 6% for 30yr = $1,199.10/mo) |

> **Note**: Automated test suite (vitest, Playwright) is out of scope per proposal. The testing strategy here is manual/tool-based. Tests can be added via a separate SDD change.

---

## Migration / Rollout

No migration required. This is a greenfield build on top of a minimal scaffold. The existing `Welcome.astro` and starter assets are deleted and replaced.

**Rollout strategy**:
- Each of the 5 phases produces a working state
- Phase 1 (foundation) must complete before any other phase
- Phases 2, 3, 4 can technically run in parallel after Phase 1, but sequential is safer to maintain consistency
- Phase 5 (polish) runs last as a quality pass

---

## Open Questions

- [x] ~~Color token exact values~~ — Defined above with oklch
- [x] ~~Mobile nav approach~~ — CSS-only checkbox pattern
- [ ] **Site URL**: Placeholder `https://www.example.com` used for canonical URLs, sitemap, and OG tags. Needs the real domain before production deployment.
- [ ] **OG Image**: A default OG image (`public/images/og-default.jpg`) is referenced but needs to be created/sourced (1200×630px recommended).
- [ ] **Partner logos**: `partners.json` references image paths — actual logo assets need to be sourced or placeholder SVGs created.
- [ ] **Team avatars**: `team.json` references avatar images — need placeholder images or a service like UI Avatars.
