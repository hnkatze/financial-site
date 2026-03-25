# FinanzaPro — Financial Company Website

A modern, responsive financial company website built with Astro 6, Tailwind CSS v4, and Preact. The site is fully static-generated, SEO-optimized, and designed around a data-driven architecture that allows complete rebranding by editing TypeScript configuration files — no component changes needed.

The site content is in Spanish (Honduras), while all code and documentation is in English.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Astro](https://astro.build) | ^6.0 | Static site generator, file-based routing |
| [Tailwind CSS](https://tailwindcss.com) | ^4.2 | Utility-first styling via `@theme{}` with oklch colors |
| [Preact](https://preactjs.com) | ^10.29 | Interactive loan calculator island (3 KB runtime) |
| [TypeScript](https://www.typescriptlang.org) | ^5.9 | Strict mode, all source files typed |
| [Vitest](https://vitest.dev) | ^4.1 | Unit testing (71 tests across 3 test files) |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | ^3.7 | Auto-generated XML sitemap |
| Satoshi | — | Body typeface (self-hosted `.otf`, weights 400/500/700) |
| Clash Display | — | Heading typeface (self-hosted `.otf`, weights 500/600/700) |

---

## Features

- 5 fully built pages: Home, About, Services, Contact, and Calculator
- Interactive loan amortization calculator powered by a Preact island (`client:visible`)
- Full SEO suite: XML sitemap, JSON-LD structured data (Organization, FinancialService, Service catalog, WebApplication, BreadcrumbList, FAQPage), Open Graph tags, Twitter Card tags, and canonical URLs
- 11 CSS animations using scroll-driven timelines, `@property` CSS custom properties, and `prefers-reduced-motion` fallbacks for all of them
- Mobile-first responsive design tested at 320 px, 768 px, 1024 px, and 1440 px
- Accessibility targeting WCAG 2.1 AA: semantic HTML, ARIA attributes, keyboard navigation, minimum 44 x 44 px touch targets, visible focus rings
- Agnostic data layer — every piece of text, color token, and contact detail lives in TypeScript files under `src/data/`. Rebranding requires no component edits
- 71 unit tests covering calculator math, SEO schema generators, and data integrity

---

## Project Structure

```
financial-site/
├── public/
│   ├── Font/                        # Self-hosted fonts (Satoshi + Clash Display)
│   │   ├── Satoshi-Regular.otf
│   │   ├── Satoshi-Medium.otf
│   │   ├── Satoshi-Bold.otf
│   │   ├── ClashDisplay-Medium.otf
│   │   ├── ClashDisplay-Semibold.otf
│   │   └── ClashDisplay-Bold.otf
│   ├── images/                      # Static images (OG image, logo, etc.)
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── ui/                      # Reusable primitive components
│   │   │   ├── Badge.astro
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Container.astro
│   │   │   └── SectionHeading.astro
│   │   │
│   │   ├── home/                    # Sections used only on the Home page
│   │   │   ├── Hero.astro
│   │   │   ├── Features.astro
│   │   │   ├── ServicesPreview.astro
│   │   │   ├── Stats.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── Partners.astro
│   │   │   └── CTA.astro
│   │   │
│   │   ├── about/                   # Sections used only on the About page
│   │   │   ├── Mission.astro
│   │   │   ├── Values.astro
│   │   │   ├── Team.astro
│   │   │   └── Timeline.astro
│   │   │
│   │   ├── services/                # Sections used only on the Services page
│   │   │   ├── ServiceCard.astro
│   │   │   └── ServiceDetail.astro
│   │   │
│   │   ├── contact/                 # Sections used only on the Contact page
│   │   │   └── ContactForm.astro
│   │   │
│   │   ├── islands/                 # Preact interactive components
│   │   │   └── LoanCalculator.tsx
│   │   │
│   │   ├── Header.astro             # Site-wide header with scroll transition
│   │   └── Footer.astro             # Site-wide footer
│   │
│   ├── data/                        # All content and configuration (rebrand here)
│   │   ├── site.ts                  # Company name, URL, address, social links
│   │   ├── navigation.ts            # Nav items
│   │   ├── services.ts              # Service definitions with features list
│   │   ├── testimonials.ts          # Client testimonials
│   │   ├── team.ts                  # Team member profiles
│   │   ├── partners.ts              # Partner logos and names
│   │   ├── footer.ts                # Footer link groups
│   │   ├── pages-seo.ts             # Per-page SEO titles and descriptions
│   │   ├── data.test.ts             # Data integrity tests
│   │   └── content/                 # Page-level copy (text, labels, CTAs)
│   │       ├── home.ts
│   │       ├── about.ts
│   │       ├── services-page.ts
│   │       ├── contact.ts
│   │       ├── calculator.ts
│   │       └── header.ts
│   │
│   ├── layouts/
│   │   └── Layout.astro             # Base HTML layout (head, meta, JSON-LD)
│   │
│   ├── lib/                         # Pure utility functions
│   │   ├── calculator.ts            # Amortization math
│   │   ├── calculator.test.ts
│   │   ├── seo.ts                   # JSON-LD schema generators
│   │   └── seo.test.ts
│   │
│   ├── pages/                       # Astro file-based routes
│   │   ├── index.astro              # /
│   │   ├── about.astro              # /about
│   │   ├── services.astro           # /services
│   │   ├── contact.astro            # /contact
│   │   └── calculator.astro         # /calculator
│   │
│   ├── styles/
│   │   └── global.css               # @font-face, @theme{}, @keyframes, utility classes
│   │
│   └── types/
│       └── index.ts                 # All TypeScript interfaces and types
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js **22.12.0 or higher** (enforced via `engines` field in `package.json`)
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd financial-site

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server at http://localhost:4321
npm run dev
```

### Testing

```bash
# Run all 71 unit tests once
npm test

# Run tests in watch mode
npm run test:watch
```

---

## Pages

| Page | Route | Sections |
|---|---|---|
| **Home** | `/` | Hero, Features (4 value props), Services preview grid, Stats counter, Testimonials, Partners marquee, CTA |
| **About** | `/about` | Page hero, Mission & vision, Company values, Team profiles, Company history timeline |
| **Services** | `/services` | Page hero, Services overview grid (cards), Detailed service breakdowns, Contact CTA |
| **Contact** | `/contact` | Page hero, Contact form, Sidebar with address / phone / email / social links / map placeholder |
| **Calculator** | `/calculator` | Page hero, Interactive loan calculator (Preact island), Financial tips grid, Contact CTA |

Each page has its own hero section with a gradient background and decorative floating shapes. All pages inject page-specific JSON-LD structured data and breadcrumb schemas via the shared `Layout.astro`.

---

## Design System

### Color Palette

All colors are defined using the [oklch](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) color space in the `@theme {}` block inside `src/styles/global.css`. This gives perceptually uniform lightness and access to the P3 wide-gamut color range in modern browsers.

| Scale | Hue | Role |
|---|---|---|
| `primary` | 175 (teal) | Main brand color, buttons, links, focus rings |
| `secondary` | 260 (navy) | Dark surfaces, hero gradients |
| `accent` | 85 (amber/gold) | Highlights, badges, shimmer gradients |
| `neutral` | 260, low chroma | Body text, borders, backgrounds |
| `success` | 145 (green) | Positive feedback states |
| `warning` | 85 (amber) | Warning feedback states |
| `error` | 25 (red-orange) | Error feedback states |

Two special tokens are also defined: `--color-surface-glass` for the frosted-glass header effect, and `--shadow-glow` for the teal glow shadow used on CTAs.

### Typography

| Variable | Font | Weights | Usage |
|---|---|---|---|
| `--font-sans` | Satoshi | 400, 500, 700 | All body text, paragraphs, labels |
| `--font-heading` | Clash Display | 500, 600, 700 | All heading elements (`font-heading` class) |

Both fonts are self-hosted as `.otf` files in `public/Font/` and loaded via `@font-face` declarations with `font-display: swap` for performance.

### Customizing the Theme

All design tokens live in the `@theme {}` block at the top of `src/styles/global.css`. To change the brand color, update the hue value in the `--color-primary-*` scale:

```css
@theme {
  /* Change 175 to any hue (0–360) to shift the entire primary palette */
  --color-primary-500: oklch(0.62 0.17 220);  /* e.g., blue */
}
```

Tailwind v4 reads these CSS variables directly — no `tailwind.config.js` changes required.

### UI Component Variants

| Component | Variants |
|---|---|
| `Button` | `primary`, `secondary`, `outline`, `ghost` — sizes `sm`, `md`, `lg` |
| `Card` | `default`, `glass`, `elevated` |
| `Badge` | `primary`, `secondary`, `accent` |
| `Container` | `sm`, `md`, `lg`, `xl` |

---

## Animations

All 11 animations respect `prefers-reduced-motion` — each has an explicit `@media (prefers-reduced-motion: reduce)` block that disables or replaces the animation.

| # | Class | Technique | Description |
|---|---|---|---|
| 1 | `.animate-fade-in-up` + `.stagger-fade-in-up` | Scroll-driven (`animation-timeline: view()`) | Elements fade and rise as they enter the viewport; stagger modifier offsets each child by 5% |
| 2 | `.animate-slide-in-left` / `.animate-slide-in-right` | Scroll-driven | Elements slide in from either side on scroll; responsive `lg:` variants for the timeline layout |
| 3 | `.animate-card-hover` | CSS transition + cubic-bezier spring | Cards lift 4 px with a spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) and a deeper shadow on hover |
| 4 | `.animate-btn-shimmer` | `::after` pseudo-element, `@keyframes btn-shimmer` | A white highlight sweeps across the button surface on a 3 s loop |
| 5 | `.animate-hue-shift` | `@property --hue-offset`, `@keyframes hue-shift` | Background gradient slowly shifts its hue by ±30 degrees over 8 s (used on dark CTA sections) |
| 6 | `.animate-text-shimmer` | `background-clip: text`, `@keyframes text-shimmer` | Gradient text sweeps from teal to amber on a 6 s loop (used on hero accent words) |
| 7 | `.animate-pulse-glow` | `@keyframes pulse-glow` | Teal box-shadow breathes in and out on a 3 s loop (used on CTA buttons) |
| 8 | `.header-scrolled` | JavaScript class toggle on scroll | Header transitions from transparent to a frosted-glass surface (`backdrop-filter: blur(24px)`) when the user scrolls past the fold |
| 9 | `.animate-draw-line` | `@property --line-progress`, scroll-driven | The vertical timeline connector line draws itself from top to bottom as the section scrolls into view |
| 10 | `.animate-dot-pulse` | Scroll-driven | Timeline milestone dots scale up and emit a teal ring pulse when they enter the viewport |
| 11 | `.animate-marquee` | `@keyframes marquee`, `will-change: transform` | Partner logos scroll infinitely from right to left; the animation pauses on hover |

---

## Data Layer and Customization

The project is fully brand-agnostic. Every piece of copy, contact detail, service listing, and SEO metadata is defined in plain TypeScript files under `src/data/`. Components import from these files and contain no hardcoded strings. To rebrand the site for a different company, only the data layer needs to change.

### Data File Map

```
src/data/
├── site.ts              # Company identity
├── navigation.ts        # Header nav items
├── services.ts          # Service catalog (id, title, description, features, href)
├── testimonials.ts      # Client reviews (name, role, company, content, rating)
├── team.ts              # Team member profiles (name, role, bio, avatar, social)
├── partners.ts          # Partner logos for the marquee
├── footer.ts            # Footer link sections (services, company, legal)
├── pages-seo.ts         # Per-page SEO title + description (max 70/160 chars)
└── content/
    ├── home.ts          # Hero, features, stats, testimonials, partners, CTA copy
    ├── about.ts         # Mission, values, timeline, team section copy
    ├── services-page.ts # Services page hero, overview, detail section copy
    ├── contact.ts       # Contact form labels, sidebar labels, social aria-labels
    ├── calculator.ts    # Calculator labels, tips, CTA copy
    └── header.ts        # Logo text, CTA button text and href
```

### Rebranding Checklist

1. **`src/data/site.ts`** — Update `name`, `url`, `telephone`, `email`, `address`, and `social` links. This object is used by every page's JSON-LD schema and the contact sidebar.

```typescript
export const siteData = {
  name: 'YourCompany',
  url: 'https://www.yourcompany.com',
  telephone: '+1 555-123-4567',
  email: 'hello@yourcompany.com',
  address: { street: '...', city: '...', state: '...', zip: '...', country: 'US' },
  social: ['https://facebook.com/yourcompany', ...],
} satisfies SiteData;
```

2. **`src/data/services.ts`** — Replace the service entries. Each service needs a unique `id`, `title`, `description`, `icon` (SVG string), a `features` array, and an `href` anchor (e.g. `/services#loans`).

3. **`src/data/pages-seo.ts`** — Update the `title` (max 70 chars) and `description` (max 160 chars) for each of the 5 pages.

4. **`src/data/content/*.ts`** — Update all page copy: hero headlines, section subtitles, CTA button text, form labels, and tips.

5. **`astro.config.mjs`** — Update the `site` URL to match your production domain (required for sitemap generation).

6. **`src/styles/global.css`** — Update the `@theme {}` color scales to match your brand identity.

---

## Calculator

The loan calculator is a [Preact island](https://docs.astro.build/en/concepts/islands/) located at `src/components/islands/LoanCalculator.tsx`. It is hydrated with `client:visible`, meaning the JavaScript is loaded only when the component enters the viewport.

**Inputs:**

- Loan amount (Lempiras)
- Annual interest rate (%)
- Term (selectable from 6 to 120 months)

**Outputs:**

- Monthly payment
- Total payment
- Total interest
- Principal vs. interest ratio bar
- Full amortization schedule table (togglable)

**Calculation logic** lives in `src/lib/calculator.ts` as pure functions, fully decoupled from the UI:

```typescript
// Standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
calculateMonthlyPayment(input: LoanInput): number

// Returns full result object including the amortization schedule
calculateLoan(input: LoanInput): LoanResult

// Builds the month-by-month amortization table
calculateAmortizationSchedule(input: LoanInput): AmortizationEntry[]

// Formats a number as Lempiras: "L 1,234.56"
formatCurrency(amount: number): string
```

The calculator handles edge cases: zero interest rate (simple division), zero or negative amounts, and floating-point dust on the final balance (last month is forced to exactly 0).

All calculator UI labels are data-driven via `src/data/content/calculator.ts`, so the component can be relabeled without code changes.

---

## SEO

Every page is built with a full SEO setup injected through `src/layouts/Layout.astro`:

| Element | Details |
|---|---|
| `<title>` | Per-page, max 70 characters, defined in `pages-seo.ts` |
| `<meta name="description">` | Per-page, max 160 characters |
| `<link rel="canonical">` | Full absolute URL per page |
| Open Graph tags | `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`, `og:site_name` |
| Twitter Card tags | `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image` |
| `<script type="application/ld+json">` | Per-page JSON-LD; accepts a single object or an array |
| XML Sitemap | Auto-generated by `@astrojs/sitemap` at build time |

**JSON-LD schemas used per page:**

| Page | Schemas |
|---|---|
| Home (`/`) | `Organization` |
| About (`/about`) | `Organization` + `BreadcrumbList` |
| Services (`/services`) | `Organization` (with `OfferCatalog`) + `BreadcrumbList` |
| Contact (`/contact`) | `FinancialService` (LocalBusiness) + `BreadcrumbList` |
| Calculator (`/calculator`) | `WebApplication` + `BreadcrumbList` |

All schema generators are pure functions in `src/lib/seo.ts` that accept typed arguments and return plain objects serialized by the layout. A `generateFaqJsonLd` function is also available for future use.

---

## Testing

```bash
# Run all tests
npm test

# Run in watch mode (re-runs on file save)
npm run test:watch
```

Tests are co-located with the source they cover (`.test.ts` suffix, same directory). Vitest is configured via `vitest.config.ts` to include `src/**/*.test.ts`.

### Test Coverage by File

| File | Tests | What is covered |
|---|---|---|
| `src/lib/calculator.test.ts` | 22 | `calculateMonthlyPayment` (7 cases), `calculateLoan` (4 cases), `calculateAmortizationSchedule` (8 cases), `formatCurrency` (3 cases) |
| `src/lib/seo.test.ts` | 16 | All 6 JSON-LD generators: Organization, LocalBusiness/FinancialService, Service catalog, WebApplication, BreadcrumbList, FAQPage |
| `src/data/data.test.ts` | 33 | Data integrity: site config fields, navigation structure, service uniqueness, testimonial ratings, team completeness, footer links, SEO title/description length limits, page content shape, timeline chronological order, Spanish accent validation |

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `astro dev` | Start local dev server at `http://localhost:4321` |
| `build` | `astro build` | Build the static site to `./dist/` |
| `preview` | `astro preview` | Preview the production build locally |
| `astro` | `astro` | Direct Astro CLI access (e.g., `npm run astro add`) |
| `test` | `vitest run` | Run all unit tests once (CI mode) |
| `test:watch` | `vitest` | Run tests in interactive watch mode |

---

## License

MIT
