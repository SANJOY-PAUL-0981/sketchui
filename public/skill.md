---
name: sketchui
description: Build hand-drawn React interfaces with SketchUI, a RoughJS-powered component library. Use when creating, customizing, or extending sketch-themed React/Next.js UIs — cards, buttons, badges, paper, tape, avatars, toggles, calendars, toasts, tooltips, forms, and doodle backgrounds.
source: https://sketchui.sanjoydev.com
canonical: https://sketchui.sanjoydev.com/docs
---

# Build with SketchUI

Act as a React developer working inside SketchUI. This repo is both the component library and its documentation site. The library is **copy-paste / "own the code"**: components are plain `.tsx` files in `components/ui`, not a published runtime package. There is no CLI yet (installation docs say "coming soon").

The aesthetic is **playful restraint**: warm pastel fills, `#111` charcoal strokes, and deliberate RoughJS imperfection. Consistency comes from reusing the existing variants and `roughOptions`, not from inventing new styles.

---

## 1. Stack and repository map

- Next.js (App Router), React 19, TypeScript (strict), Tailwind CSS v4, RoughJS 4.6, bun.
- Path alias `@/*` → repo root (`tsconfig.json`).
- `next.config.ts`: `reactCompiler: true`, `pageExtensions` includes `mdx`, `.next` tracing includes `content/**/*.mdx`.

```
app/
  layout.tsx                 fonts + metadata
  globals.css                @theme tokens, font utilities, keyframes
  docs/layout.tsx            docs shell + DoodleGridBackground
  docs/[[...slug]]/page.tsx  MDX docs renderer
components/
  ui/           the actual components (+ ui/style/*.css for Calender & Loader)
  examples/     *-demo.tsx previews, exported as Demo<Name>
  mdx/          mdx-components.tsx: ComponentPreview registry + MDX element styling
  site/         landing page + docs chrome (not part of the library)
content/docs/
  getting-started/*.mdx      introduction, installation, fonts, templates, contribute
  components/*.mdx           one doc per component
lib/
  registry.ts    canonical component list (name, slug, href, status, order)
  docs.ts        reads content/docs with gray-matter
  site.ts        site config
  utils.ts       cn() = twMerge(clsx(...))
```

Install: `bun install` → `bun dev`. Verify: `bun run lint`, `bunx tsc --noEmit`, `bun run build` (postbuild runs `next-sitemap`). There is no test script.

---

## 2. Component map (exact export names)

All components are imported as `@/components/ui/<File>` and exported as **named** functions. Three names are misspelled in source — match them exactly:

| File | Export | Purpose |
|---|---|---|
| `Button.tsx` | `Button` | Sketch button; `href`/`external` render a Next `<Link>`, else `<button>`; `enable3D`, `hoverSketch` |
| `Card.tsx` | `Card` | Paper card; `borderStyle="rough"\|"dashed"\|"project-corner"` |
| `Badge.tsx` | `Badge` | Small label; shapes `rectangle\|rounded-rectangle\|ellipse\|circle` |
| `Tape.tsx` | `Tape` | Decorative tape; `tapeStyle="smooth"\|"torn"\|"side-torn"`, `pointer-events-none` |
| `Paper.tsx` | `Paper` | Note wrapper; `edgeStyle="normal"\|"folded-corner"\|"curled-bottom"\|"torn"\|"messy"` |
| `SketchBorder.tsx` | `SketchBorder` | Transparent border wrapper; shapes incl. `circle`/`ellipse` |
| `Toast.tsx` | `Toast` | Comic bubble; `variant="bubble"\|"rounded"\|"cloud"\|"burst"\|"thought"` |
| `Avatar.tsx` | `Avatar` | Circular avatar via `next/image`; initials/doodle fallback, status dot |
| `Calender.tsx` | `Calender` | Interactive calendar (note spelling); imports `ui/style/Calender.css` |
| `DatePicker.tsx` | `DatePicker` | Sketch trigger + popover wrapping Calender; controlled/uncontrolled, Clear button |
| `AcknowledgementSlideshow.tsx` | `AcknowledgementSlideshow` | Card-based people slideshow with autoplay, rough arrows and dots |
| `HoverCard.tsx` | `HoverCard` | Hover/focus card with 8 placements, arrow, shadow |
| `Loader.tsx` | `Loader` | CSS-animated `dots`/`spinner`; imports `ui/style/Loader.css` |
| `SectionTitle.tsx` | `SectionTitle` | Heading with optional `icon`/`subtitle` |
| `Separator.tsx` | **`Seperator`** | Divider; `wavy\|curly\|dashed\|straight`, horizontal/vertical |
| `Toggle.tsx` | `Toggle` | `role="switch"`; controlled/uncontrolled |
| `Tooltip.tsx` | `Tooltip` | Lightweight tooltip; 4 placements |
| `ComboBox.tsx` | **`Combobox`** | Select with optional search; takes `items: {value,label,disabled?,icon?}[]` |
| `Checkbox.tsx` | `Checkbox` | `check\|cross\|dot\|plus\|scribble` marks, `indeterminate` |
| `Alert.tsx` | `Alert` | `role="alert"`; `info\|success\|warning\|error\|note`, dismissible |
| `Input.tsx` | `Input` | `forwardRef`; extends input attrs; label/helperText/error |
| `Textarea.tsx` | `Textarea` | `forwardRef` (displayName `TextArea`); extends textarea attrs |
| `DoodleGridBackground.tsx` | `DoodleGridBackground` | Full-page grid background; `density="low"\|"medium"\|"high"` |
| `NotebookBackground.tsx` | `NotebookBackground` | Ruled background; `showMarginLine` |

`lib/registry.ts` is the authoritative "ready" list of these 24. Files ending in `X.tsx` (`AuthFormX`, `RadioX`, `SelectX`, `SidebarX`, `SketchChartX`, etc.) are **empty placeholders**; the matching docs and demos without `status: ready` are empty stubs too. Do not import them.

### Key defaults

- `Card`: width `100%`, height `220`, variant `paper`, borderStyle `rough`, padding `24`, radius `18`. `CardProps` declares `depth*` fields but the component ignores them — do not rely on them.
- `Paper`: height `160`, variant `cream`, edgeStyle `normal`, padding `24`, rotate `0`.
- `Badge`: `120×38`, variant `yellow`, shape `rectangle`, fontSize `14`.
- `Button`: `180×48`, variant `yellow`, shape `rectangle`, fontWeight `bold`, hover translate/rotate by default.
- `SketchBorder`: width `100%`, transparent `true`, shape `rectangle`, padding `16`.
- `Toast`: `360×120`, variant `bubble`, pointer `bottom-left`, color `paper`, `dottedShadow` on.
- `Avatar`: size `md` (52px), variant `gray`; sizes sm/md/lg/xl = 36/52/72/96.
- `Calender`: width `360`, variant `paper`, borderStyle `dashed`, pageAnimation `slide`, weekStartsOn `0`. Controlled via `value`/`month`, uncontrolled via `defaultValue`/`defaultMonth`.
- `DatePicker`: trigger width `260`/height `48`, calendarWidth `300`, variant `paper`, borderStyle `solid`, placement `bottom-start`, `clearable`/`closeOnSelect` on. Controlled via `value`, uncontrolled via `defaultValue`; `onChange` also receives `undefined` from Clear.
- `AcknowledgementSlideshow`: card width `100%`/height `280`, variant `paper`, borderStyle `rough`, `autoPlay` 4000ms, `loop`/arrows/dots/quote on; controlled via `activeIndex`, uncontrolled via `defaultActiveIndex`, CSS in `ui/style/AcknowledgementSlideshow.css`.
- `HoverCard`: width `280`, maxWidth `340`, placement `top`, padding `18`, `rotate=-1`, arrow off.
- `Tooltip`: width `max-content`, maxWidth `260`, paddingX `14`/paddingY `10`, delay `120`.
- `Toggle`: size `md` (44px height, width = height × 1.9), checked `#86efac`, unchecked `#e5e7eb`.
- `Checkbox`: size `md` (28px), shape `rounded`, variant `paper`, checkStyle `check`.
- `Combobox`: width `260`, variant `paper`, shape `rounded`, `searchable=false`.
- `Input`: height `44`, size `md`, shape `rectangle`, variant `paper`.
- `Textarea`: height `120`, size `md`, shape `rounded-rectangle`, `rows=4`.
- `SectionTitle`: `260×64`, variant `yellow`, rotate `-1`.
- `Seperator`: length `100%`, thickness `28`, variant `wavy`, amplitude `6`, frequency `8`.
- `Loader`: size `md` (44), color `purple`, motion `normal`, `showLabel=false`.

---

## 3. The `roughOptions` contract

Every RoughJS-drawn component accepts a `roughOptions` object. This is the idiomatic customization point — never rewrite component internals for a different look.

```ts
type RoughOptions = {
  seed?: number          // deterministic stroke randomness (each variant has a fixed default seed)
  stroke?: string        // stroke color, defaults to borderColor / #111
  strokeWidth?: number   // ~1.2–2.2 by component
  fill?: string          // overrides the variant fill
  fillStyle?: "solid" | "hachure" | "zigzag" | "cross-hatch" | "dots" | "dashed" | "zigzag-line"
  hachureGap?: number    // ~5–8
  hachureAngle?: number  // default -10
  roughness?: number     // ~1.2–1.8; higher = sketchier
  bowing?: number        // ~0.7–1; line curvature
}
```

Component-specific notes:
- `Button` adds `hoverHachureGap` and `hoverRoughness` (used when `hoverSketch` is on).
- `Seperator` adds `dashLength`/`dashGap` and has no fill props; `HoverCard`, `Tooltip`, `Calender` add `dashLength`/`dashGap` for dashed borders.
- `Toggle` uses **flat** sketch props (`roughness`, `bowing`, `strokeWidth`, `seed`), no `roughOptions` object.
- `Input`, `Textarea`, `Alert`, `Loader`, `Toast` accept only a subset (`seed`, `stroke`, `strokeWidth`, `roughness`, `bowing` — Loader has none).
- `Toast` forces `fillStyle: "solid"` internally.
- Fix `seed` when you need byte-identical sketches (e.g. screenshots/tests); leave it unset for lively variation.

Recipes:
```tsx
<Card variant="blue" roughOptions={{ roughness: 0.5, strokeWidth: 1, fillStyle: "solid" }} />
<Card variant="yellow" roughOptions={{ roughness: 2.2, bowing: 1.2, fillStyle: "dots", hachureGap: 3 }} />
<Badge variant="green" roughOptions={{ fillStyle: "cross-hatch", hachureGap: 3, seed: 42 }} />
```

---

## 4. Color system

Shared pastel palette (used by Card, Badge, SectionTitle, Combobox, Checkbox, SketchBorder overrides):

| Variant | Hex | Variant | Hex |
|---|---|---|---|
| yellow | `#fde047` | gray | `#e5e7eb` |
| purple | `#d8c7ff` | silver | `#d1d5db` |
| green | `#bbf7d0` | red | `#fecaca` |
| pink | `#fbcfe8` | orange | `#fed7aa` |
| blue | `#bfdbfe` | sky | `#bae6fd` |
| paper | `#fff7df` | — | — |

Deliberate per-component overrides — use these when switching components so colors stay coordinated:
- **Badge** yellow `#F2F272` (only difference from shared palette).
- **Paper** variants: cream `#fffbf2`, white `#ffffff`, yellow `#fef3c7`, pink `#fce7f3`, blue `#dbeafe`, green `#dcfce7`, gray `#f3f4f6`.
- **HoverCard / Tooltip / Calender**: paper `#fffbf2`, white `#ffffff`, yellow `#fef3c7`, purple `#d8c7ff`, green `#bbf7d0`, pink `#fbcfe8`, blue `#bfdbfe`, gray `#e5e7eb`, orange `#fed7aa`, red `#fecaca`, sky `#bae6fd`.
- **Toast**: paper `#fffbf2`, yellow `#fef3c7`, purple `#e9d5ff`, green `#bbf7d0`, pink `#fbcfe8`, blue `#bfdbfe`.
- **Alert**: info `#bfdbfe`, success `#bbf7d0`, warning `#fde68a`, error `#fecaca`, note `#e9d5ff`.
- **Tape**: yellow `#fde047`, pink `#f9a8d4`, green `#86efac`, blue `#93c5fd`, purple `#c084fc`, orange `#fdba74`, gray `#d1d5db`.
- **Button** presets: yellow `#fde047`, purple `#c084fc`, green `#86efac`; any other string (including hex) is used directly as the fill.
- **Seperator / Loader** colors: black `#111111`, yellow `#fde047`, purple `#c084fc`, green `#86efac`, pink `#f9a8d4`, blue `#93c5fd`, gray `#9ca3af` (+ arbitrary hex).
- **Input / Textarea** `variant` maps to a darker stroke: yellow `#d4a017`, purple `#9333ea`, green `#16a34a`, pink `#db2777`, blue `#2563eb`, gray `#6b7280`, paper `#292524`.
- Defaults everywhere else: stroke/border/text `#111`; muted text `rgba(17,17,17,0.45)`.

Never invent variant names. Use an existing variant or override `roughOptions.fill` / `fillColor` / `bgColor` / `checkedColor` as appropriate.

---

## 5. Typography and layout

`app/layout.tsx` loads Google fonts into CSS variables; `app/globals.css` registers them as Tailwind v4 `@theme` tokens. The utility class names used throughout the codebase are **`font-family-*`**, not `font-*`:

- `font-family-hand` → Patrick Hand (headings, buttons, labels)
- `font-family-gaegu` → Gaegu (body copy, tooltips, tables, day cells)
- `font-family-lacquer` / `font-family-indie` / `font-family-shantell` → available for display flair
- `font-sans` → Nunito (root default); `font-mono` → Geist Mono (inline code)

```tsx
<SectionTitle variant="yellow" icon={<Star />} subtitle="Subtitle here">
  My heading
</SectionTitle>
<p className="font-family-gaegu text-lg text-black/70">Body copy</p>
```

Layout conventions:
- Container components measure their wrapper with `getBoundingClientRect()` and draw an absolutely-positioned SVG; content sits in a `relative z-10` div with numeric `padding`. Give them a non-zero height (set `height`, `minHeight`, or a sized `className`).
- Widths default to `100%` (Card, Paper, SketchBorder, Alert, Input, Textarea) with `number | string` props; inline badges/buttons use pixel numbers.
- `className` styles the wrapper; `contentClassName` / `textClassName` / `titleClassName` etc. style the inner content. Use `cn()` from `@/lib/utils` to merge.
- Use Tailwind breakpoints at the page level (`w-full md:w-96`); components have no built-in responsive variants.
- Tilt sparingly: most `rotate` defaults are already set (Tape `-4`, SectionTitle/Tooltip/HoverCard `-1`); ±3° is the norm.

---

## 6. Usage patterns

**Compose, don't redesign.** Combine edge treatment + variant + `roughOptions`:
```tsx
<Paper variant="cream" edgeStyle="folded-corner" foldSide="top-left" height="auto">
  <Tape variant="yellow" tapeStyle="torn" className="absolute -top-3 left-1/2" />
  <Card variant="paper" borderStyle="project-corner" height={240}>
    <h3 className="font-family-hand text-2xl font-black">Notes</h3>
  </Card>
</Paper>
```

**Controlled vs uncontrolled** (`Toggle`, `Checkbox`, `Combobox`, `Calender`):
```tsx
<Toggle defaultChecked />
<Toggle checked={on} onCheckedChange={setOn} label="Dark mode" />
<Combobox items={[{ value: "a", label: "Alpha" }]} value={v} onValueChange={setV} searchable />
<Calender value={date} onChange={setDate} minDate={new Date()} weekStartsOn={1} />
```

**Overlays** wrap the trigger as children: `<Tooltip content="..."><Button>Hi</Button></Tooltip>`; `<HoverCard content={<Card>...</Card>} placement="bottom">...</HoverCard>`.

**Backgrounds** go at page root, not nested in small sections: `<DoodleGridBackground density="medium"><main>...</main></DoodleGridBackground>`.

**Elevation rule:** no `box-shadow`. Use `dottedShadow`/`shadowOffset` (Toast), `showShadow` (HoverCard, Calender — implemented as `drop-shadow(...)` filters), translucent fills, or folded corners.

**Accessibility comes built in:** `role="switch"`/`"checkbox"`/`"combobox"`/`"alert"`/`"tooltip"`, `aria-checked`, `aria-describedby`, hidden real inputs, focus rings, keyboard navigation. Always pass `label` for Toggle/Checkbox, `alt` or `name` for Avatar, `aria-label` for icon-only triggers.

---

## 7. Adding or changing a component in this repo

1. **Component** — `components/ui/Name.tsx`. Start with `"use client"` when using hooks/RoughJS. Import `rough from "roughjs"` and `cn` from `@/lib/utils`. Export a named function. Define the props type, a variant→color map and a variant→seed map, apply `roughOptions` over defaults, and render the sketch into an `aria-hidden` SVG overlay behind `relative z-10` content. Keep APIs small and consistent with siblings.
2. **Styles** — if the component needs keyframes, add `components/ui/style/Name.css` and import it at the top of the component (see Calender.css, Loader.css).
3. **Demo** — `components/examples/Name-demo.tsx` exporting `DemoName` showing default, variants, and one customization.
4. **Register the demo** — add `"name-demo": DemoName` to the `demos` map in `components/mdx/mdx-components.tsx`; if MDX should embed the component directly, also add it to the `mdxComponents` object.
5. **Docs** — `content/docs/components/name.mdx` with frontmatter `title`, `description`, `category: Components`, `status: ready`, `order: N`; then `<ComponentPreview name="name-demo" />` and `## Code`, `## Usage`, `## Props` (table), `## Rough Options`, `## Variants` sections. The MDX renderer uses `next-mdx-remote/rsc` + `remark-gfm` and `mdxComponents` for headings/tables/code.
6. **Registry** — append `{ name, slug, description, href: "/docs/components/name", status: "ready", order }` to `lib/registry.ts` (order drives sidebar/docs sorting; `lib/docs.ts` sorts by frontmatter `order`).
7. **Verify** — `bun run lint`, `bunx tsc --noEmit`, `bun run build`.

Conventions from `CONTRIBUTING.md`: TypeScript, meaningful names, prop-based customization, prefer RoughJS, responsive behavior, no new dependencies, remove unused imports.

---

## 8. Do's and Don'ts

**Do**
- Use variant props for color; use `roughOptions` for sketch feel; use `className` for layout.
- Reuse the seeded defaults so a variant looks the same everywhere; set an explicit seed only when reproducibility matters.
- Combine treatments deliberately: `borderStyle="dashed"` + folded corner, `rotate` + `tapeStyle`.
- Give measuring containers explicit dimensions and check the result in the browser.

**Don't**
- Import the empty `*X.tsx` placeholders or empty docs/demos.
- Mix many fill styles in one component, or use a dashed border with a heavy solid stroke.
- Add CSS `box-shadow` or `filter: drop-shadow()` by hand — use built-in shadow props.
- Squash components into sizes that break their aspect (Avatar, Toggle) or invent new variant names.
- Assume `roughOptions` object identity is stable: inline objects change every render and retrigger the draw effect; hoist them if you profile a hot path.
- Forget the typo'd exports: `Seperator`, `Calender`, `Combobox`.

---

## 9. Verification checklist before shipping a SketchUI surface

1. Cycle every variant used and confirm colors match the component-specific palette above.
2. Tune `roughness` (0.5–2.5) and `fillStyle`; verify with a fixed `seed` if the design must be stable.
3. Tab through interactive components; confirm focus rings, `aria-*` attributes, and keyboard navigation.
4. Check mobile/tablet/desktop breakpoints and that measured containers have non-zero size.
5. Confirm no hand-written shadows, no new dependencies, and `bun run lint` / `bunx tsc --noEmit` pass.
