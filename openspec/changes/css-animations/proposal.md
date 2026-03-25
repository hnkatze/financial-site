# Proposal: CSS Animations for Premium Feel

## Intent

The financial site currently lacks motion design, making it feel static and generic. Adding purposeful CSS animations will create a premium, polished user experience that differentiates the brand and guides user attention to key conversion points (CTAs, features, testimonials). All animations must be CSS-only with no JS library dependencies, keeping the bundle lean.

## Scope

### In Scope

- 11 CSS animations covering: entrance effects, hover interactions, scroll-driven reveals, ambient motion, and continuous loops
- All `@keyframes`, `@property` declarations, and utility classes in `src/styles/global.css`
- `prefers-reduced-motion: reduce` fallback for every animation
- Performance-safe approach: `transform` + `opacity` only where possible
- Integration into existing Astro components via Tailwind utility classes

### Out of Scope

- JavaScript animation libraries (GSAP, Framer Motion, etc.)
- Page transition animations (View Transitions API)
- Lottie/SVG path animations
- Counter/number animations on Stats section
- Scroll-triggered class toggling via IntersectionObserver (JS)

## Approach

1. **Infrastructure** -- Define all `@keyframes`, `@property` rules, and utility classes in `src/styles/global.css` using Tailwind v4's `@layer components` for custom multi-step animations
2. **Scroll-driven animations** -- Use `animation-timeline: view()` (already proven in the codebase) for entrance effects (staggered fade-in, slide-from-sides, timeline line drawing)
3. **CSS custom properties** -- Use `@property` for animatable gradient stops (hue shift) and line-drawing progress (`--line-height`)
4. **Component integration** -- Add animation utility classes to existing component templates; no structural HTML changes required
5. **Marquee** -- Pure CSS infinite scroll using `@keyframes` translate on a duplicated logo strip
6. **Header transition** -- Minimal `<script>` for scroll listener toggling a `.scrolled` class; all visual transitions handled in CSS

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/styles/global.css` | Modified | Add ~11 `@keyframes`, `@property` rules, utility classes, reduced-motion overrides |
| `src/components/home/Hero.astro` | Modified | Gradient hue shift on background, text shimmer on heading |
| `src/components/home/Features.astro` | Modified | Staggered fade-in on feature cards |
| `src/components/home/ServicesPreview.astro` | Modified | Staggered fade-in on service cards |
| `src/components/home/Testimonials.astro` | Modified | Staggered fade-in on testimonial cards |
| `src/components/home/Partners.astro` | Modified | Infinite marquee on logo strip |
| `src/components/home/CTA.astro` | Modified | Gradient hue shift, pulse glow on button |
| `src/components/Header.astro` | Modified | Scroll-based transparent-to-glassmorphism transition |
| `src/components/about/Timeline.astro` | Modified | Line drawing, alternating slide-in, dot pulse |
| `src/components/ui/Card.astro` | Modified | Hover lift + shadow deepening |
| `src/components/ui/Button.astro` | Modified | Shimmer effect, pulse glow variant |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `animation-timeline: view()` browser support (no Firefox) | Medium | Animations are progressive enhancement; content remains fully visible without them |
| `@property` browser support (no Firefox < 128) | Low | Fallback to static gradients; purely cosmetic loss |
| Marquee performance on low-end devices | Low | Use `will-change: transform`, keep animation on composited layer |
| Excessive motion causing discomfort | Medium | Every animation gated behind `prefers-reduced-motion` check |
| Header scroll listener memory leak | Low | Single passive listener with cleanup pattern |

## Rollback Plan

All animation code is additive (new CSS rules + class additions on templates). To rollback:

1. Revert `src/styles/global.css` to remove all new `@keyframes`, `@property`, and animation utility classes
2. Remove animation-related classes from the 11 affected component templates
3. No database, API, or structural changes to undo

A single `git revert` of the implementation commit(s) fully restores the previous state.

## Dependencies

- None. All techniques use native CSS features already supported by the project's target browsers.

## Success Criteria

- [ ] All 11 animations render correctly on Chrome/Edge (latest)
- [ ] Graceful degradation on Firefox (content visible, animations may be absent)
- [ ] Every animation is disabled or reduced when `prefers-reduced-motion: reduce` is active
- [ ] No layout shift (CLS = 0) caused by any animation
- [ ] Lighthouse Performance score remains >= 90 on mobile
- [ ] No JavaScript animation libraries added to `package.json`
- [ ] All animations use `transform`/`opacity` where possible (composite-only)
