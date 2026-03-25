# Tasks: CSS Animations for Premium Feel

## Phase 1: CSS Infrastructure (`src/styles/global.css`)

- [x] **1.1** Add `@property` declarations for `--hue-offset` (syntax: `<number>`, initial: 0) and `--line-progress` (syntax: `<percentage>`, initial: 0%)
  - **File**: `src/styles/global.css`
  - **Dependencies**: None
  - **Acceptance**: `@property` rules are valid CSS; no parse errors; fallback values apply when `@property` is unsupported (Spec: Global — `@property` browser support scenario)
  - **Complexity**: S

- [x] **1.2** Add `@keyframes` for scroll-driven entrance animations: `slide-in-left` and `slide-in-right`
  - **File**: `src/styles/global.css`
  - **Dependencies**: None
  - **Acceptance**: `slide-in-left` animates from `opacity:0; translateX(-3rem)` to `opacity:1; translateX(0)`; `slide-in-right` mirrors with `translateX(3rem)` (Spec 2: Slide-From-Sides)
  - **Complexity**: S

- [x] **1.3** Add `@keyframes` for continuous ambient animations: `hue-shift` (8s cycle), `text-shimmer` (6s cycle), `btn-shimmer` (3s cycle), `pulse-glow` (3s cycle)
  - **File**: `src/styles/global.css`
  - **Dependencies**: 1.1 (`hue-shift` uses `--hue-offset`)
  - **Acceptance**: Each keyframe matches the timing and property values defined in design.md sections 4, 5, 7, 8 (Specs 5, 6, 4, 7)
  - **Complexity**: M

- [x] **1.4** Add `@keyframes` for timeline and marquee: `draw-line`, `dot-pulse`, `marquee`
  - **File**: `src/styles/global.css`
  - **Dependencies**: 1.1 (`draw-line` uses `--line-progress`)
  - **Acceptance**: `draw-line` animates `--line-progress` 0% to 100%; `dot-pulse` scales 1 to 1.3 with expanding box-shadow; `marquee` translates from 0 to -50% (Specs 9, 10, 11)
  - **Complexity**: S

- [x] **1.5** Add utility classes: `.animate-slide-in-left`, `.animate-slide-in-right`, `.animate-hue-shift`, `.animate-text-shimmer`, `.animate-btn-shimmer`, `.animate-pulse-glow`, `.animate-marquee`, `.animate-draw-line`, `.animate-dot-pulse`
  - **File**: `src/styles/global.css`
  - **Dependencies**: 1.2, 1.3, 1.4 (keyframes must exist)
  - **Acceptance**: Each utility class applies its animation with correct timing, easing, and `animation-timeline` where applicable (scroll-driven vs continuous); `.animate-marquee` includes `will-change: transform` and `hover` pause; `.animate-hue-shift` includes `will-change: --hue-offset` and gradient `background` property
  - **Complexity**: M

- [x] **1.6** Add `.stagger-fade-in-up` class with `:nth-child()` `animation-range` offsets for staggered entrance
  - **File**: `src/styles/global.css`
  - **Dependencies**: None (reuses existing `animate-fade-in-up` keyframes)
  - **Acceptance**: Children 1-4+ have incrementally offset `animation-range` values (entry 0%/30%, entry 5%/35%, etc.) producing visible stagger (Spec 1: Staggered Fade-In)
  - **Complexity**: S

- [x] **1.7** Add `.animate-card-hover` utility with hover transform + shadow transition
  - **File**: `src/styles/global.css`
  - **Dependencies**: None
  - **Acceptance**: Card lifts `-4px` on hover with deepened shadow; uses `cubic-bezier(0.34, 1.56, 0.64, 1)` easing; touch devices don't get stuck in lifted state (Spec 3: Card Hover Lift)
  - **Complexity**: S

- [x] **1.8** Add responsive `lg:animate-slide-in-left` and `lg:animate-slide-in-right` inside `@media (min-width: 1024px)` block
  - **File**: `src/styles/global.css`
  - **Dependencies**: 1.2 (keyframes)
  - **Acceptance**: At `lg` breakpoint, slide animations override base `animate-fade-in-up` on timeline items (Design: Timeline section)
  - **Complexity**: S

- [x] **1.9** Add `.header-scrolled` class with glassmorphism styles (backdrop-blur, semi-transparent bg, border, shadow)
  - **File**: `src/styles/global.css`
  - **Dependencies**: None
  - **Acceptance**: When `.header-scrolled` is applied, header shows glassmorphism; without it, header is transparent (Spec 8: Header Scroll Transition)
  - **Complexity**: S

- [x] **1.10** Add `prefers-reduced-motion: reduce` overrides for ALL new animation utilities
  - **File**: `src/styles/global.css`
  - **Dependencies**: 1.5, 1.6, 1.7, 1.8, 1.9 (all utilities must exist)
  - **Acceptance**: Every `.animate-*` class has a `@media (prefers-reduced-motion: reduce)` block that sets `animation: none` and restores static state (opacity: 1, transform: none); header transition duration set to ~0ms; marquee shows static flex-wrap layout (Spec: Global — Reduced Motion Compliance)
  - **Complexity**: M

## Phase 2: Scroll Entrance Animations (Components)

- [x] **2.1** Apply staggered fade-in to `Features.astro` — add `stagger-fade-in-up` class to parent `<ul>`
  - **File**: `src/components/home/Features.astro`
  - **Dependencies**: 1.6
  - **Acceptance**: Feature cards fade in with stagger on scroll; cards already in viewport on load still animate; reduced motion shows instant appearance (Spec 1: scenarios 1-3)
  - **Complexity**: S

- [x] **2.2** Apply staggered fade-in to `ServicesPreview.astro` — add `stagger-fade-in-up` class to parent `<ul>`
  - **File**: `src/components/home/ServicesPreview.astro`
  - **Dependencies**: 1.6
  - **Acceptance**: Same stagger behavior as Features (Spec 1)
  - **Complexity**: S

- [x] **2.3** Apply staggered fade-in to `Testimonials.astro` — add `stagger-fade-in-up` class to parent `<ul>`
  - **File**: `src/components/home/Testimonials.astro`
  - **Dependencies**: 1.6
  - **Acceptance**: Same stagger behavior as Features (Spec 1)
  - **Complexity**: S

- [x] **2.4** Apply slide-from-sides to `Timeline.astro` cards — add responsive `lg:animate-slide-in-left` / `lg:animate-slide-in-right` based on index parity; keep `animate-fade-in-up` for mobile
  - **File**: `src/components/about/Timeline.astro`
  - **Dependencies**: 1.8
  - **Acceptance**: Even-indexed cards slide from left, odd from right at `lg`; mobile shows fade-in-up; reduced motion shows instant positioning (Spec 2, Spec 10)
  - **Complexity**: M

## Phase 3: Micro-Interactions (Components)

- [x] **3.1** Add hover lift to `Card.astro` — replace `elevated` variant's `hover:shadow-xl transition-shadow duration-300` with `animate-card-hover`
  - **File**: `src/components/ui/Card.astro`
  - **Dependencies**: 1.7
  - **Acceptance**: Cards lift -4px on hover with deepened shadow; smooth transition; reduced motion removes translate but keeps shadow (Spec 3: scenarios 1-4)
  - **Complexity**: S

- [x] **3.2** Add shimmer + pulse glow to Hero.astro CTA buttons — add `animate-btn-shimmer animate-pulse-glow` classes to primary CTA `<Button>`
  - **File**: `src/components/home/Hero.astro`
  - **Dependencies**: 1.5
  - **Acceptance**: Light streak sweeps across button surface on 3s loop; glow ring pulses on 3s loop; reduced motion disables both (Specs 4, 7)
  - **Complexity**: S

- [x] **3.3** Add shimmer + pulse glow to CTA.astro primary button — add `animate-btn-shimmer animate-pulse-glow` classes
  - **File**: `src/components/home/CTA.astro`
  - **Dependencies**: 1.5
  - **Acceptance**: Same shimmer/glow behavior as Hero CTA (Specs 4, 7)
  - **Complexity**: S

## Phase 4: Ambient & Typography (Components)

- [x] **4.1** Add gradient hue shift to Hero.astro — replace `bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-900` with `animate-hue-shift`
  - **File**: `src/components/home/Hero.astro`
  - **Dependencies**: 1.5
  - **Acceptance**: Background gradient continuously shifts hue over 8s cycle; static gradient on reduced motion; static gradient on browsers without `@property` support (Spec 5: all scenarios)
  - **Complexity**: S

- [x] **4.2** Add gradient hue shift to CTA.astro — replace `bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800` with `animate-hue-shift`
  - **File**: `src/components/home/CTA.astro`
  - **Dependencies**: 1.5
  - **Acceptance**: Same hue shift behavior as Hero (Spec 5)
  - **Complexity**: S

- [x] **4.3** Add text shimmer to Hero.astro heading — replace `text-primary-200` on subtitle `<span>` with `animate-text-shimmer`
  - **File**: `src/components/home/Hero.astro`
  - **Dependencies**: 1.5
  - **Acceptance**: Gradient shine sweeps across text via `background-clip: text` on 6s loop; reduced motion shows static colored text; text remains legible (Spec 6: all scenarios)
  - **Complexity**: S

- [x] **4.4** Add header scroll transition to Header.astro — change default classes to transparent state; add inline `<script>` that toggles `.header-scrolled` class on scroll past 20px threshold
  - **File**: `src/components/Header.astro`
  - **Dependencies**: 1.9
  - **Acceptance**: Header is transparent at top; transitions to glassmorphism on scroll past 20px; transitions back when scrolling to top; smooth CSS transition; reduced motion makes transition instantaneous; scroll listener is passive (Spec 8: all scenarios)
  - **Complexity**: M

## Phase 5: Timeline & Marquee (Components)

- [x] **5.1** Add line drawing animation to Timeline.astro — replace `bg-primary-200` on vertical line `<div>` with `animate-draw-line`
  - **File**: `src/components/about/Timeline.astro`
  - **Dependencies**: 1.5
  - **Acceptance**: Line progressively fills from primary-200 to primary-500 as user scrolls; retracts on scroll-up; full line visible on reduced motion; full line visible on unsupported browsers (Spec 9: all scenarios)
  - **Complexity**: S

- [x] **5.2** Add dot pulse to Timeline.astro dots — add `animate-dot-pulse` class to each timeline dot `<div>`
  - **File**: `src/components/about/Timeline.astro`
  - **Dependencies**: 1.5
  - **Acceptance**: Dots scale up and emit glow ring when entering viewport via scroll; reduced motion shows static dots (Design: animation 11)
  - **Complexity**: S

- [x] **5.3** Convert Partners.astro to infinite marquee — restructure HTML to `overflow-hidden` container with `animate-marquee` wrapper containing duplicated partner elements; second copy has `aria-hidden="true"`
  - **File**: `src/components/home/Partners.astro`
  - **Dependencies**: 1.5
  - **Acceptance**: Logos scroll horizontally at constant speed (30s cycle); seamless loop with no visible gap; pauses on hover; reduced motion shows static wrapped layout with all logos visible; no content clipped (Spec 11: all scenarios)
  - **Complexity**: M

## Phase 6: Verification & Polish

- [ ] **6.1** Visual verification on Chrome/Edge — confirm all 11 animations render correctly with expected timing and easing
  - **Files**: All modified files
  - **Dependencies**: All previous phases
  - **Acceptance**: All animations match their spec scenarios on latest Chrome and Edge (Proposal: Success Criteria 1)
  - **Complexity**: M

- [ ] **6.2** Reduced motion verification — toggle `prefers-reduced-motion: reduce` in DevTools and confirm every animation is disabled/reduced
  - **Files**: `src/styles/global.css` (review overrides)
  - **Dependencies**: All previous phases
  - **Acceptance**: No continuous, repeating, or prolonged motion with reduced motion enabled (Spec: Global — Reduced Motion Compliance)
  - **Complexity**: S

- [ ] **6.3** Firefox graceful degradation — verify content is fully visible and usable; scroll-driven animations absent but no breakage
  - **Files**: All modified files
  - **Dependencies**: All previous phases
  - **Acceptance**: No visual breakage; content 100% accessible; static gradients display correctly (Proposal: Success Criteria 2)
  - **Complexity**: S

- [ ] **6.4** Performance check — run Lighthouse on mobile, verify Performance score >= 90 and CLS = 0
  - **Files**: All modified files
  - **Dependencies**: All previous phases
  - **Acceptance**: Lighthouse Performance >= 90; CLS = 0; marquee runs at 60fps in Chrome Performance panel (Proposal: Success Criteria 5; Spec: Global — Performance Safety)
  - **Complexity**: S

- [ ] **6.5** Confirm zero new JS dependencies — verify no animation libraries added to `package.json`
  - **Files**: `package.json`
  - **Dependencies**: All previous phases
  - **Acceptance**: No new entries in `dependencies` or `devDependencies` related to animations (Proposal: Success Criteria 6)
  - **Complexity**: S
