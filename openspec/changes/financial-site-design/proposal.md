# Proposal: Financial Site — Complete Design & Build

## Intent

The project currently has a minimal Astro 6 scaffold with no meaningful pages or design system. The goal is to build a complete, production-quality financial company website that:

- Establishes trust and credibility through modern, polished visual design
- Provides clear information architecture across 5 key pages
- Includes an interactive loan calculator as a lead-generation tool
- Ships with strong SEO foundations (sitemap, structured data, OG tags)
- Uses a cohesive teal/navy design token system built on Tailwind v4's `@theme {}`

This is a greenfield build — we're creating the entire frontend from scratch on top of the existing Astro skeleton.

## Scope

### In Scope

- **Design token system**: oklch teal/emerald primary + navy secondary palette in `@theme {}`
- **Layout system**: Base layout with SEO meta, glassmorphism header, footer
- **5 pages**: Homepage, About, Services, Contact, Calculator
- **~24 components**: UI primitives, page sections, interactive islands
- **Calculator island**: Preact-based loan/credit calculator with pure calculation logic
- **SEO infrastructure**: Sitemap, JSON-LD structured data, OG tags, robots.txt, canonical URLs
- **Entrance animations**: CSS `@keyframes` for fade-in-up, counter animations
- **Responsive design**: Mobile-first, tested at 320px / 768px / 1024px / 1440px
- **Dark mode**: Full `dark:` variant support across all components
- **Static data files**: Services, testimonials, team, navigation as JSON

### Out of Scope

- Contact form backend/submission handler (placeholder action, backend TBD)
- CMS integration (content lives as static JSON/Astro for now)
- User authentication or account features
- Payment processing
- Blog section (future phase)
- E2E or unit test suite (deferred — can be added via separate change)
- i18n / multi-language support

## Approach

Build in 5 sequential phases, each producing a shippable increment:

### Phase 1 — Foundation

Set up the design system, layout shell, and infrastructure.

- Install dependencies: `@astrojs/preact`, `preact`, `@astrojs/sitemap`
- Configure `astro.config.mjs` with preact + sitemap integrations
- Define full oklch color palette in `src/styles/global.css` `@theme {}` block
- Build `Layout.astro` with SEO props (title, description, OG, JSON-LD)
- Build `Header.astro` (glassmorphism, responsive nav) and `Footer.astro`
- Create UI primitives: `Button.astro`, `Card.astro`, `Badge.astro`, `SectionHeading.astro`, `Container.astro`
- Create shared TypeScript interfaces in `src/types/index.ts`
- Create `src/lib/seo.ts` (JSON-LD helper)
- Add `public/robots.txt`
- Add `@keyframes` animations in `src/styles/global.css`

### Phase 2 — Homepage

Build all homepage sections, composing the UI primitives from Phase 1.

- `Hero.astro` — gradient background, headline, CTA buttons
- `Features.astro` — icon cards grid
- `ServicesPreview.astro` — service cards with links to /services
- `Testimonials.astro` — testimonial carousel/grid
- `Stats.astro` — animated counter section
- `CTA.astro` — gradient call-to-action banner
- `Partners.astro` — logo strip
- Wire sections into `src/pages/index.astro`
- Create static data files: `src/data/services.json`, `src/data/testimonials.json`, `src/data/partners.json`

### Phase 3 — Inner Pages

Build About, Services, and Contact pages with their section components.

- **About**: `Mission.astro`, `Team.astro`, `Timeline.astro`, `Values.astro` + `src/data/team.json`
- **Services**: `ServiceCard.astro`, `ServiceDetail.astro` + full service data
- **Contact**: `ContactForm.astro` (client-side validation, no backend)
- Create `src/pages/about.astro`, `src/pages/services.astro`, `src/pages/contact.astro`

### Phase 4 — Calculator

Build the interactive Preact island.

- `src/lib/calculator.ts` — pure functions for loan amortization, monthly payment, total interest
- `src/components/islands/LoanCalculator.tsx` — Preact component with `client:visible`
- `src/pages/calculator.astro` — page wrapper
- Input validation and result display with Tailwind styling

### Phase 5 — Polish

Final quality pass.

- Responsive fine-tuning at all breakpoints (320, 768, 1024, 1440)
- Entrance animation triggers (intersection observer or CSS-only)
- Accessibility audit: semantic HTML, ARIA labels, keyboard navigation, focus rings, contrast
- Dark mode consistency check across all components
- Performance check: image optimization hints, minimal JS budget
- Navigation links and internal linking

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `astro.config.mjs` | Modified | Add preact + sitemap integrations |
| `package.json` | Modified | Add @astrojs/preact, preact, @astrojs/sitemap |
| `src/styles/global.css` | Modified | Full @theme {} color system + @keyframes animations |
| `src/layouts/Layout.astro` | Modified | Complete rewrite with SEO, header, footer |
| `src/components/Header.astro` | New | Glassmorphism responsive navigation |
| `src/components/Footer.astro` | New | Site footer with links and info |
| `src/components/ui/*.astro` | New | 5 UI primitives (Button, Card, Badge, SectionHeading, Container) |
| `src/components/home/*.astro` | New | 7 homepage section components |
| `src/components/about/*.astro` | New | 4 about page section components |
| `src/components/services/*.astro` | New | 2 service components |
| `src/components/contact/*.astro` | New | 1 contact form component |
| `src/components/islands/LoanCalculator.tsx` | New | Preact calculator island |
| `src/pages/index.astro` | Modified | Full homepage with all sections |
| `src/pages/about.astro` | New | About page |
| `src/pages/services.astro` | New | Services page |
| `src/pages/contact.astro` | New | Contact page |
| `src/pages/calculator.astro` | New | Calculator page |
| `src/lib/calculator.ts` | New | Pure loan calculation functions |
| `src/lib/seo.ts` | New | JSON-LD structured data helper |
| `src/data/*.json` | New | Static data (services, testimonials, team, partners, navigation) |
| `src/types/index.ts` | New | Shared TypeScript interfaces |
| `public/robots.txt` | New | Robots.txt for crawlers |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Teal/green palette fails WCAG contrast on white backgrounds | Medium | Use oklch hues 170-180 (teal, not pure green); test primary-600+ for text on white; keep primary-500 for large text/decorative only |
| Calculator scope creep (multiple loan types, complex amortization) | Medium | Start with one generic loan calculator; pure functions in `lib/calculator.ts` make it easy to extend later |
| Contact form with no backend confuses users | Low | Clear UI messaging that form is a demo; structure the component so a backend can be plugged in trivially |
| Large number of new components (~24) creates inconsistency | Medium | Build UI primitives first (Phase 1); all section components compose from primitives; design tokens enforce consistency |
| Preact island adds JS bundle weight | Low | Only one island (`LoanCalculator`), loaded with `client:visible`; rest of site is zero-JS static Astro |
| Placeholder content looks generic/unprofessional | Low | Use realistic financial company content (not lorem ipsum); specific service names, credible testimonials, real-sounding stats |

## Rollback Plan

Since this is a greenfield build on an existing minimal scaffold:

- **Phase-level rollback**: Each phase produces independent, working increments. If a phase introduces issues, revert only that phase's commits.
- **Full rollback**: `git revert` all commits from this change. The site returns to the minimal Astro scaffold.
- **Dependency rollback**: If preact/sitemap integrations cause issues, remove them from `astro.config.mjs` and `package.json`, then `npm install`. Calculator page degrades to static content.
- **No destructive migrations**: Nothing in this change modifies databases, APIs, or external services. All changes are frontend files only.

## Dependencies

- **@astrojs/preact** + **preact**: Required for the calculator island (Phase 4)
- **@astrojs/sitemap**: Required for SEO sitemap generation (Phase 1)
- **Inter font**: Loaded via Google Fonts CDN `<link>` in Layout (no npm package)
- **No backend dependency**: Contact form is client-side only for now

## Success Criteria

- [ ] All 5 pages render without errors in dev and production build
- [ ] Design tokens (`bg-primary-500`, `text-secondary-700`, etc.) work throughout the site
- [ ] Dark mode toggle/preference works on all pages and components
- [ ] Homepage Lighthouse score: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Loan calculator produces correct monthly payment for known test inputs
- [ ] All interactive elements are keyboard-navigable with visible focus rings
- [ ] Site is responsive and usable at 320px, 768px, 1024px, and 1440px
- [ ] No horizontal scroll at any breakpoint
- [ ] All images have appropriate alt text
- [ ] JSON-LD structured data validates in Google's Rich Results Test
- [ ] Sitemap generates at `/sitemap-index.xml` with all 5 pages
- [ ] Zero `console.log` statements in production code
- [ ] All text meets WCAG 2.1 AA contrast ratios (4.5:1 normal, 3:1 large)
