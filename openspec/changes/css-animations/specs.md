# CSS Animations Specification

## Purpose

Defines behavioral requirements for 11 CSS animations that add motion design to the financial site. Every animation is CSS-only, performance-safe, and gated behind `prefers-reduced-motion` checks.

## Global Requirements

### Requirement: Reduced Motion Compliance

The system MUST disable or reduce every animation when the user's operating system has `prefers-reduced-motion: reduce` enabled.

#### Scenario: User enables reduced motion system-wide

- GIVEN a user whose OS reports `prefers-reduced-motion: reduce`
- WHEN any page containing animations loads
- THEN all animations MUST be either fully disabled or reduced to a single, instantaneous state change
- AND no element SHALL exhibit continuous, repeating, or prolonged motion

### Requirement: Performance Safety

All animations SHOULD use only compositor-friendly properties (`transform`, `opacity`) where possible. Animations MUST NOT cause measurable Cumulative Layout Shift (CLS > 0).

### Requirement: Progressive Enhancement

Animations MUST be additive. Content SHALL be fully visible and usable when animations are unsupported or disabled.

---

## 1. Staggered Fade-In

### Requirement: Grid Children Entrance

Grid children (feature cards, service cards, testimonial cards) MUST fade in with an upward translate as they enter the viewport, each child delayed incrementally to produce a stagger effect.

#### Scenario: Cards enter viewport on scroll

- GIVEN a grid section (Features, Services, or Testimonials) is below the viewport
- WHEN the user scrolls and cards enter the visible area
- THEN each card MUST animate from `opacity: 0; translate(0, 1rem)` to `opacity: 1; translate(0, 0)`
- AND each successive child MUST start its animation after an incremental delay relative to the previous child

#### Scenario: Cards already in viewport on page load

- GIVEN a grid section is within the initial viewport on page load
- WHEN the page finishes loading
- THEN the stagger animation MUST still play (not skipped)

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN grid cards enter the viewport
- THEN cards MUST appear immediately at full opacity with no translate or delay

---

## 2. Slide-From-Sides

### Requirement: Horizontal Entrance

Elements MUST slide in from the left or right side as they scroll into view.

#### Scenario: Element slides in from assigned side

- GIVEN an element is configured to slide from the left (or right)
- WHEN the element enters the viewport via scroll
- THEN it MUST animate from `opacity: 0; translateX(-2rem)` (left) or `translateX(2rem)` (right) to `opacity: 1; translateX(0)`

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN a slide-from-sides element enters the viewport
- THEN the element MUST appear immediately at final position with no slide or fade

---

## 3. Card Hover Lift

### Requirement: Hover Elevation

Cards MUST lift upward and deepen their shadow on hover to communicate interactivity.

#### Scenario: User hovers a card

- GIVEN a card component is in its default resting state
- WHEN the user hovers over the card
- THEN the card MUST translate upward (negative Y) and its shadow MUST increase in size/opacity
- AND the transition MUST be smooth (not instantaneous)

#### Scenario: User removes hover

- GIVEN a card is in its hovered (lifted) state
- WHEN the user moves the pointer away
- THEN the card MUST transition back to its resting position and default shadow

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the user hovers a card
- THEN the shadow change MAY still apply but the translate MUST be removed or instantaneous

#### Scenario: Touch device

- GIVEN the user is on a device without hover capability
- WHEN the user taps a card
- THEN the card SHOULD NOT remain stuck in a lifted state

---

## 4. Button Hover Shimmer

### Requirement: Shimmer Streak on Hover

Buttons MUST display a light streak that sweeps across the surface on hover.

#### Scenario: User hovers a button

- GIVEN a button with the shimmer variant
- WHEN the user hovers over it
- THEN a bright, semi-transparent gradient overlay MUST sweep horizontally across the button once

#### Scenario: User hovers repeatedly

- GIVEN the shimmer animation has completed
- WHEN the user leaves and re-enters the button
- THEN the shimmer MUST replay from the start

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the user hovers a shimmer button
- THEN no shimmer animation SHALL play
- AND the button MAY show a static hover state change (e.g., brightness shift)

---

## 5. Gradient Hue Shift

### Requirement: Ambient Background Breathing

The Hero and CTA sections MUST have a background gradient that continuously shifts hue, creating a slow ambient breathing effect.

#### Scenario: Section is visible

- GIVEN the Hero or CTA section is in the viewport
- WHEN the page is loaded
- THEN the background gradient MUST continuously animate between defined color stops
- AND the animation cycle SHOULD be slow (>= 6 seconds per cycle) to avoid distraction

#### Scenario: Section is not visible

- GIVEN the Hero section has scrolled out of view
- WHEN the animation is running
- THEN the animation SHOULD continue (CSS handles this natively) but MUST NOT cause jank on visible content

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the Hero or CTA section loads
- THEN the gradient MUST display as a static gradient with no hue animation

#### Scenario: Browser lacks @property support

- GIVEN the browser does not support `@property` (e.g., older Firefox)
- WHEN the section loads
- THEN the gradient MUST fall back to a static display with no visual breakage

---

## 6. Gradient Text Shimmer

### Requirement: Metallic Shine on Hero Text

The hero heading MUST display a shimmering gradient that sweeps across the text, creating a metallic shine effect.

#### Scenario: Hero heading is visible

- GIVEN the hero section is in the viewport
- WHEN the page loads
- THEN the heading text MUST display a moving gradient shine via `background-clip: text`
- AND the animation SHOULD loop continuously at a slow pace

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the hero heading is visible
- THEN the text MUST display a static gradient (no animation)
- AND text MUST remain fully legible

---

## 7. CTA Pulse Glow

### Requirement: Repeating Glow Ring

The primary CTA button MUST emit a repeating pulse glow to draw user attention.

#### Scenario: CTA button is visible

- GIVEN the CTA button is in the viewport
- WHEN the page is idle
- THEN a ring of color (box-shadow or pseudo-element) MUST expand outward from the button and fade, repeating on a loop

#### Scenario: Button is hovered

- GIVEN the CTA pulse glow is animating
- WHEN the user hovers the button
- THEN the pulse glow MAY continue or pause, but the shimmer/hover effect MUST take visual priority

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the CTA button is visible
- THEN the pulse glow animation MUST NOT play
- AND the button SHOULD retain a static glow or elevated shadow to maintain visual prominence

---

## 8. Header Scroll Transition

### Requirement: Transparent to Glassmorphism

The site header MUST transition from a transparent state to a glassmorphism (backdrop-blur + semi-transparent background) state based on scroll position.

#### Scenario: Page is at top

- GIVEN the page scroll position is at or near the top (0px)
- WHEN the header renders
- THEN the header MUST be transparent with no blur or background fill

#### Scenario: User scrolls down

- GIVEN the page is at the top and the header is transparent
- WHEN the user scrolls down past a defined threshold
- THEN the header MUST transition to a glassmorphism style (backdrop-blur, semi-transparent background, optional border/shadow)
- AND the transition MUST be smooth (CSS transition, not an instant swap)

#### Scenario: User scrolls back to top

- GIVEN the header is in its scrolled (glassmorphism) state
- WHEN the user scrolls back to the top
- THEN the header MUST transition back to fully transparent

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the user scrolls past the threshold
- THEN the header MUST still change to the glassmorphism style but the transition SHOULD be instantaneous (no animated transition)

---

## 9. Timeline Line Drawing

### Requirement: Line Draws on Scroll

The vertical timeline line MUST progressively draw (grow) as the user scrolls through the timeline section.

#### Scenario: Timeline enters viewport

- GIVEN the timeline section is below the viewport
- WHEN the user scrolls and the timeline enters the visible area
- THEN the vertical line MUST begin drawing (growing in height) synchronized with scroll progress

#### Scenario: User scrolls backward

- GIVEN the timeline line has partially drawn
- WHEN the user scrolls back up
- THEN the line MUST retract proportionally to the scroll position

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the timeline section is visible
- THEN the full timeline line MUST be visible immediately with no drawing animation

#### Scenario: Browser lacks scroll-driven animation support

- GIVEN the browser does not support `animation-timeline: view()`
- WHEN the timeline section loads
- THEN the full timeline line MUST be visible as a static element

---

## 10. Timeline Alternating Slide

### Requirement: Cards from Alternating Sides

Timeline event cards MUST slide in from alternating sides (left, right, left, right) as the user scrolls through the timeline.

#### Scenario: Timeline cards enter viewport

- GIVEN timeline cards are positioned alternately left and right
- WHEN each card enters the viewport via scroll
- THEN odd-indexed cards MUST slide in from the left
- AND even-indexed cards MUST slide in from the right
- AND each card MUST fade from `opacity: 0` to `opacity: 1` during the slide

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN timeline cards enter the viewport
- THEN all cards MUST appear at their final position immediately with no slide or fade

---

## 11. Partners Infinite Marquee

### Requirement: Continuous Horizontal Scroll

The partners/logos section MUST display a continuously scrolling horizontal strip of logos that loops infinitely.

#### Scenario: Marquee is visible

- GIVEN the partners section is in the viewport
- WHEN the page is loaded
- THEN the logo strip MUST scroll horizontally at a constant speed
- AND the scrolling MUST loop seamlessly (no visible gap or jump between cycles)

#### Scenario: User hovers the marquee

- GIVEN the marquee is scrolling
- WHEN the user hovers over the marquee area
- THEN the scrolling SHOULD pause
- AND WHEN the user removes hover, scrolling SHOULD resume from where it paused

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the partners section is visible
- THEN the marquee MUST NOT scroll
- AND all logos MUST be displayed in a static layout (visible without animation)

#### Scenario: Content overflow

- GIVEN the logo strip contains more logos than the viewport width
- WHEN the marquee is running
- THEN logos MUST NOT be clipped or hidden — the continuous scroll ensures all logos cycle through the visible area
