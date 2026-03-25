# Financial Site Design — Specifications

## Purpose

Behavioral specifications for a complete financial company website built on Astro 6 + Tailwind CSS v4 + TypeScript (strict). Covers the design token system, layout/SEO infrastructure, all 5 pages, interactive calculator island, responsive design, accessibility, and dark mode.

All scenarios use Given/When/Then format. Requirement strength uses RFC 2119 keywords (MUST, SHALL, SHOULD, MAY).

---

## 1. Theme System

### Requirement: Design Token Palette

The system MUST define a complete oklch color palette inside a `@theme {}` block in `src/styles/global.css`. The palette MUST include primary (teal/emerald), secondary (navy), neutral, and semantic colors (success, warning, error, info). Each color MUST have shades from 50 through 950.

#### Scenario: Theme tokens generate utility classes

- GIVEN the `@theme {}` block defines `--color-primary-500: oklch(...)`
- WHEN a component uses `class="bg-primary-500"`
- THEN Tailwind MUST resolve the class to the correct oklch value
- AND the element MUST render with the specified background color

#### Scenario: All token shades are available

- GIVEN the theme defines primary, secondary, and neutral color scales
- WHEN a developer uses any shade from 50 to 950 (e.g., `text-primary-700`, `bg-secondary-100`)
- THEN the class MUST resolve to its corresponding oklch value

### Requirement: Custom Font Token

The system MUST define a sans-serif font token referencing the Inter typeface.

#### Scenario: Font token applies globally

- GIVEN the `@theme {}` block defines `--font-sans: "Inter", sans-serif`
- WHEN any element uses the default sans font stack
- THEN the element MUST render in the Inter typeface
- AND the system SHOULD fall back to the system sans-serif if Inter fails to load

### Requirement: Dark Mode Support

The system MUST support dark mode via Tailwind's `dark:` variant. Dark mode SHOULD follow the user's system preference (`prefers-color-scheme: dark`).

#### Scenario: Dark mode activates from system preference

- GIVEN the user's OS is set to dark mode
- WHEN the site loads
- THEN all `dark:` variant styles MUST be applied
- AND the background MUST use the dark palette (e.g., `dark:bg-secondary-950`)

#### Scenario: Dark mode tokens maintain contrast

- GIVEN dark mode is active
- WHEN text is rendered over dark backgrounds
- THEN text color tokens MUST provide at least 4.5:1 contrast ratio against their background

---

## 2. Layout & SEO

### Requirement: Base Layout with SEO Meta

The `Layout.astro` component MUST accept `title`, `description`, `ogImage`, and `canonicalUrl` props. It MUST render corresponding `<meta>` tags in the `<head>`.

#### Scenario: Page renders with correct meta tags

- GIVEN a page passes `title="About Us"` and `description="Learn about our company"` to Layout
- WHEN the page is rendered
- THEN the `<title>` MUST be "About Us"
- AND `<meta name="description">` MUST have `content="Learn about our company"`

#### Scenario: Open Graph tags render

- GIVEN a page passes `title`, `description`, and `ogImage` to Layout
- WHEN the page is rendered
- THEN `<meta property="og:title">`, `<meta property="og:description">`, and `<meta property="og:image">` MUST be present
- AND `<meta property="og:type">` MUST be set to `"website"`

#### Scenario: Canonical URL renders

- GIVEN a page passes `canonicalUrl` to Layout
- WHEN the page is rendered
- THEN a `<link rel="canonical">` tag MUST be present with the correct URL

### Requirement: JSON-LD Structured Data

The system MUST include JSON-LD structured data on every page. The homepage MUST use `Organization` schema. Other pages SHOULD use `WebPage` schema.

#### Scenario: Homepage JSON-LD validates

- GIVEN the homepage is rendered
- WHEN the `<script type="application/ld+json">` tag is inspected
- THEN it MUST contain valid `Organization` schema
- AND it MUST include `name`, `url`, and `logo` properties

#### Scenario: Inner page JSON-LD renders

- GIVEN an inner page (About, Services, Contact, Calculator) is rendered
- WHEN the `<script type="application/ld+json">` tag is inspected
- THEN it MUST contain valid `WebPage` schema with `name` and `description`

### Requirement: Sitemap Generation

The system MUST generate a sitemap at `/sitemap-index.xml` containing all 5 pages.

#### Scenario: Sitemap includes all pages

- GIVEN the site is built with `@astrojs/sitemap` configured
- WHEN `/sitemap-index.xml` is requested
- THEN it MUST reference a sitemap containing URLs for `/`, `/about`, `/services`, `/contact`, and `/calculator`

### Requirement: Robots.txt

The system MUST serve a `robots.txt` file from `/robots.txt`.

#### Scenario: Robots.txt allows crawling

- GIVEN a crawler requests `/robots.txt`
- WHEN the response is returned
- THEN it MUST contain `User-agent: *` and `Allow: /`
- AND it SHOULD reference the sitemap URL

---

## 3. Header

### Requirement: Responsive Navigation

The `Header.astro` component MUST display a horizontal navigation bar on desktop (>=1024px) and a hamburger menu on mobile (<1024px).

#### Scenario: Desktop navigation renders links

- GIVEN the viewport width is >= 1024px
- WHEN the header renders
- THEN all navigation links (Home, About, Services, Contact, Calculator) MUST be visible as horizontal items
- AND the hamburger icon MUST NOT be visible

#### Scenario: Mobile navigation shows hamburger

- GIVEN the viewport width is < 1024px
- WHEN the header renders
- THEN a hamburger menu button MUST be visible
- AND the navigation links MUST be hidden until the menu is opened

#### Scenario: Mobile menu opens and closes

- GIVEN the viewport width is < 1024px
- WHEN the user taps the hamburger button
- THEN the mobile menu MUST expand to show all navigation links
- AND when the user taps the hamburger button again (or a link)
- THEN the menu MUST close

### Requirement: Glassmorphism Effect

The header MUST use a glassmorphism visual effect (semi-transparent background with backdrop blur).

#### Scenario: Header has glassmorphism on scroll

- GIVEN the page has scrollable content
- WHEN the user scrolls down past the top of the page
- THEN the header MUST display a semi-transparent background with `backdrop-filter: blur()`
- AND the header MUST remain fixed at the top of the viewport

### Requirement: Active Link State

The header MUST visually indicate which page the user is currently on.

#### Scenario: Current page link is highlighted

- GIVEN the user is on the About page (`/about`)
- WHEN the header renders
- THEN the "About" navigation link MUST have a distinct visual style (e.g., different color, underline, or font weight) compared to other links

---

## 4. Footer

### Requirement: Footer Content

The `Footer.astro` component MUST display the company name, copyright year, navigation links, and contact information.

#### Scenario: Footer renders all sections

- GIVEN any page on the site
- WHEN the footer renders
- THEN it MUST display the company name and logo area
- AND it MUST display navigation links grouped by category
- AND it MUST display a copyright notice with the current year
- AND it SHOULD display contact information (email, phone, address)

### Requirement: Footer Responsive Layout

The footer MUST adapt its layout for different screen sizes.

#### Scenario: Footer columns stack on mobile

- GIVEN the viewport width is < 768px
- WHEN the footer renders
- THEN footer columns MUST stack vertically
- AND all content MUST remain readable and accessible

#### Scenario: Footer uses multi-column on desktop

- GIVEN the viewport width is >= 768px
- WHEN the footer renders
- THEN footer sections MUST display in a multi-column layout

---

## 5. Homepage Sections

### Requirement: Hero Section

The `Hero.astro` component MUST display a headline, subheadline, and at least one CTA button. The section MUST use a gradient background.

#### Scenario: Hero CTA navigates to target

- GIVEN the homepage renders the Hero section
- WHEN the user clicks the primary CTA button
- THEN the browser MUST navigate to the target page (e.g., `/services` or `/contact`)

#### Scenario: Hero renders gradient background

- GIVEN the homepage renders
- WHEN the Hero section is displayed
- THEN the section background MUST use a gradient from the primary color palette

### Requirement: Features Grid

The `Features.astro` component MUST display feature items in a responsive grid layout.

#### Scenario: Features grid renders all items

- GIVEN the features data contains N feature items
- WHEN the Features section renders
- THEN exactly N feature cards MUST be displayed
- AND each card MUST show an icon, title, and description

#### Scenario: Features grid is responsive

- GIVEN the viewport width is < 768px
- WHEN the Features section renders
- THEN feature cards MUST display in a single column
- AND at >= 768px, cards MUST display in 2 columns
- AND at >= 1024px, cards SHOULD display in 3 or more columns

### Requirement: Services Preview

The `ServicesPreview.astro` component MUST display a subset of services with links to the `/services` page.

#### Scenario: Service cards link to services page

- GIVEN the homepage renders the ServicesPreview section
- WHEN the user clicks on a service card or "View All Services" link
- THEN the browser MUST navigate to `/services`

### Requirement: Testimonials Display

The `Testimonials.astro` component MUST display customer testimonials loaded from static data.

#### Scenario: Testimonials render from data

- GIVEN `src/data/testimonials.json` contains testimonial entries
- WHEN the Testimonials section renders
- THEN each testimonial MUST display the quote text, author name, and author role/company
- AND the testimonials SHOULD display in a visually appealing grid or carousel layout

### Requirement: Stats Section

The `Stats.astro` component MUST display numerical statistics (e.g., years of experience, clients served).

#### Scenario: Stats display numeric values

- GIVEN the Stats section has stat entries with numeric values
- WHEN the section renders
- THEN each stat MUST display its numeric value and label
- AND the numbers SHOULD animate (count up) when the section enters the viewport

#### Scenario: Stats without JavaScript fallback

- GIVEN JavaScript is disabled or animations are reduced (`prefers-reduced-motion: reduce`)
- WHEN the Stats section renders
- THEN the final numeric values MUST still be visible (no blank state)

### Requirement: CTA Banner

The `CTA.astro` component MUST display a call-to-action banner with a gradient background and action button.

#### Scenario: CTA button navigates to target

- GIVEN the CTA banner renders on the homepage
- WHEN the user clicks the CTA button
- THEN the browser MUST navigate to the target page (e.g., `/contact`)

### Requirement: Partners Section

The `Partners.astro` component MUST display partner/client logos in a horizontal strip.

#### Scenario: Partner logos render

- GIVEN `src/data/partners.json` contains partner entries
- WHEN the Partners section renders
- THEN all partner logos or names MUST be displayed
- AND logos MUST have descriptive `alt` text

---

## 6. About Page

### Requirement: Mission Section

The `Mission.astro` component MUST display the company's mission statement prominently.

#### Scenario: Mission renders with heading and text

- GIVEN the About page renders
- WHEN the Mission section is displayed
- THEN it MUST contain a section heading and mission description text
- AND the heading hierarchy MUST be correct (h2 under the page h1)

### Requirement: Team Cards

The `Team.astro` component MUST display team member cards loaded from static data.

#### Scenario: Team cards render from data

- GIVEN `src/data/team.json` contains team member entries
- WHEN the Team section renders
- THEN each team member MUST display their name, role, and image
- AND images MUST have `alt` text containing the team member's name

#### Scenario: Team cards are responsive

- GIVEN the viewport width is < 768px
- WHEN the Team section renders
- THEN team cards MUST stack in a single column or 2-column grid
- AND at >= 1024px, cards MUST display in a wider grid (3-4 columns)

### Requirement: Timeline

The `Timeline.astro` component MUST display company milestones in a chronological timeline format.

#### Scenario: Timeline renders milestones in order

- GIVEN the timeline data contains milestone entries with years
- WHEN the Timeline section renders
- THEN milestones MUST appear in chronological order
- AND each milestone MUST display its year, title, and description

### Requirement: Values Section

The `Values.astro` component MUST display company core values.

#### Scenario: Values render with icons and descriptions

- GIVEN the About page includes a Values section
- WHEN the section renders
- THEN each value MUST display a title and description
- AND values SHOULD include a visual icon or illustration

---

## 7. Services Page

### Requirement: Service Cards from Data

The Services page MUST render service cards from a static data source (`src/data/services.json`).

#### Scenario: All services render from data

- GIVEN `src/data/services.json` contains N service entries
- WHEN the Services page renders
- THEN exactly N service cards MUST be displayed
- AND each card MUST show the service name, description, and an icon or image

#### Scenario: Services data is empty

- GIVEN `src/data/services.json` is an empty array
- WHEN the Services page renders
- THEN the page MUST NOT crash
- AND it SHOULD display a meaningful empty state or fallback message

### Requirement: Service Detail Display

Each service card SHOULD provide expanded detail content (features, benefits, or key points).

#### Scenario: Service detail shows features

- GIVEN a service entry contains a `features` array
- WHEN the service detail is rendered
- THEN all features MUST be listed
- AND the list MUST use proper semantic HTML (`<ul>` or `<ol>`)

---

## 8. Contact Page

### Requirement: Contact Form Validation

The `ContactForm.astro` (or island) MUST validate user inputs before allowing submission. Required fields MUST include name, email, and message.

#### Scenario: Empty form submission is prevented

- GIVEN the contact form is displayed with all fields empty
- WHEN the user clicks the submit button
- THEN the form MUST NOT submit
- AND validation error messages MUST appear for all required fields (name, email, message)

#### Scenario: Invalid email is rejected

- GIVEN the user enters "notanemail" in the email field
- WHEN the user attempts to submit
- THEN the form MUST NOT submit
- AND an error message MUST indicate the email format is invalid

#### Scenario: Valid form shows success message

- GIVEN the user fills in name, a valid email, and a message
- WHEN the user clicks the submit button
- THEN a success/demo message MUST be displayed
- AND the message SHOULD clarify that no actual submission occurred (demo mode)

### Requirement: Submit Button States

The submit button MUST reflect the current form state.

#### Scenario: Button is disabled when form is invalid

- GIVEN the form has empty required fields
- WHEN the form renders
- THEN the submit button SHOULD be visually styled as disabled
- AND the button SHOULD communicate its disabled state to assistive technologies

#### Scenario: Button indicates submission

- GIVEN the form is valid and the user clicks submit
- WHEN the submit action is triggered
- THEN the button SHOULD show a loading or processing state briefly before showing the success message

### Requirement: No Backend Dependency

The contact form MUST NOT depend on any backend service. All form handling MUST be client-side only.

#### Scenario: Form works without network

- GIVEN the user is offline or no API endpoint is configured
- WHEN the user submits the contact form
- THEN the form MUST still show the demo success message
- AND no network request SHALL be made

---

## 9. Calculator

### Requirement: Loan Payment Calculation

The system MUST provide a pure function that calculates monthly loan payments using the standard amortization formula: `M = P * [r(1+r)^n] / [(1+r)^n - 1]` where P = principal, r = monthly rate, n = total months.

#### Scenario: Correct monthly payment for known inputs

- GIVEN principal = $200,000, annual interest rate = 6%, loan term = 30 years
- WHEN the monthly payment is calculated
- THEN the result MUST be approximately $1,199.10 (within $0.01 tolerance)

#### Scenario: Correct monthly payment for short-term loan

- GIVEN principal = $10,000, annual interest rate = 5%, loan term = 1 year
- WHEN the monthly payment is calculated
- THEN the result MUST be approximately $856.07 (within $0.01 tolerance)

#### Scenario: Zero interest rate

- GIVEN principal = $12,000, annual interest rate = 0%, loan term = 12 months
- WHEN the monthly payment is calculated
- THEN the result MUST be exactly $1,000.00

### Requirement: Input Validation

The calculator MUST validate that all inputs are positive numbers within reasonable ranges.

#### Scenario: Negative principal is rejected

- GIVEN the user enters -50000 as the principal
- WHEN the input is validated
- THEN the calculator MUST display a validation error
- AND the calculation MUST NOT proceed

#### Scenario: Zero loan term is rejected

- GIVEN the user enters 0 as the loan term
- WHEN the input is validated
- THEN the calculator MUST display a validation error

#### Scenario: Extremely high interest rate warns user

- GIVEN the user enters an interest rate above 50%
- WHEN the input is validated
- THEN the calculator SHOULD display a warning (but MAY still allow calculation)

#### Scenario: Non-numeric input is handled

- GIVEN the user types alphabetic characters in a numeric field
- WHEN the input changes
- THEN the field MUST reject non-numeric characters or display a validation error

### Requirement: Real-Time Result Updates

The calculator MUST update results as the user changes inputs, without requiring a manual "Calculate" button press.

#### Scenario: Results update on input change

- GIVEN the calculator has valid inputs and displays a result
- WHEN the user changes the principal amount
- THEN the monthly payment, total payment, and total interest MUST update immediately
- AND no page reload SHALL occur

### Requirement: Amortization Display

The calculator SHOULD display an amortization breakdown showing principal vs. interest per period.

#### Scenario: Amortization table renders

- GIVEN the calculator has valid inputs
- WHEN results are displayed
- THEN an amortization summary SHOULD show total principal, total interest, and total cost
- AND the display MAY include a per-year or per-month breakdown

### Requirement: Preact Island Hydration

The calculator MUST be implemented as a Preact island using `client:visible` directive.

#### Scenario: Calculator hydrates when scrolled into view

- GIVEN the calculator page is loaded
- WHEN the calculator section scrolls into the viewport
- THEN the Preact component MUST hydrate and become interactive
- AND before hydration, the component SHOULD show a meaningful static placeholder

---

## 10. Responsive Design

### Requirement: No Horizontal Scroll

The site MUST NOT produce horizontal scrollbars at any viewport width from 320px to 1440px+.

#### Scenario: No overflow at 320px

- GIVEN the viewport width is set to 320px
- WHEN any page is loaded
- THEN no horizontal scrollbar MUST appear
- AND all content MUST be contained within the viewport width

#### Scenario: No overflow at 768px

- GIVEN the viewport width is set to 768px
- WHEN any page is loaded
- THEN no horizontal scrollbar MUST appear

#### Scenario: No overflow at 1440px

- GIVEN the viewport width is set to 1440px
- WHEN any page is loaded
- THEN content MUST be properly constrained (max-width container)
- AND no horizontal scrollbar MUST appear

### Requirement: Touch Targets

All interactive elements MUST have a minimum touch target of 44x44px on mobile viewports.

#### Scenario: Buttons meet touch target size

- GIVEN the viewport width is < 768px
- WHEN a button or link is rendered
- THEN its tap area MUST be at least 44px x 44px

#### Scenario: Navigation links meet touch target size

- GIVEN the mobile menu is open
- WHEN navigation links are displayed
- THEN each link's tap area MUST be at least 44px tall

### Requirement: Mobile-First Breakpoints

Styles MUST be authored mobile-first, using `sm:`, `md:`, `lg:`, `xl:` breakpoints to scale up.

#### Scenario: Base styles target mobile

- GIVEN a component has responsive styles
- WHEN rendered at 320px viewport
- THEN only base (un-prefixed) Tailwind classes MUST apply
- AND the layout MUST be usable and readable

---

## 11. Accessibility

### Requirement: Keyboard Navigation

All interactive elements MUST be reachable and operable via keyboard alone.

#### Scenario: Tab order follows visual order

- GIVEN any page is loaded
- WHEN the user presses Tab repeatedly
- THEN focus MUST move through interactive elements in a logical order matching the visual layout

#### Scenario: Mobile menu is keyboard accessible

- GIVEN the viewport triggers the mobile hamburger menu
- WHEN the user focuses the hamburger button and presses Enter
- THEN the mobile menu MUST open
- AND focus MUST move into the menu
- AND pressing Escape MUST close the menu

#### Scenario: Calculator inputs are keyboard navigable

- GIVEN the calculator page is loaded and the island is hydrated
- WHEN the user navigates with Tab
- THEN all input fields and interactive elements MUST be focusable in sequence

### Requirement: Focus Visibility

All focusable elements MUST display a visible focus indicator.

#### Scenario: Focus rings on buttons

- GIVEN a button receives keyboard focus
- WHEN the focus indicator renders
- THEN a visible ring or outline MUST be displayed
- AND it MUST have sufficient contrast against the background (at least 3:1)

#### Scenario: Focus rings in dark mode

- GIVEN dark mode is active and a button receives keyboard focus
- WHEN the focus indicator renders
- THEN the focus ring MUST still be visible against the dark background

### Requirement: ARIA Labels on Icon Buttons

All buttons that display only an icon (no visible text) MUST have an `aria-label` attribute.

#### Scenario: Hamburger menu button has aria-label

- GIVEN the header renders the hamburger menu button
- WHEN a screen reader encounters the button
- THEN the button MUST have `aria-label` describing its action (e.g., "Open navigation menu")

#### Scenario: Icon-only social links have aria-label

- GIVEN the footer renders social media icon links
- WHEN a screen reader encounters each link
- THEN each link MUST have an `aria-label` describing its destination (e.g., "Visit our Facebook page")

### Requirement: Heading Hierarchy

Each page MUST have exactly one `<h1>`, and subsequent headings MUST follow sequential order (h1 > h2 > h3) without skipping levels.

#### Scenario: Homepage heading hierarchy

- GIVEN the homepage is rendered with all sections
- WHEN the heading structure is inspected
- THEN there MUST be exactly one `<h1>` element
- AND all subsequent headings MUST follow h2, then h3 order without skipping levels

#### Scenario: Inner page heading hierarchy

- GIVEN any inner page (About, Services, Contact, Calculator) is rendered
- WHEN the heading structure is inspected
- THEN there MUST be exactly one `<h1>` element
- AND no heading level SHALL be skipped (e.g., h2 followed directly by h4)

### Requirement: Color Contrast

All text MUST meet WCAG 2.1 AA contrast ratios: 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold).

#### Scenario: Primary text on white background

- GIVEN text uses the primary color palette on a white/light background
- WHEN contrast is measured
- THEN the ratio MUST be at least 4.5:1 for normal-sized text

#### Scenario: Text on gradient backgrounds

- GIVEN the Hero section or CTA banner has text on a gradient background
- WHEN contrast is measured at the lowest-contrast point of the gradient
- THEN the ratio MUST be at least 4.5:1 for normal text or 3:1 for large text

### Requirement: Semantic HTML

Pages MUST use semantic HTML elements for their respective roles.

#### Scenario: Landmark elements present

- GIVEN any page is rendered
- WHEN the HTML structure is inspected
- THEN there MUST be `<header>`, `<main>`, and `<footer>` landmark elements
- AND navigation MUST use the `<nav>` element

#### Scenario: Lists use list elements

- GIVEN a section renders a list of items (features, services, values)
- WHEN the HTML is inspected
- THEN items MUST be wrapped in `<ul>` or `<ol>` with `<li>` children

#### Scenario: Images have alt text

- GIVEN any page with images is rendered
- WHEN image elements are inspected
- THEN informative images MUST have descriptive `alt` text
- AND decorative images MUST have `alt=""` and `aria-hidden="true"`

---

## 12. Dark Mode

### Requirement: Complete Dark Variant Coverage

Every component MUST have dark mode styles using Tailwind's `dark:` variant.

#### Scenario: Card component in dark mode

- GIVEN dark mode is active
- WHEN a Card component renders
- THEN the card background MUST use a dark palette color (not white)
- AND card text MUST be light-colored for readability
- AND card borders/shadows MUST adapt to the dark theme

#### Scenario: Form inputs in dark mode

- GIVEN dark mode is active
- WHEN the contact form or calculator inputs render
- THEN input backgrounds MUST use a dark color
- AND input text MUST be light-colored
- AND input borders MUST be visible against the dark background
- AND placeholder text MUST be readable

### Requirement: No White Flash on Load

The site MUST NOT display a white background flash when loading in dark mode.

#### Scenario: Dark mode loads without flash

- GIVEN the user's system preference is dark mode
- WHEN the page first loads
- THEN the page background MUST be dark from the initial paint
- AND no momentary white/light background SHALL be visible

### Requirement: Consistent Dark Palette

All components MUST use tokens from the same dark palette — no ad-hoc dark colors.

#### Scenario: Dark backgrounds use secondary palette

- GIVEN dark mode is active
- WHEN multiple components render (header, cards, footer, sections)
- THEN all dark backgrounds MUST use colors from the secondary (navy) or neutral palette defined in `@theme {}`
- AND no component SHALL use arbitrary dark color values outside the token system

#### Scenario: Dark mode gradient consistency

- GIVEN dark mode is active
- WHEN the Hero section and CTA banner render their gradient backgrounds
- THEN gradients MUST use dark-appropriate colors from the token system
- AND the overall visual feel MUST remain cohesive across sections
