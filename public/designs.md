---
name: sketchui-design-system
description: The playful hand-drawn design language of SketchUI — component specs, RoughJS customization, color tokens, typography guidelines, and patterns for coding agents building hand-drawn interfaces with React.
source: https://sketchui.sanjoydev.com
canonical: https://sketchui.sanjoydev.com/docs
measured: component documentation and interactive examples, 2026-01-01, responsive
---

# Build with SketchUI

Act as a React developer working inside SketchUI, an opinionated hand-drawn component system. Every value below is extracted from the official component documentation and source code. When building or extending components, consume the design tokens and patterns directly — do not invent new variants or styles. Reuse existing configurations and props; the library is designed for customization via the `roughOptions` prop and standard className patterns.

The system's character is **playful restraint**: a sketch-themed aesthetic using RoughJS to create hand-drawn stroke effects, warm color palettes with soft pastel fills, and deliberate imperfection in every line. Structure is built, not flat — each component supports multiple edge styles, corner folds, and customizable roughness to maintain visual consistency while allowing personality.

---

## Component Ecosystem

SketchUI provides 20+ hand-drawn React components organized by purpose. Each component is built with RoughJS for the sketch effect and Tailwind CSS for layout. All components support:

- **Variants**: Color themes (yellow, purple, green, pink, blue, orange, paper, etc.)
- **Rough Options**: Full RoughJS customization (seed, stroke, strokeWidth, fill, fillStyle, hachureGap, hachureAngle, roughness, bowing)
- **Styling**: className and tailwind support for layout and positioning
- **Accessibility**: Proper ARIA labels, keyboard navigation, semantic HTML

### Core Container Components

**Card** — A sketchy paper card with multiple edge styles.
- Variants: yellow, purple, green, pink, blue, gray, silver, red, orange, sky, paper
- Border Styles: rough, dashed, project-corner (with folded corner effect)
- Shapes: rectangle, rounded-rectangle
- Props: width, height, padding, radius, variant, borderColor, transparent, roughOptions
- Fold Sides (for project-corner): top-right, top-left, bottom-right, bottom-left
- Fill Styles: solid, hachure, zigzag, cross-hatch, dots, dashed, zigzag-line

**Paper** — A lightweight note-style wrapper with edge effects.
- Variants: cream, white, yellow, pink, blue, green, gray
- Edge Styles: normal, folded-corner, curled-bottom, torn, messy
- Supports rotation and padding customization
- Fold corners with configurable size and position

**SketchBorder** — A flexible border wrapper for any content.
- Shapes: rectangle, rounded-rectangle, circle, ellipse
- Border Styles: solid, dashed
- Supports transparent fill or custom fill colors
- Highly customizable with roughOptions

### Content & Layout Components

**Badge** — Small doodle-style labels for tags and statuses.
- Variants: yellow, purple, green, pink, blue, gray, silver, red, orange, sky
- Shapes: rectangle, rounded-rectangle, ellipse, circle
- Configurable text size, font weight, padding
- Compact by default (120×38px)

**SectionTitle** — Hand-drawn heading with optional icon and subtitle.
- Variants: yellow, purple, green, pink, blue, orange, paper
- Supports icon rendering, subtitle text
- Customizable dimensions and rotation
- Perfect for section headers and landing page highlights

**Tape** — Decorative torn tape element for sticking paper effects.
- Variants: yellow, purple, green, pink, blue, orange, gray
- Tape Styles: smooth, torn, side-torn
- Customizable rotation, opacity, width/height
- Pointer-events-none by default (decorative)

**Separator** — Divider line with multiple sketch styles.
- Variants: wavy, dashed, curly, straight
- Orientation: horizontal, vertical
- Colors: black, purple, green, pink, blue, yellow, gray (or custom hex)
- Amplitude and frequency control for waves/curls
- Fully customizable stroke and roughness

### Interactive Components

**Avatar** — Hand-drawn circular avatar with optional status indicator.
- Variants: gray, yellow, purple, green, pink, blue, white, paper
- Sizes: sm (36px), md (52px), lg (72px), xl (96px), or custom number
- Status types: online, offline, busy, away
- Supports image, initials fallback, or default doodle
- Hover wiggle animation option

**Toggle** — Sketch-themed toggle switch with icons.
- Shapes: round, rounded (with separate track and slider shape control)
- Sizes: sm (34px), md (44px), lg (56px), or custom number
- Customizable checked/unchecked colors, slider color
- Optional icons inside slider
- Controlled and uncontrolled modes

**Calendar** — Interactive calendar with sketch styling and animations.
- Variants: paper, white, yellow, purple, green, pink, blue, gray, orange, red, sky
- Shapes: rectangle, rounded-rectangle
- Border Styles: solid, dashed
- Page Animations: slide, flip, fade, none
- Supports disabled dates, min/max date, week start configuration
- Folded corner support with customizable fold position

**HoverCard** — Tooltip-like card that appears on hover.
- Variants: paper, white, yellow, purple, green, pink, blue, gray, orange, red, sky
- Placements: top, bottom, left, right, top-start, top-end, bottom-start, bottom-end
- Shapes: rectangle, rounded-rectangle
- Border Styles: solid, dashed
- Supports optional arrow, shadow, custom delays
- Scale and rotate on open

**Tooltip** — Lightweight hover tooltip.
- Variants: paper, white, yellow, purple, green, pink, blue, gray, orange, red, sky
- Placements: top, bottom, left, right
- Shapes: rectangle, rounded-rectangle
- Border Styles: solid, dashed
- Max-content or fixed width
- Configurable padding, offset, delay

**Toast** — Comic-style message container with pointer variants.
- Variants: bubble, rounded, cloud, burst, thought
- Positions: top-left, top-right, bottom-left, bottom-right, left, right
- Colors: paper, yellow, purple, green, pink, blue
- Dotted shadow effect (comic-style)
- Rotation support for playful placement

### Background & Decorative Components

**DoodleGridBackground** — Full-screen background with grid doodle pattern.
- Densities: low, medium, high (opacity control)
- Cream (#fffbf2) background with overlaid grid and dot patterns
- Fixed positioning, pointer-events-none
- Perfect for landing pages and doc sections

**NotebookBackground** — Ruled notebook-style background.
- Shows horizontal ruled lines (32px spacing)
- Optional red margin line (classic notebook style)
- Cream background with subtle dot texture
- Ideal for journal, blog, or documentation pages

---

## Color Tokens & Palettes

SketchUI uses warm, pasteled colors organized by component variant. All colors are hex values; use them as-is or extend via roughOptions `fill` property.

### Standard Variants (Most Components)

| Variant | Hex | Usage |
|---------|-----|-------|
| yellow | #fde047 | Primary accent, highlights |
| purple | #d8c7ff | Secondary accent, calm tone |
| green | #bbf7d0 | Success, confirmation |
| pink | #fbcfe8 | Playful, attention |
| blue | #bfdbfe | Cool, informational |
| orange | #fed7aa | Warm, warning |
| gray | #e5e7eb | Neutral, disabled state |
| silver | #d1d5db | Light neutral, subtle |
| red | #fecaca | Error, destructive |
| sky | #bae6fd | Light, airy |
| paper | #fff7df | Document, note-like (warm cream) |

### Variant-Specific Palettes

**Paper & Calendar Variants:**
- cream: #fffbf2 (warm off-white)
- white: #ffffff (pure white)
- paper: #fffbf2 (cream, same as cream)

**Tape Variants:**
- yellow, pink, green, blue, purple, orange, gray (standard palette)

**Separator Colors:**
- black: #111111
- yellow, purple, green, pink, blue, gray (standard palette)
- Custom hex also supported

### Border & Text

All components default to:
- borderColor: #111 (dark charcoal)
- textColor: #111 (same dark charcoal)
- Muted/secondary text: rgba(17, 17, 17, 0.45) (40–50% opacity)

---

## RoughJS Customization Pattern

Every component that renders a sketch effect accepts a `roughOptions` prop. This is the single point of customization for the hand-drawn appearance. Use it to override any sketch parameter without touching component internals.

### RoughOptions Object Structure

```typescript
type RoughOptions = {
  seed?: number              // Controls stroke randomness; higher = more variation
  stroke?: string            // Border/stroke color (hex or named)
  strokeWidth?: number       // Stroke thickness (default 1.4–2)
  fill?: string              // Fill color (hex or named)
  fillStyle?: FillStyle      // Pattern for fill (see below)
  hachureGap?: number        // Gap between hatchure lines (default 5–8)
  hachureAngle?: number      // Angle of hatchure lines (default -10)
  roughness?: number         // Hand-drawn roughness (default 1.2–1.8, higher = rougher)
  bowing?: number            // Line bowing effect (default 0.7–1, higher = more curved)
  dashLength?: number        // Dash segment length (dashed borders)
  dashGap?: number           // Gap between dashes (dashed borders)
}

type FillStyle = 
  | "solid" 
  | "hachure" 
  | "zigzag" 
  | "cross-hatch" 
  | "dots" 
  | "dashed" 
  | "zigzag-line"
```

### Common Customization Patterns

**Smoother, Less Sketchy Look:**
```tsx
roughOptions={{
  roughness: 0.5,      // Lower roughness
  strokeWidth: 1,      // Thinner stroke
  fillStyle: "solid"   // Solid fill instead of hatchure
}}
```

**Rougher, More Hand-Drawn:**
```tsx
roughOptions={{
  roughness: 2.2,      // Higher roughness
  strokeWidth: 2.5,    // Thicker stroke
  fillStyle: "dots",   // Dotted fill pattern
  bowing: 1.2          // More bowing
}}
```

**Customized Hatchure:**
```tsx
roughOptions={{
  fillStyle: "hachure",
  hachureGap: 3,      // Tighter hatchure
  hachureAngle: 45,   // Different angle
}}
```

**Deterministic Rendering (Same Sketch Twice):**
```tsx
roughOptions={{
  seed: 42             // Fixed seed for reproducible sketch
}}
```

---

## Typography & Fonts

SketchUI does not enforce a single font stack. Instead, it recommends hand-drawn-friendly fonts for your interface text:

### Recommended Font Stack (from docs)

Primary suggestions (Google Fonts):
- **Patrick Hand** — Friendly, slightly hand-drawn sans-serif
- **Gaegu** — Playful, casual script-like font
- **Indie Flower** — Light, sketchy script
- **Shantell Sans** — Quirky, modern hand-drawn sans-serif
- **Lacquer** — Bold, playful display font

Choose one or combine (e.g., sans-serif body + Gaegu for headings). SketchUI's components don't mandate font; they inherit from your document's font-family.

### Text Styling Defaults

Components render text in:
- Default weight: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Default size: 14px (badges), 12px (labels), 16px (body), variable for headings
- Color: #111 (dark charcoal) for primary text; rgba(17, 17, 17, 0.45) for muted/secondary

Apply className or style props to override:
```tsx
<Card>
  <h3 className="text-lg font-gaegu font-bold">Heading</h3>
  <p className="text-sm text-black/60">Subtitle</p>
</Card>
```

---

## Layout & Spacing Conventions

### Default Component Dimensions

- **Badge:** 120×38px (content-dependent)
- **Avatar:** sm: 36px | md: 52px | lg: 72px | xl: 96px (circular)
- **Card:** 100% width, 220px height (customizable)
- **Paper:** 100% width, 160px height (customizable)
- **Toast:** 360×120px (customizable)
- **HoverCard:** 280px width, max 340px
- **Tooltip:** max-content, max 260px width
- **Separator:** 100% length, 28px thickness (varies by orientation)
- **Toggle:** 44px height (md size), ~84px width (height × 1.9)
- **Calendar:** 360px width, expands to fit content

### Padding & Spacing

Most components use:
- Card/Paper: 24px padding (customizable)
- Badge: 12px horizontal padding
- Tooltip/HoverCard: 14–18px padding
- Avatar: 6–8% padding relative to size
- Toast: 24px padding

Use Tailwind utilities (gap, p, px, py) to adjust spacing around components.

---

## Component Usage Patterns

### Pattern 1: Colored Variants

All components support variant props. Simply pass the variant name:

```tsx
<Card variant="yellow" />
<Card variant="purple" />
<Card variant="green" />
```

Each variant maps to a predefined color from the palette. Do not create new color names; use an existing variant or override with `fillColor` or `roughOptions.fill`.

### Pattern 2: Custom Styling via roughOptions

Override any sketch parameter without creating a new component:

```tsx
<Card 
  variant="blue"
  roughOptions={{
    roughness: 0.8,     // Less sketchy than default
    fillStyle: "solid"  // Solid fill instead of hatchure
  }}
/>
```

This is the idiomatic way to customize the hand-drawn appearance. Avoid modifying component internals.

### Pattern 3: Edge & Border Styles

Many components (Card, Paper, SketchBorder, HoverCard) support multiple border and edge variants:

```tsx
<Card borderStyle="dashed" />         // Dashed border
<Card borderStyle="project-corner" /> // Folded corner effect
<Paper edgeStyle="curled-bottom" />   // Curved bottom edge
<Paper edgeStyle="torn" />            // Torn paper effect
```

Choose the edge style first; then customize with roughOptions if needed.

### Pattern 4: Rotation for Playfulness

Most components accept a `rotate` prop (in degrees). Use it sparingly:

```tsx
<Tape rotate={-4} />      // Slight tilt
<Avatar rotate={2} />     // Small rotation
<Toast rotate={1} />      // Subtle rotation
```

Default rotations are built in (e.g., Tape: -4deg, Avatar: 0deg). Adjust for playful emphasis or visual balance.

### Pattern 5: Controlled vs. Uncontrolled

Interactive components (Calendar, Toggle) support both patterns:

```tsx
// Uncontrolled (internal state)
<Toggle defaultChecked={false} />

// Controlled (external state)
<Toggle checked={isChecked} onCheckedChange={setIsChecked} />
```

Use controlled mode when state must be managed by your app.

### Pattern 6: Full-Screen Backgrounds

Use DoodleGridBackground or NotebookBackground as wrappers:

```tsx
<DoodleGridBackground density="medium">
  <main>Your content</main>
</DoodleGridBackground>
```

These are fixed, full-screen components. Place them at the root of a page, not inside smaller sections.

---

## Shadow & Depth Treatment

SketchUI uses **no traditional box-shadows**. Elevation is conveyed by:

1. **Drop-shadow filter** (comic-style dotted shadow for Toast)
   ```tsx
   <Toast dottedShadow={true} shadowOffset={10} />
   ```

2. **Stroke color variation** (darker or lighter border for depth)

3. **Fill opacity** (transparent or semi-opaque fill for layering)

4. **Folded corners** (Paper, Card) to suggest depth and paper-like quality

Never add `box-shadow` to SketchUI components. If you need elevation, use:
- Translucent fill (`fillColor` with opacity)
- Darker `borderColor` for contrast
- Folded or torn edge effects
- Dashed or lighter stroke for recessed appearance

---

## Accessibility & Semantics

All SketchUI components are built with accessibility in mind:

- **Buttons & Toggles:** Proper `role`, `aria-label`, keyboard support
- **Tooltips & HoverCards:** `role="tooltip"`, `aria-describedby`, focus management
- **Calendar:** Semantic date selection, arrow keys for navigation
- **Avatar:** `alt` text for images, fallback initials or doodle
- **Separators:** `aria-hidden="true"` (decorative)
- **Backgrounds:** `pointer-events-none` (non-interactive)

When extending or using components:
- Always provide `aria-label` for icon-only elements
- Use semantic HTML (buttons for actions, divs for containers)
- Ensure focus visible rings are visible (most components include this)
- Test keyboard navigation on interactive components

---

## Do's and Don'ts

**Do**

- Use variant props for color consistency. All variants are tested and coordinated.
- Customize the sketch effect via `roughOptions` rather than rewriting component styles.
- Combine multiple edge/border styles (dashed + folded corner) for visual interest.
- Leverage rotation for playful emphasis, but keep it subtle (±3deg typical).
- Use full-screen backgrounds (DoodleGridBackground, NotebookBackground) at page root level.
- Apply `className` and Tailwind utilities for layout and positioning.
- Choose roughness (0.5–2.5) based on desired hand-drawn intensity.
- Pair fill styles (solid, hachure, dots) with appropriate roughness levels.

**Don't**

- Invent new color variants. Use the predefined palette or override with `roughOptions.fill`.
- Add `box-shadow` or `filter: drop-shadow()` directly. Use built-in shadow options (Toast) or skip shadows entirely.
- Change stroke weight dramatically without adjusting roughness to match.
- Use uppercase or tracking on non-heading text unless you're applying a label-eyebrow style.
- Mix too many fill styles in one component. Keep the sketch effect cohesive.
- Disable animation on interactive components (Calendar, Toggle, HoverCard) without good reason.
- Apply both `borderStyle="dashed"` and a solid stroke simultaneously; choose one visual treatment.
- Rotate components randomly. Rotation should be intentional and subtle.
- Force components into fixed dimensions that conflict with natural sizing (e.g., squashing an Avatar into 20px × 100px).
- Ignore accessibility props (aria-label, role, aria-describedby). These are required for inclusive interfaces.

---

## Responsive Behavior & Constraints

SketchUI components are built with Tailwind's responsive utilities in mind:

- **Widths:** Most containers use `w-full` or `max-w-*` by default. Adjust with `className`.
- **Heights:** Fixed by default (configurable). Use responsive classes to override.
- **Padding:** Fixed padding values. Use nested divs with responsive padding for adaptive spacing.
- **Typography:** Font size, weight, and tracking are component defaults. Override with `className`.

Example responsive usage:

```tsx
<Card 
  className="w-full md:w-96 lg:w-[500px]"
  height={220}
/>
```

SketchUI does not include built-in mobile/desktop variants. Use Tailwind's breakpoints (sm, md, lg, xl) to manage responsive behavior at the page level.

---

## Agent Workflow for Extending SketchUI

When building or extending SketchUI interfaces, follow this order:

1. **Identify the container type.** Choose Card, Paper, SketchBorder, or a custom wrapper.
2. **Select variant and edge style.** Pick from predefined variants; combine edge styles if needed.
3. **Customize the sketch appearance.** Use `roughOptions` to adjust roughness, fill style, and stroke.
4. **Apply layout and spacing.** Use `className`, padding props, and Tailwind utilities.
5. **Add interactive elements.** Layer Toggle, HoverCard, Tooltip, or custom components inside.
6. **Adjust typography.** Apply font family, size, weight via `className` or nested elements.
7. **Test accessibility.** Verify ARIA labels, keyboard navigation, and focus management.
8. **Finalize with rotation or transforms.** Add subtle rotation if it serves the design.

**Unknowns & Verification:**

- Exact lightness/chroma values for each color variant are hex-based. Measure computed styles in the browser to verify exact shades.
- RoughJS seed values (0–1000+) produce deterministic but complex patterns. Test with `seed` prop if reproducibility matters.
- Hand-drawn font recommendations (Patrick Hand, Gaegu, etc.) are suggestions. Verify against your project's font stack and licensing.
- Full-screen background layers use fixed positioning and may interact with CSS stacking contexts. Test z-index if overlapping modals or popovers.

---

## Quick Reference: Common Components & Props

### Card
```tsx
<Card 
  variant="yellow"           // Color theme
  borderStyle="rough"        // rough | dashed | project-corner
  width={400}
  height={200}
  padding={24}
  roughOptions={{ roughness: 1.5 }}
/>
```

### Avatar
```tsx
<Avatar 
  size="md"                  // sm | md | lg | xl | number
  variant="gray"
  src="/path/to/image"
  showInitials={false}
  status="online"            // online | offline | busy | away
  showStatus={false}
  hoverWiggle={false}
/>
```

### Badge
```tsx
<Badge 
  variant="green"
  shape="rounded-rectangle"  // rectangle | rounded-rectangle | ellipse | circle
  width={100}
  height={32}
  roughOptions={{ fillStyle: "solid" }}
>
  Tag
</Badge>
```

### Toggle
```tsx
<Toggle 
  checked={isChecked}
  onCheckedChange={setIsChecked}
  shape="round"              // round | rounded
  size="md"                  // sm | md | lg | number
  checkedColor="#86efac"
  uncheckedColor="#e5e7eb"
/>
```

### Toast
```tsx
<Toast 
  variant="bubble"           // bubble | rounded | cloud | burst | thought
  pointer="bottom-left"      // top-left | top-right | bottom-left | bottom-right | left | right
  color="paper"
  width={300}
  height={120}
  dottedShadow={true}
  rotate={0}
/>
```

### Calendar
```tsx
<Calendar 
  variant="paper"
  width={360}
  shape="rounded-rectangle"
  borderStyle="dashed"
  pageAnimation="slide"      // slide | flip | fade | none
  value={new Date()}
  onChange={(date) => {}}
/>
```

---

## Verification & Testing

Before shipping any SketchUI interface:

1. **Inspect computed styles.** Use DevTools to verify exact colors, fonts, and sketch properties.
2. **Test all variants.** Cycle through each variant to confirm visual consistency.
3. **Check accessibility.** Tab through interactive elements, verify focus rings and ARIA attributes.
4. **Test responsive.** Resize to mobile, tablet, and desktop breakpoints.
5. **Verify roughness.** Increase and decrease roughness to confirm hand-drawn intensity matches design intent.
6. **Cross-browser test.** Ensure RoughJS renders consistently (Chrome, Safari, Firefox).
7. **Measure performance.** Large numbers of rough-drawn components can impact paint performance; profile if needed.

