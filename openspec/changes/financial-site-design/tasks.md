# Tasks: Financial Site — Complete Design & Build

## Phase 1: Foundation (Infrastructure & Design System)

- [x] **1.1** Install dependencies and configure Astro integrations
  - **Files**: `package.json` (modify), `astro.config.mjs` (modify)
  - **What**: Run `npm install @astrojs/preact preact @astrojs/sitemap`. Add `preact()` and `sitemap()` integrations to `astro.config.mjs`. Set `site: 'https://www.example.com'` in config.
  - **Dependencies**: None
  - **Acceptance**: `npm run dev` starts without errors; `@astrojs/preact`, `preact`, and `@astrojs/sitemap` are in `package.json` dependencies; `astro.config.mjs` exports both integrations
  - **Complexity**: S

- [x] **1.2** Define `@theme {}` design tokens and `@keyframes` animations in global.css
  - **Files**: `src/styles/global.css` (modify)
  - **What**: Add the full oklch color palette (primary/teal hue 175, secondary/navy hue 260, accent/amber hue 85, neutral/slate, semantic colors, surface-glass tokens), border-radius tokens, shadow tokens, `--font-sans` and `--font-heading` tokens. Add `@keyframes fade-in-up`, `@keyframes count-up`, `@keyframes float`, and utility classes `.animate-fade-in-up`, `.animate-float`. Add `scroll-behavior: smooth` on `html`.
  - **Dependencies**: None
  - **Acceptance**: `bg-primary-500`, `text-secondary-700`, `bg-surface-glass` all resolve to correct oklch values (Spec 1: theme tokens generate utility classes). All shades 50-950 available for primary, secondary, neutral (Spec 1: all token shades available). `.animate-fade-in-up` triggers on scroll into view.
  - **Complexity**: M

- [x] **1.3** Create shared TypeScript interfaces
  - **Files**: `src/types/index.ts` (create)
  - **What**: Define all interfaces: `ButtonProps`, `CardProps`, `BadgeProps`, `SectionHeadingProps`, `ContainerProps`, `Service`, `Testimonial`, `TeamMember`, `Partner`, `NavItem`, `TimelineEvent`, `Stat`, `LoanInput`, `LoanResult`, `AmortizationEntry`, `SiteConfig`, `LayoutProps`. Use strict typing, no `any`.
  - **Dependencies**: None
  - **Acceptance**: All interfaces match the contracts defined in design.md; file compiles with zero TS errors under strict mode
  - **Complexity**: M

- [x] **1.4** Create static data files
  - **Files**: `src/data/navigation.json` (create), `src/data/services.json` (create), `src/data/testimonials.json` (create), `src/data/team.json` (create), `src/data/partners.json` (create), `src/data/site.json` (create)
  - **What**: Populate with realistic financial company content (not lorem ipsum). Navigation: 5 links (Home, About, Services, Contact, Calculator). Services: 4-6 financial services with id, title, description, icon, features, href. Testimonials: 3-4 entries with name, role, company, content, rating. Team: 4-6 members with name, role, bio, avatar placeholder. Partners: 5-6 partner names with logo placeholders. Site config: company name, placeholder URL, address, telephone, social links.
  - **Dependencies**: 1.3 (interfaces define the data shape)
  - **Acceptance**: All JSON files are valid and structurally match their corresponding TypeScript interfaces; services have `features` arrays (Spec 7: service detail shows features)
  - **Complexity**: M

- [x] **1.5** Create SEO helper library
  - **Files**: `src/lib/seo.ts` (create)
  - **What**: Implement `generateOrganizationJsonLd()`, `generateLocalBusinessJsonLd()`, `generateServiceJsonLd()`, `generateWebAppJsonLd()`, `generateBreadcrumbJsonLd()`, and `generateFaqJsonLd()`. All functions accept typed inputs and return valid JSON-LD objects.
  - **Dependencies**: 1.3 (uses `SiteConfig`, `Service` interfaces)
  - **Acceptance**: Homepage JSON-LD contains valid `Organization` schema with name, url, logo (Spec 2: homepage JSON-LD validates). Inner pages produce valid `WebPage`/specialized schemas (Spec 2: inner page JSON-LD renders).
  - **Complexity**: M

- [x] **1.6** Build UI primitives — Container and SectionHeading
  - **Files**: `src/components/ui/Container.astro` (create), `src/components/ui/SectionHeading.astro` (create)
  - **What**: `Container.astro`: max-width centered wrapper with size variants (sm/md/lg/xl), accepts `class` prop. `SectionHeading.astro`: renders title (h2), optional subtitle, optional badge above title, align prop (left/center). Both include `dark:` variants.
  - **Dependencies**: 1.2 (needs design tokens)
  - **Acceptance**: Container constrains content width; heading hierarchy uses `<h2>` (Spec 11: heading hierarchy). Both components render correctly in light and dark mode.
  - **Complexity**: S

- [x] **1.7** Build UI primitives — Button, Card, Badge
  - **Files**: `src/components/ui/Button.astro` (create), `src/components/ui/Card.astro` (create), `src/components/ui/Badge.astro` (create)
  - **What**: `Button.astro`: renders `<a>` if `href` present, else `<button>`. Variants: primary, secondary, outline, ghost. Sizes: sm, md, lg. Focus-visible ring. 44px min touch target. `Card.astro`: variants default/glass/elevated. Slot-based content. Dark mode borders and shadows. `Badge.astro`: small label with primary/secondary/accent variants.
  - **Dependencies**: 1.2 (needs design tokens)
  - **Acceptance**: Button has visible focus ring (Spec 11: focus rings on buttons). Touch targets >= 44px (Spec 10: touch targets). Card adapts in dark mode (Spec 12: card component in dark mode). All primitives use Tailwind utilities only.
  - **Complexity**: M

- [x] **1.8** Build Layout.astro with full SEO `<head>`
  - **Files**: `src/layouts/Layout.astro` (modify — complete rewrite)
  - **What**: Accept typed props (`title`, `description`, `image?`, `url`, `type?`, `jsonLd?`). Render: `<title>`, `<meta name="description">`, OG tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), `<link rel="canonical">`, `<script type="application/ld+json">` for JSON-LD. Load Inter font via Google Fonts `<link>`. Import `global.css`. Add `<header>`, `<main>`, `<footer>` landmarks. Compose Header + `<slot />` + Footer. Set `lang="en"` on `<html>`. Apply body classes: `bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans`.
  - **Dependencies**: 1.2 (tokens), 1.3 (LayoutProps interface), 1.5 (seo helper)
  - **Acceptance**: Page renders with correct `<title>` and `<meta>` tags (Spec 2: page renders with correct meta). OG tags present (Spec 2: OG tags render). Canonical URL renders (Spec 2: canonical URL). JSON-LD script tag present (Spec 2: homepage JSON-LD). Landmark elements `<header>`, `<main>`, `<footer>` present (Spec 11: landmark elements). No white flash in dark mode (Spec 12: no white flash on load).
  - **Complexity**: M

- [x] **1.9** Build Header.astro with glassmorphism and CSS-only mobile nav
  - **Files**: `src/components/Header.astro` (create)
  - **What**: Fixed position header with `bg-surface-glass backdrop-blur-xl`. Logo/company name on left. Desktop nav: horizontal links visible at `lg:` (>=1024px). Mobile nav: hidden checkbox input + hamburger button + peer-checked slide-in menu. Active link detection using `Astro.url.pathname`. Navigation links from `navigation.json`. All links have 44px touch targets on mobile. `aria-label` on hamburger button. Focus trap considerations. Dark mode: `dark:bg-surface-glass-dark`, `dark:border-neutral-800/50`.
  - **Dependencies**: 1.2 (tokens), 1.4 (navigation.json), 1.8 (composed in Layout)
  - **Acceptance**: Desktop: horizontal links visible, hamburger hidden (Spec 3: desktop nav). Mobile: hamburger visible, links hidden (Spec 3: mobile nav). Menu opens/closes on hamburger tap (Spec 3: mobile menu toggle). Glassmorphism effect with backdrop-blur (Spec 3: glassmorphism). Current page link highlighted (Spec 3: active link state). Hamburger has `aria-label` (Spec 11: ARIA labels). Keyboard: Enter opens menu, Escape closes (Spec 11: mobile menu keyboard accessible). Touch targets >= 44px (Spec 10: nav touch targets).
  - **Complexity**: L

- [x] **1.10** Build Footer.astro
  - **Files**: `src/components/Footer.astro` (create)
  - **What**: Multi-column layout: company info + logo, nav links grouped by category, contact info (email, phone, address from `site.json`), social links with `aria-label`. Copyright with dynamic year. Mobile: single column stack. Desktop (md:+): multi-column grid. Dark mode variants. Social icon links with `aria-label`.
  - **Dependencies**: 1.2 (tokens), 1.4 (navigation.json, site.json)
  - **Acceptance**: Footer shows company name, nav links, copyright with current year, contact info (Spec 4: footer content). Stacks on mobile < 768px (Spec 4: footer columns stack). Multi-column on desktop (Spec 4: multi-column desktop). Icon-only social links have `aria-label` (Spec 11: icon-only social links).
  - **Complexity**: M

- [x] **1.11** Add robots.txt and delete starter assets
  - **Files**: `public/robots.txt` (create), `src/components/Welcome.astro` (delete), `src/assets/astro.svg` (delete), `src/assets/background.svg` (delete)
  - **What**: Create `robots.txt` with `User-agent: *`, `Allow: /`, and `Sitemap: https://www.example.com/sitemap-index.xml`. Remove unused Astro starter files.
  - **Dependencies**: None
  - **Acceptance**: `/robots.txt` contains User-agent, Allow, and Sitemap reference (Spec 2: robots.txt allows crawling). Starter assets removed.
  - **Complexity**: S

## Phase 2: Homepage (Sections & Page Assembly)

- [x] **2.1** Build Hero.astro
  - **Files**: `src/components/home/Hero.astro` (create)
  - **What**: Full-width section with gradient background (`from-primary-600 to-secondary-900`, dark variants). Headline `<h1>`, subheadline `<p>`, two CTA buttons (primary → `/services`, secondary/outline → `/contact`). Uses Container for max-width. Mobile: single column, stacked CTAs. Desktop: wider spacing. Entrance animation class `.animate-fade-in-up`.
  - **Dependencies**: 1.6 (Container), 1.7 (Button), 1.2 (tokens)
  - **Acceptance**: CTA navigates to target page (Spec 5: Hero CTA). Gradient background renders (Spec 5: Hero gradient). Has exactly one `<h1>` (Spec 11: heading hierarchy). Text contrast >= 4.5:1 on gradient (Spec 11: text on gradient).
  - **Complexity**: M

- [x] **2.2** Build Features.astro
  - **Files**: `src/components/home/Features.astro` (create)
  - **What**: Section heading + responsive grid of feature cards. 1 column mobile, 2 columns md:, 3 columns lg:. Each card: icon (inline SVG or emoji), title, description. Uses Card primitive. Data defined inline (features are homepage-specific, not in JSON). Semantic `<ul>` with `<li>` items.
  - **Dependencies**: 1.6 (SectionHeading, Container), 1.7 (Card)
  - **Acceptance**: All N feature items render (Spec 5: features grid renders all items). 1-col mobile, 2-col md, 3-col lg (Spec 5: features grid responsive). Items use `<ul>`/`<li>` (Spec 11: lists use list elements).
  - **Complexity**: M

- [x] **2.3** Build ServicesPreview.astro
  - **Files**: `src/components/home/ServicesPreview.astro` (create)
  - **What**: Section heading + grid of service cards (first 3-4 from services.json) + "View All Services" link to `/services`. Each card shows icon, title, short description. Uses Card and Button primitives.
  - **Dependencies**: 1.4 (services.json), 1.6 (SectionHeading, Container), 1.7 (Card, Button)
  - **Acceptance**: Cards link to `/services` (Spec 5: service cards link). "View All" link navigates to `/services`.
  - **Complexity**: S

- [x] **2.4** Build Stats.astro
  - **Files**: `src/components/home/Stats.astro` (create)
  - **What**: Dark background section (`bg-secondary-900 dark:bg-secondary-950`). Grid of 4 stat items (years experience, clients served, etc.). CSS counter animation using `@property` or `animation-timeline: view()`. Stats data defined inline. `motion-reduce:` fallback shows final values immediately. Semantic markup.
  - **Dependencies**: 1.2 (tokens, @keyframes), 1.6 (Container)
  - **Acceptance**: Stats display numeric values and labels (Spec 5: stats display). Numbers animate on viewport entry (Spec 5: stats animate). Final values visible with reduced motion or no JS (Spec 5: stats without JS fallback).
  - **Complexity**: M

- [x] **2.5** Build Testimonials.astro
  - **Files**: `src/components/home/Testimonials.astro` (create)
  - **What**: Section heading + grid of testimonial cards. Each card: quote text, author name, role/company, optional star rating. Loads data from `testimonials.json`. Uses Card primitive. Responsive: 1-col mobile, 2-col md, 3-col lg.
  - **Dependencies**: 1.4 (testimonials.json), 1.6 (SectionHeading, Container), 1.7 (Card)
  - **Acceptance**: Each testimonial shows quote, author name, role/company (Spec 5: testimonials render from data). Grid layout responsive.
  - **Complexity**: S

- [x] **2.6** Build Partners.astro
  - **Files**: `src/components/home/Partners.astro` (create)
  - **What**: Horizontal logo strip. Loads from `partners.json`. Each partner: image with descriptive `alt` text, or text-based placeholder if no logo asset exists. Responsive wrapping. Muted/grayscale treatment with hover color.
  - **Dependencies**: 1.4 (partners.json), 1.6 (Container)
  - **Acceptance**: All partner logos/names displayed (Spec 5: partner logos render). Logos have descriptive `alt` text (Spec 5 + Spec 11: images have alt text).
  - **Complexity**: S

- [x] **2.7** Build CTA.astro
  - **Files**: `src/components/home/CTA.astro` (create)
  - **What**: Full-width gradient banner (`from-primary-600 to-primary-800`, dark variants). Headline, supporting text, CTA button linking to `/contact`. Uses Container and Button.
  - **Dependencies**: 1.6 (Container), 1.7 (Button)
  - **Acceptance**: CTA button navigates to target (Spec 5: CTA button navigates). Gradient background renders. Text contrast meets WCAG on gradient.
  - **Complexity**: S

- [x] **2.8** Assemble homepage — wire all sections into index.astro
  - **Files**: `src/pages/index.astro` (modify — complete rewrite)
  - **What**: Import Layout with homepage SEO props (title, description, OG, JSON-LD using `generateOrganizationJsonLd()`). Import and compose all 7 sections in order: Hero, Features, ServicesPreview, Stats, Testimonials, Partners, CTA. Import data files in frontmatter. Pass data as props to sections.
  - **Dependencies**: 1.5 (seo.ts), 1.8 (Layout), 2.1-2.7 (all homepage sections)
  - **Acceptance**: Homepage renders all 7 sections without errors. JSON-LD contains valid Organization schema (Spec 2: homepage JSON-LD validates). Exactly one `<h1>` on the page (Spec 11: homepage heading hierarchy). No horizontal scroll at any breakpoint (Spec 10). Sitemap includes `/` (Spec 2: sitemap).
  - **Complexity**: M

## Phase 3: Inner Pages (About, Services, Contact)

- [x] **3.1** Build Mission.astro
  - **Files**: `src/components/about/Mission.astro` (create)
  - **What**: Section with heading (`<h2>`) and mission description text. Uses Container and SectionHeading. Clean typography, possibly with decorative accent. Dark mode variants.
  - **Dependencies**: 1.6 (Container, SectionHeading)
  - **Acceptance**: Section heading and description text render (Spec 6: mission renders). Heading is `<h2>` under page `<h1>` (Spec 6: heading hierarchy).
  - **Complexity**: S

- [x] **3.2** Build Values.astro
  - **Files**: `src/components/about/Values.astro` (create)
  - **What**: Grid of value cards. Each value: icon/illustration, title, description. Uses Card primitive. Responsive: 1-col mobile, 2-col md, 3-4 col lg. Data defined inline or in component.
  - **Dependencies**: 1.6 (SectionHeading, Container), 1.7 (Card)
  - **Acceptance**: Each value shows title and description (Spec 6: values render). Visual icon/illustration present (Spec 6: values include icon).
  - **Complexity**: S

- [x] **3.3** Build Team.astro
  - **Files**: `src/components/about/Team.astro` (create)
  - **What**: Team member cards grid. Load from `team.json`. Each card: avatar image, name, role, bio snippet. Avatar images have `alt` text containing member name. Responsive: 1-2 col mobile, 3-4 col desktop. Uses Card primitive.
  - **Dependencies**: 1.4 (team.json), 1.6 (SectionHeading, Container), 1.7 (Card)
  - **Acceptance**: Each member shows name, role, image (Spec 6: team cards render). `alt` text contains name (Spec 6: team card alt text). 1-2 col mobile, 3-4 col desktop (Spec 6: team cards responsive).
  - **Complexity**: M

- [x] **3.4** Build Timeline.astro
  - **Files**: `src/components/about/Timeline.astro` (create)
  - **What**: Vertical timeline of company milestones. Each entry: year, title, description. Data defined inline. Visual timeline line with dot markers. Responsive: simplified on mobile. Entrance animations via `.animate-fade-in-up`.
  - **Dependencies**: 1.6 (Container, SectionHeading), 1.2 (animation classes)
  - **Acceptance**: Milestones appear in chronological order (Spec 6: timeline renders in order). Each shows year, title, description (Spec 6: timeline content).
  - **Complexity**: M

- [x] **3.5** Assemble About page
  - **Files**: `src/pages/about.astro` (create)
  - **What**: Import Layout with About SEO props. Compose sections: page `<h1>` "About Us", Mission, Values, Team, Timeline. Pass JSON-LD (extended Organization schema). Import team.json in frontmatter.
  - **Dependencies**: 1.5 (seo.ts), 1.8 (Layout), 3.1-3.4 (about sections)
  - **Acceptance**: Page renders all 4 sections. One `<h1>` element (Spec 11: inner page heading hierarchy). JSON-LD validates (Spec 2: inner page JSON-LD). No horizontal scroll (Spec 10).
  - **Complexity**: S

- [x] **3.6** Build ServiceCard.astro and ServiceDetail.astro
  - **Files**: `src/components/services/ServiceCard.astro` (create), `src/components/services/ServiceDetail.astro` (create)
  - **What**: `ServiceCard.astro`: overview card with icon, title, description, Badge for category, Button for "Learn More" (anchor link). `ServiceDetail.astro`: expanded section showing full description + features list using `<ul>` with `<li>`. Dark mode variants on both.
  - **Dependencies**: 1.7 (Card, Button, Badge)
  - **Acceptance**: Card shows service name, description, icon (Spec 7: all services render). Features listed in semantic `<ul>` (Spec 7: service detail shows features). Page doesn't crash with empty data (Spec 7: services data empty).
  - **Complexity**: M

- [x] **3.7** Assemble Services page
  - **Files**: `src/pages/services.astro` (create)
  - **What**: Import Layout with Services SEO props. Page `<h1>` "Our Services". Import `services.json`. Render ServiceCard for each service, followed by ServiceDetail sections with anchor IDs. Pass JSON-LD (Service catalog schema).
  - **Dependencies**: 1.4 (services.json), 1.5 (seo.ts), 1.8 (Layout), 3.6 (service components)
  - **Acceptance**: All services from JSON render (Spec 7). JSON-LD validates. One `<h1>`. No horizontal scroll.
  - **Complexity**: S

- [x] **3.8** Build ContactForm.astro
  - **Files**: `src/components/contact/ContactForm.astro` (create)
  - **What**: HTML5 form with fields: name (`required`), email (`required`, `type="email"`), phone (optional), subject (optional), message (`required`, `minlength`). Native validation via `:valid`/`:invalid` CSS pseudo-classes. Error styles using `peer-invalid:`. Submit button with disabled visual state. On submit: prevent default, show demo success message via CSS (checkbox/details pattern or small inline `<script>`). No network requests. Accessible: all inputs have `<label>`, error messages with `aria-describedby`. Dark mode input styles. 44px touch targets on inputs and button.
  - **Dependencies**: 1.2 (tokens), 1.7 (Button)
  - **Acceptance**: Empty submission prevented with error messages (Spec 8: empty form prevented). Invalid email rejected (Spec 8: invalid email). Valid form shows success/demo message (Spec 8: valid form success). No network requests (Spec 8: no backend dependency). Button visually disabled when form invalid (Spec 8: button states). All inputs have labels (Spec 11). Dark mode input styling correct (Spec 12: form inputs dark mode).
  - **Complexity**: L

- [x] **3.9** Assemble Contact page
  - **Files**: `src/pages/contact.astro` (create)
  - **What**: Import Layout with Contact SEO props. Page `<h1>` "Contact Us". ContactForm component. Sidebar or section with contact info (address, phone, email from `site.json`). Map placeholder or directions text. JSON-LD: LocalBusiness schema.
  - **Dependencies**: 1.4 (site.json), 1.5 (seo.ts), 1.8 (Layout), 3.8 (ContactForm)
  - **Acceptance**: Page renders form and contact info. JSON-LD validates. One `<h1>`. No horizontal scroll.
  - **Complexity**: S

## Phase 4: Calculator (Preact Island)

- [x] **4.1** Implement pure calculation functions
  - **Files**: `src/lib/calculator.ts` (create)
  - **What**: Implement `calculateMonthlyPayment(input: LoanInput): number`, `calculateTotalInterest(input: LoanInput): number`, `calculateLoan(input: LoanInput): LoanResult`, `calculateAmortizationSchedule(input: LoanInput): AmortizationEntry[]`, `formatCurrency(amount: number): string`. Use standard amortization formula: `M = P * [r(1+r)^n] / [(1+r)^n - 1]`. Handle edge case: 0% interest rate (simple division). All functions pure, no side effects.
  - **Dependencies**: 1.3 (LoanInput, LoanResult, AmortizationEntry interfaces)
  - **Acceptance**: $200,000 at 6% for 30yr = ~$1,199.10/mo (Spec 9: correct monthly payment). $10,000 at 5% for 1yr = ~$856.07/mo (Spec 9: short-term loan). $12,000 at 0% for 12mo = $1,000.00 exactly (Spec 9: zero interest). All functions are pure with no side effects.
  - **Complexity**: M

- [x] **4.2** Build LoanCalculator.tsx Preact island
  - **Files**: `src/components/islands/LoanCalculator.tsx` (create)
  - **What**: Preact component with hooks. Inputs: loan amount (range + number), annual interest rate (range + number), loan term in years (select or range). Input validation: reject negative/zero values, warn on rate > 50%. Real-time calculation on input change with 300ms debounce. Display: monthly payment, total payment, total interest. Collapsible amortization summary. All styling with Tailwind utilities. Dark mode classes. Accessible: labels on all inputs, keyboard navigable, focus-visible rings. `motion-reduce:` respect.
  - **Dependencies**: 1.1 (Preact installed), 1.2 (tokens), 4.1 (calculator functions)
  - **Acceptance**: Results update on input change without page reload (Spec 9: real-time updates). Negative principal rejected (Spec 9: negative principal). Zero term rejected (Spec 9: zero term). Rate > 50% shows warning (Spec 9: high rate warning). Non-numeric input handled (Spec 9: non-numeric). Amortization summary displayed (Spec 9: amortization table). All inputs keyboard navigable (Spec 11: calculator keyboard nav). Dark mode inputs correct (Spec 12: form inputs dark mode).
  - **Complexity**: L

- [x] **4.3** Assemble Calculator page
  - **Files**: `src/pages/calculator.astro` (create)
  - **What**: Import Layout with Calculator SEO props. Page `<h1>` "Loan Calculator". SectionHeading with description. Import LoanCalculator with `client:visible` directive. Static placeholder/intro text above the island. JSON-LD: WebApplication schema.
  - **Dependencies**: 1.5 (seo.ts), 1.6 (SectionHeading), 1.8 (Layout), 4.2 (LoanCalculator)
  - **Acceptance**: Calculator hydrates when scrolled into view (Spec 9: client:visible hydration). Static placeholder visible before hydration (Spec 9: meaningful static placeholder). Page has one `<h1>`. JSON-LD validates. No horizontal scroll.
  - **Complexity**: S

## Phase 5: Polish (Responsive, Animations, Accessibility)

> **Note**: Dark mode was removed per user request. All `dark:` variant classes stripped from every component and page. Light mode only.

- [x] **5.1** Responsive audit and fixes at all breakpoints
  - **Files**: All page and component files as needed
  - **What**: Test every page at 320px, 768px, 1024px, 1440px. Fix any horizontal overflow. Verify grid columns collapse correctly. Ensure touch targets >= 44px on mobile. Check text readability at 320px (no truncated content). Verify Container max-widths at 1440px+.
  - **Dependencies**: 2.8, 3.5, 3.7, 3.9, 4.3 (all pages assembled)
  - **Acceptance**: No horizontal scrollbar at any breakpoint on any page (Spec 10: no overflow 320/768/1440). Touch targets >= 44px (Spec 10: touch targets). Base styles target mobile, breakpoints scale up (Spec 10: mobile-first).
  - **Complexity**: M
  - **Result**: All pages use mobile-first responsive patterns. Grid layouts collapse correctly (1→2→3/4 cols). Touch targets meet 44px minimum (min-h-[2.75rem] on buttons/inputs). Container max-widths constrain content properly. Overflow hidden on gradient sections prevents horizontal scroll.

- [x] **5.2** Entrance animations and scroll-driven triggers
  - **Files**: Components that need entrance effects (Hero, Features, Stats, Team, Timeline, CTA)
  - **What**: Add `.animate-fade-in-up` class to section elements that should fade in on scroll. Verify `animation-timeline: view()` works in supported browsers. Ensure graceful degradation (elements visible without animation in unsupported browsers). Apply `motion-reduce:animate-none` variants.
  - **Dependencies**: 1.2 (animation classes), 5.1 (responsive verified first)
  - **Acceptance**: Elements animate on scroll in supported browsers. Elements visible without JS or in unsupported browsers. `prefers-reduced-motion: reduce` disables animations (Spec 5: stats without JS fallback).
  - **Complexity**: S
  - **Result**: `.animate-fade-in-up` applied to all section elements (Hero, Features cards, Service cards, Stats, Testimonials, Team, Timeline, CTA, contact cards, calculator tips). `animation-timeline: view()` configured in global.css. `@media (prefers-reduced-motion: reduce)` fallback disables all animations. `.animate-float` also has reduced motion fallback.

- [x] **5.3** Accessibility audit and fixes
  - **Files**: All components as needed
  - **What**: Verify: exactly one `<h1>` per page, sequential heading levels (h1 > h2 > h3). All images have appropriate `alt` text (descriptive for informative, empty for decorative). All form inputs have `<label>`. All icon-only buttons have `aria-label`. Focus visible on all interactive elements with sufficient contrast. `<nav>` used for navigation. Lists use `<ul>`/`<ol>`. Tab order follows visual order. Mobile menu keyboard accessible (Enter opens, Escape closes). No `outline: none` without replacement.
  - **Dependencies**: 5.1 (responsive fixes done)
  - **Acceptance**: One `<h1>` per page (Spec 11: heading hierarchy). Tab order logical (Spec 11: tab order). Focus rings visible and contrasted (Spec 11: focus visibility). Hamburger has `aria-label` (Spec 11: ARIA labels). All images have `alt` (Spec 11: images). Lists use semantic elements (Spec 11: lists). Landmark elements present (Spec 11: landmarks).
  - **Complexity**: M
  - **Result**: All pages have exactly one h1. Heading hierarchy is h1→h2→h3 (no skips). All decorative SVGs have aria-hidden="true". All form inputs have associated labels. Hamburger has aria-label="Abrir menú de navegación". All social links have aria-label. Focus-visible rings use outline-2 + outline-offset-2 + outline-primary-500. Semantic landmarks: header, nav (x2), main, footer. Lists use ul/ol. aria-live="polite" on calculator results. Fixed calculator page CTA focus ring to use consistent outline pattern.

- ~~**5.4** Dark mode consistency audit~~ **SKIPPED** — Dark mode removed per user request. All `dark:` variants stripped from every file. Dark mode flash prevention script removed from Layout.astro. `--color-surface-glass-dark` token removed from global.css.

- [x] **5.5** Navigation links and internal linking verification
  - **Files**: Header, Footer, all pages with internal links
  - **What**: Verify all navigation links work (Home, About, Services, Contact, Calculator). Verify all CTA buttons link to correct targets. Verify "View All Services" links. Verify footer nav links. Check for any broken internal links. Ensure active state highlights correctly on each page.
  - **Dependencies**: All pages assembled
  - **Acceptance**: All 5 pages reachable from header nav. Active link highlighted per page (Spec 3: active link state). Hero CTA links work (Spec 5). Service preview links work (Spec 5). CTA banner links work (Spec 5). Footer links work.
  - **Complexity**: S
  - **Result**: Header nav has 5 links (/, /about, /services, /contact, /calculator) matching navigation.json. Desktop CTA → /contact. Mobile CTA → /contact. Hero CTAs → /services and /calculator. ServicesPreview "Ver Todos" → /services. CTA banner → /contact and /calculator. Footer links: service anchors to /services#id, empresa links to correct pages, legal links to #. Logo → / in both Header and Footer. Active link detection via Astro.url.pathname works correctly.

- [x] **5.6** SEO and performance verification
  - **Files**: All pages, `public/robots.txt`, sitemap config
  - **What**: Verify JSON-LD on each page validates (use structured data testing). Verify sitemap at `/sitemap-index.xml` contains all 5 pages. Verify `robots.txt` accessible. Check OG tags render on all pages. Verify canonical URLs. Ensure zero `console.log` in code. Check that only one Preact island loads (calculator page only). Verify Inter font loads.
  - **Dependencies**: All pages assembled
  - **Acceptance**: Sitemap includes all 5 pages (Spec 2: sitemap). robots.txt has User-agent, Allow, Sitemap (Spec 2: robots.txt). JSON-LD valid on all pages (Spec 2: JSON-LD). OG tags on all pages (Spec 2: OG tags). Zero console.log in production code. Only ~6KB JS on calculator page, 0KB JS on other pages.
  - **Complexity**: M
  - **Result**: All 5 pages have unique title + description. OG tags rendered via Layout.astro (og:title, og:description, og:image, og:url, og:type, og:locale, og:site_name). Twitter Card tags present. Canonical URLs set. JSON-LD per page: index=Organization, about=Organization+Breadcrumb, services=Service+Breadcrumb, contact=LocalBusiness+Breadcrumb, calculator=WebApp+Breadcrumb. robots.txt has User-agent/Allow/Sitemap. Sitemap integration configured in astro.config.mjs with site URL. Zero console.log in source. Preact island only on calculator page (client:visible). Inter font loaded via Google Fonts with preconnect.
