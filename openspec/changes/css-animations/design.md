# Design: CSS Animations for Premium Feel

## Technical Approach

All 11 animations are implemented as pure CSS in `src/styles/global.css`, following the existing pattern: `@keyframes` definition + `.animate-*` utility class + `prefers-reduced-motion` override. Components gain animations by adding utility classes to their templates — no structural HTML changes except Partners (needs duplicated children for marquee) and Header (needs a small `<script>` for scroll class toggle). The codebase already uses `animation-timeline: view()` and `.animate-fade-in-up`, so we extend that proven pattern.

## Architecture Decisions

### Decision: CSS `animation-timeline: view()` over IntersectionObserver

**Choice**: Use CSS scroll-driven animations via `animation-timeline: view()` for all entrance effects.
**Alternatives considered**: JavaScript IntersectionObserver to toggle `.visible` classes.
**Rationale**: The codebase already uses `animation-timeline: view()` on `.animate-fade-in-up` (global.css line 192). Staying CSS-only means zero JS bundle cost, no hydration needed in Astro, and the pattern is already proven in this project. Unsupported browsers (Firefox < 131) simply see static content — progressive enhancement by default.

### Decision: `@property` for gradient hue animation

**Choice**: Register `--hue-offset` via `@property` so the browser can interpolate it in `@keyframes`.
**Alternatives considered**: Animating `background-position` on a wide gradient (classic shimmer trick); using JS `requestAnimationFrame` to update a CSS variable.
**Rationale**: `@property` lets the browser natively tween a custom property used inside `oklch()` hue calculations, producing a smooth color shift on the GPU. The `background-position` hack requires an oversized gradient image and doesn't produce true hue rotation. JS animation defeats the CSS-only goal.

### Decision: CSS-only marquee over JS-based carousel

**Choice**: Pure CSS `@keyframes marquee` with `translateX(-50%)` on a doubled content strip.
**Alternatives considered**: Embla Carousel, Swiper, or custom IntersectionObserver-based scroll.
**Rationale**: The partners section is a simple logo strip with no user interaction (no pause-on-hover requirement beyond CSS `:hover`). A CSS marquee is zero-JS, works without hydration, and performs on the compositor thread. The tradeoff is needing duplicated HTML children, which is trivial in the Astro template with a second `.map()`.

### Decision: Minimal `<script>` for Header scroll detection

**Choice**: A single passive scroll listener that toggles `.header-scrolled` on the `<header>` element.
**Alternatives considered**: Pure CSS `animation-timeline: scroll()` on header; `:has()` selector with scroll snap.
**Rationale**: CSS scroll-driven animations can't toggle discrete states (transparent vs. glass). A tiny inline `<script>` (< 10 lines) with a passive listener is the lightest JS possible. The visual transition itself (opacity, blur, border, shadow) is all CSS via the `.header-scrolled` class.

### Decision: Progressive enhancement strategy

**Choice**: All animations are additive. Content is fully visible and usable without any animation support.
**Alternatives considered**: Polyfills for `animation-timeline` and `@property`.
**Rationale**: Polyfills add JS weight and complexity for purely cosmetic features. The site's content, layout, and interactivity work identically without animations. Users on unsupported browsers get a clean, static experience — which is the current state of the site anyway.

## CSS Architecture

### Addition order in `global.css`

All new code goes after the existing utility classes (after line 212), organized as:

```
/* existing code above... */

/* ── @property registrations ── */
/* ── New @keyframes ── */
/* ── New utility classes + reduced-motion overrides ── */
/* ── Header scroll transition ── */
```

### @property Declarations

```css
/* Required for animating hue inside oklch() gradients */
@property --hue-offset {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

/* Required for animating the timeline vertical line height */
@property --line-progress {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}
```

### Reduced-motion strategy

Every `.animate-*` class has a matching `@media (prefers-reduced-motion: reduce)` block immediately after it (same pattern as the existing `.animate-fade-in-up`). The override sets `animation: none` and restores static visual state (opacity: 1, transform: none, etc.).

---

## Animation Specifications (11 Animations)

### 1. Staggered Fade-In-Up (scroll-driven) — already exists, add stagger

The existing `.animate-fade-in-up` works per-element. Stagger is achieved by adding `animation-delay` via inline `style` attributes in the template loop. No new keyframes needed.

**Utility classes**:
```css
/* Stagger delay utilities (used via style="animation-delay: ...") */
/* No CSS class needed — stagger is per-item via style attr in Astro template */
/* Example: style="animation-delay: 0.1s" on 2nd card, 0.2s on 3rd, etc. */
```

**Component usage**: Features, ServicesPreview, Testimonials — add `style={`animation-delay: ${index * 0.1}s`}` to each `<li>`.

**Note**: `animation-timeline: view()` ignores `animation-delay` in some browsers. As fallback, use `animation-range` offsets per item. If stagger doesn't work with view timeline, it degrades gracefully to simultaneous entrance (current behavior). An alternative is distinct `animation-range` values per child using `:nth-child()`:

```css
.stagger-fade-in-up > :nth-child(1) { animation-range: entry 0% entry 30%; }
.stagger-fade-in-up > :nth-child(2) { animation-range: entry 5% entry 35%; }
.stagger-fade-in-up > :nth-child(3) { animation-range: entry 10% entry 40%; }
.stagger-fade-in-up > :nth-child(4) { animation-range: entry 15% entry 45%; }
```

**Reduced-motion**: Inherits existing `.animate-fade-in-up` override — no extra work.

---

### 2. Slide-In from Left (scroll-driven)

```css
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-3rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

@media (prefers-reduced-motion: reduce) {
  .animate-slide-in-left {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**Used by**: Timeline.astro — even-indexed items (left side on desktop).

---

### 3. Slide-In from Right (scroll-driven)

```css
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(3rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.6s ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

@media (prefers-reduced-motion: reduce) {
  .animate-slide-in-right {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**Used by**: Timeline.astro — odd-indexed items (right side on desktop). On mobile (single column), all items use `animate-fade-in-up` instead — controlled via responsive classes: `animate-fade-in-up lg:animate-slide-in-left` / `lg:animate-slide-in-right`.

---

### 4. Gradient Hue Shift (continuous)

```css
@keyframes hue-shift {
  0% { --hue-offset: 0; }
  50% { --hue-offset: 30; }
  100% { --hue-offset: 0; }
}

.animate-hue-shift {
  animation: hue-shift 8s ease-in-out infinite;
  background: linear-gradient(
    135deg,
    oklch(0.53 0.15 calc(175 + var(--hue-offset))),
    oklch(0.45 0.13 calc(175 + var(--hue-offset) * 0.5)),
    oklch(0.30 0.10 calc(260 + var(--hue-offset) * 0.3))
  );
}

@media (prefers-reduced-motion: reduce) {
  .animate-hue-shift {
    animation: none;
    /* Falls back to static gradient — the initial-value of --hue-offset: 0 applies */
  }
}
```

**Timing**: 8s cycle, `ease-in-out`, infinite. Subtle 30-degree hue rotation.
**Used by**: Hero.astro — replaces the `bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-900` on the `<section>`.
**Also used by**: CTA.astro — replaces `bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800`.

---

### 5. Text Shimmer (continuous)

```css
@keyframes text-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.animate-text-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-primary-200) 0%,
    var(--color-accent-300) 25%,
    var(--color-primary-200) 50%,
    var(--color-accent-300) 75%,
    var(--color-primary-200) 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-shimmer 6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-text-shimmer {
    animation: none;
    background: none;
    -webkit-text-fill-color: unset;
    color: var(--color-primary-200);
  }
}
```

**Timing**: 6s linear infinite. Sweeps a highlight across the text.
**Used by**: Hero.astro — applied to the `<span class="text-primary-200">comienza aqui</span>` inside the `<h1>`.

---

### 6. Card Hover Lift + Shadow (interaction)

```css
.animate-card-hover {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease;
}

.animate-card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px -8px oklch(0.00 0 0 / 0.12),
              0 4px 8px oklch(0.00 0 0 / 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .animate-card-hover {
    transition: none;
  }
  .animate-card-hover:hover {
    transform: none;
    /* Keep shadow change — it's not motion */
  }
}
```

**Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` gives a subtle overshoot for premium feel.
**Used by**: Card.astro `elevated` variant — add `animate-card-hover` to the class list. Replaces the current `hover:shadow-xl transition-shadow duration-300` on `elevated`.

---

### 7. Button Shimmer (continuous, subtle)

```css
@keyframes btn-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.animate-btn-shimmer {
  position: relative;
  overflow: hidden;
}

.animate-btn-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    oklch(1 0 0 / 0.12) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: btn-shimmer 3s ease-in-out infinite;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .animate-btn-shimmer::after {
    animation: none;
    background: none;
  }
}
```

**Timing**: 3s ease-in-out infinite. A subtle light sweep across the button surface.
**Used by**: Button.astro `primary` variant; Hero CTA buttons; CTA section buttons. Applied via an additional class on the element.

---

### 8. Pulse Glow (continuous, subtle)

```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 oklch(0.62 0.17 175 / 0.4);
  }
  50% {
    box-shadow: 0 0 20px 4px oklch(0.62 0.17 175 / 0.15);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-pulse-glow {
    animation: none;
  }
}
```

**Timing**: 3s ease-in-out infinite. Gentle glow that breathes.
**Used by**: CTA section primary button — stacked with `animate-btn-shimmer`. Also available for Hero CTA if desired.

**Note**: `box-shadow` is not GPU-composited. Acceptable here because it's on a single button element, not repeated in a list. The glow color uses the primary-500 oklch value.

---

### 9. Infinite Marquee (continuous)

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
    flex-wrap: wrap;
    width: auto;
    justify-content: center;
  }
}
```

**Timing**: 30s linear infinite. Speed gives a relaxed, non-distracting scroll.
**Used by**: Partners.astro — requires structural HTML change (see Component Modifications below).
**GPU note**: `will-change: transform` added to `.animate-marquee` to promote to compositor layer.

Updated utility:
```css
.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
  will-change: transform;
}
```

---

### 10. Timeline Line Drawing (scroll-driven)

```css
@keyframes draw-line {
  from { --line-progress: 0%; }
  to { --line-progress: 100%; }
}

.animate-draw-line {
  background: linear-gradient(
    to bottom,
    var(--color-primary-500) var(--line-progress),
    var(--color-primary-200) var(--line-progress)
  );
  animation: draw-line 1s linear both;
  animation-timeline: view();
  animation-range: contain 0% contain 100%;
}

@media (prefers-reduced-motion: reduce) {
  .animate-draw-line {
    animation: none;
    background: var(--color-primary-500);
  }
}
```

**Used by**: Timeline.astro — applied to the vertical line `<div>` (replaces `bg-primary-200`). The line "fills" from primary-200 to primary-500 as user scrolls through the timeline.

---

### 11. Timeline Dot Pulse (scroll-driven trigger)

```css
@keyframes dot-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 oklch(0.62 0.17 175 / 0.5);
  }
  50% {
    transform: scale(1.3);
    box-shadow: 0 0 0 8px oklch(0.62 0.17 175 / 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 oklch(0.62 0.17 175 / 0);
  }
}

.animate-dot-pulse {
  animation: dot-pulse 0.6s ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}

@media (prefers-reduced-motion: reduce) {
  .animate-dot-pulse {
    animation: none;
    transform: none;
  }
}
```

**Used by**: Timeline.astro — applied to each timeline dot `<div>`.

---

## Component Modifications

### `src/styles/global.css`

**Action**: Modify — append all `@property`, `@keyframes`, utility classes, and reduced-motion overrides after line 212.

---

### `src/components/home/Hero.astro`

**Action**: Modify

Current `<section>` class:
```
relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-900 py-24 sm:py-32 lg:py-40
```
New `<section>` class:
```
relative overflow-hidden animate-hue-shift py-24 sm:py-32 lg:py-40
```
The `animate-hue-shift` class sets the gradient via its own `background` property, replacing the Tailwind gradient utilities.

Current `<span>` (subtitle):
```html
<span class="text-primary-200">comienza aqui</span>
```
New:
```html
<span class="animate-text-shimmer">comienza aqui</span>
```

**No structural HTML changes.**

---

### `src/components/home/Features.astro`

**Action**: Modify

Current `<li>`:
```html
<li class="animate-fade-in-up">
```
New (add stagger class to parent `<ul>`):
```html
<ul class="stagger-fade-in-up grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" role="list">
```
Each `<li>` keeps `animate-fade-in-up`. The `.stagger-fade-in-up` parent handles per-child `animation-range` offsets via `:nth-child()`.

---

### `src/components/home/ServicesPreview.astro`

**Action**: Modify — same stagger pattern as Features.

Add `stagger-fade-in-up` to parent `<ul>`.

---

### `src/components/home/Testimonials.astro`

**Action**: Modify — same stagger pattern as Features.

Add `stagger-fade-in-up` to parent `<ul>`.

---

### `src/components/home/Partners.astro`

**Action**: Modify — **structural HTML change required**.

Current structure:
```html
<ul class="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16" role="list">
  {partners.map(...)}
</ul>
```

New structure:
```html
<div class="overflow-hidden" role="marquee" aria-label="Nuestros socios institucionales">
  <div class="animate-marquee gap-8 md:gap-12 lg:gap-16">
    {/* First copy */}
    {partners.map((partner) => (
      <div class="flex-shrink-0 flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
        <div class="flex h-12 items-center justify-center rounded-lg px-5 text-sm font-bold text-neutral-600 select-none whitespace-nowrap" title={partner.name}>
          {partner.name}
        </div>
      </div>
    ))}
    {/* Duplicate copy for seamless loop */}
    {partners.map((partner) => (
      <div class="flex-shrink-0 flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100" aria-hidden="true">
        <div class="flex h-12 items-center justify-center rounded-lg px-5 text-sm font-bold text-neutral-600 select-none whitespace-nowrap" title={partner.name}>
          {partner.name}
        </div>
      </div>
    ))}
  </div>
</div>
```

The second copy is `aria-hidden="true"` since it's a visual duplicate. The container has `overflow-hidden` to clip the scrolling strip. The `<ul>` changes to `<div>` since the marquee is decorative and semantic list markup is less appropriate for a continuous scroll.

---

### `src/components/home/CTA.astro`

**Action**: Modify

Current `<section>` class:
```
relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 py-20 lg:py-28
```
New:
```
relative overflow-hidden animate-hue-shift py-20 lg:py-28
```

Primary CTA button — add `animate-btn-shimmer animate-pulse-glow`:
```html
<Button href="/contact" size="lg" class="bg-white! text-primary-700! hover:bg-neutral-100! shadow-lg animate-btn-shimmer animate-pulse-glow">
```

---

### `src/components/Header.astro`

**Action**: Modify

Current `<header>` class:
```
fixed top-0 left-0 right-0 z-50 bg-surface-glass backdrop-blur-xl border-b border-neutral-200/50
```
New `<header>` class:
```
fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 bg-transparent border-transparent
```

New CSS in global.css:
```css
.header-scrolled {
  background-color: var(--color-surface-glass);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-color: oklch(0.91 0.008 260 / 0.5); /* neutral-200/50 */
  box-shadow: 0 1px 3px oklch(0 0 0 / 0.05);
}
```

Add inline `<script>` at end of Header.astro:
```html
<script>
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('header-scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
</script>
```

**Reduced-motion**: No override needed — `transition-all duration-300` is a simple transition, not a looping animation. The `prefers-reduced-motion` user agent stylesheet handles transitions. However, for completeness:

```css
@media (prefers-reduced-motion: reduce) {
  header {
    transition-duration: 0.01ms;
  }
}
```

---

### `src/components/ui/Card.astro`

**Action**: Modify

Current `elevated` variant:
```
bg-white border border-neutral-200 shadow-lg hover:shadow-xl transition-shadow duration-300
```
New `elevated` variant:
```
bg-white border border-neutral-200 shadow-lg animate-card-hover
```

The `animate-card-hover` class handles both the hover shadow and the lift transform, replacing `hover:shadow-xl transition-shadow duration-300`.

---

### `src/components/ui/Button.astro`

**Action**: Modify

No changes to the base component file. The `animate-btn-shimmer` and `animate-pulse-glow` classes are applied contextually by parent components (Hero, CTA) via the `class` prop, not baked into Button.astro itself. This keeps Button.astro generic — not every button should shimmer.

---

### `src/components/about/Timeline.astro`

**Action**: Modify

**Vertical line** — current:
```html
<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-200 lg:left-1/2 lg:-translate-x-px" aria-hidden="true"></div>
```
New:
```html
<div class="absolute left-4 top-0 bottom-0 w-0.5 animate-draw-line lg:left-1/2 lg:-translate-x-px" aria-hidden="true"></div>
```
Removes `bg-primary-200` (the draw-line animation sets background).

**Timeline items** — current:
```html
<li class:list={['animate-fade-in-up relative pl-12 lg:pl-0', ...]}>
```
New (desktop uses directional slide, mobile keeps fade-in-up):
```html
<li class:list={[
  'animate-fade-in-up relative pl-12 lg:pl-0',
  index % 2 === 0 ? 'lg:animate-slide-in-left' : 'lg:animate-slide-in-right',
]}>
```

**Note on responsive animation override**: The `lg:animate-slide-in-*` classes need to be defined so that at `lg` breakpoint, the animation overrides the base `animate-fade-in-up`. This is handled via Tailwind v4 responsive prefix:

```css
@media (min-width: 1024px) {
  .lg\:animate-slide-in-left {
    animation: slide-in-left 0.6s ease-out both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }
  .lg\:animate-slide-in-right {
    animation: slide-in-right 0.6s ease-out both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }
}
```

**Timeline dots** — current:
```html
<div class:list={['absolute left-2.5 top-1 size-3 rounded-full border-2 border-primary-500 bg-white ...']}>
```
New — add `animate-dot-pulse`:
```html
<div class:list={['absolute left-2.5 top-1 size-3 rounded-full border-2 border-primary-500 bg-white animate-dot-pulse ...']}>
```

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/styles/global.css` | Modify | Add 2 `@property`, 9 `@keyframes`, ~12 utility classes, reduced-motion overrides, `.header-scrolled`, `.stagger-fade-in-up` |
| `src/components/home/Hero.astro` | Modify | Replace gradient classes with `animate-hue-shift`; add `animate-text-shimmer` to subtitle span |
| `src/components/home/Features.astro` | Modify | Add `stagger-fade-in-up` to parent `<ul>` |
| `src/components/home/ServicesPreview.astro` | Modify | Add `stagger-fade-in-up` to parent `<ul>` |
| `src/components/home/Testimonials.astro` | Modify | Add `stagger-fade-in-up` to parent `<ul>` |
| `src/components/home/Partners.astro` | Modify | Restructure to marquee layout with duplicated children, `animate-marquee` |
| `src/components/home/CTA.astro` | Modify | Replace gradient classes with `animate-hue-shift`; add shimmer/glow to CTA button |
| `src/components/Header.astro` | Modify | Change to transparent default + `.header-scrolled` CSS class; add inline `<script>` |
| `src/components/about/Timeline.astro` | Modify | Add `animate-draw-line` to line, `lg:animate-slide-in-*` to items, `animate-dot-pulse` to dots |
| `src/components/ui/Card.astro` | Modify | Replace `elevated` hover styles with `animate-card-hover` |
| `src/components/ui/Button.astro` | No change | Shimmer/glow applied via `class` prop from parent components |

## Performance Considerations

### Animated Properties

| Animation | Properties Animated | GPU Composited? |
|-----------|-------------------|-----------------|
| fade-in-up | `opacity`, `transform` | Yes |
| slide-in-left/right | `opacity`, `transform` | Yes |
| hue-shift | `--hue-offset` (custom property) | Partial (paint, not layout) |
| text-shimmer | `background-position` | Partial (paint) |
| card-hover | `transform`, `box-shadow` | Transform: yes, shadow: paint |
| btn-shimmer | `background-position` (pseudo) | Partial (paint) |
| pulse-glow | `box-shadow` | No (paint) — single element, acceptable |
| marquee | `transform` | Yes |
| draw-line | `--line-progress` (custom property) | Partial (paint) |
| dot-pulse | `transform`, `box-shadow` | Transform: yes, shadow: paint |
| header scroll | `background-color`, `backdrop-filter`, `border-color`, `box-shadow` | No (discrete transition, not continuous) |

### `will-change` Usage

Only apply `will-change` to continuously running animations to avoid unnecessary memory allocation:

```css
.animate-marquee { will-change: transform; }
.animate-hue-shift { will-change: --hue-offset; }
```

Do NOT add `will-change` to scroll-driven or hover animations — they are intermittent and the browser handles promotion automatically on interaction.

### Bundle Impact

- **CSS added**: ~180 lines (keyframes + utilities + reduced-motion)
- **JS added**: ~8 lines (header scroll listener, inline `<script>`)
- **No new dependencies**
- **No hydration cost** (Astro ships zero JS for these components unless the header script)

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | All 11 animations render correctly | Manual browser testing: Chrome, Edge, Safari |
| Visual | Reduced-motion disables all animations | Toggle `prefers-reduced-motion` in DevTools |
| Visual | Firefox graceful degradation | Test that content is visible, scroll-driven animations are absent |
| Performance | No layout shift from animations | Lighthouse CLS check (target: 0) |
| Performance | Marquee runs at 60fps | Chrome DevTools Performance panel |
| Accessibility | Content readable without animations | Screen reader pass-through |
| Accessibility | No seizure-inducing flash rates | All animations > 3 cycles/second: only marquee is continuous, and it's slow (30s cycle) |

## Migration / Rollout

No migration required. All changes are additive CSS + class attribute changes. A single `git revert` fully undoes everything.

## Open Questions

- [ ] Should the marquee pause on hover? (Currently designed to pause via `animation-play-state: paused` on `:hover` — confirm this is desired)
- [ ] Should Hero and CTA share the exact same `animate-hue-shift` gradient, or should CTA have a slightly different color range?
- [ ] The `stagger-fade-in-up` approach with `:nth-child` animation-range offsets may not produce visible stagger with `animation-timeline: view()` if all children enter the viewport simultaneously (e.g., on large screens). Should we accept simultaneous fade-in on wide viewports as acceptable?
