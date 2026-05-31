# Contributing to SketchUi

Thank you for your interest in contributing to SketchUi!

SketchUi is an open-source React component library focused on hand-drawn, sketch-style UI components powered by Rough.js. Whether you're fixing bugs, improving documentation, adding new components, or suggesting ideas, your contributions are welcome.

## Getting Started

### 1. Fork the Repository

Create your own fork of the project and clone it locally.

```bash
git clone https://github.com/YOUR_USERNAME/sketchui.git
cd sketchui
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Start Development Server

```bash
bun run dev
```

The project should now be running locally.

---

## Project Structure

```txt
app/
components/
content/
public/
lib/
```

### Important Directories

* `components/ui` → Core SketchUi components
* `components/examples` → Component demos
* `content/docs` → Documentation pages
* `public/doodles` → Doodle assets and illustrations
* `lib` → Utilities and helpers

---

## Contribution Guidelines

### Components

When creating a new component:

* Use TypeScript.
* Follow existing component patterns.
* Support customization through props.
* Keep APIs simple and consistent.
* Prefer Rough.js rendering where applicable.
* Include responsive behavior.
* Avoid introducing unnecessary dependencies.

### Documentation

Every new component should include:

* Description
* Installation instructions
* Usage example
* Props table
* Demo preview

Documentation files belong inside:

```txt
content/docs/components/
```

### Examples

Component demos belong inside:

```txt
components/examples/
```

Try to showcase:

* Default usage
* Common variants
* Customization examples

---

## Code Style

### Naming

Components:

```tsx
Button.tsx
Card.tsx
HoverCard.tsx
```

Examples:

```tsx
Button-demo.tsx
Card-demo.tsx
```

### General Rules

* Use meaningful names.
* Keep components focused.
* Avoid unnecessary complexity.
* Prefer reusable logic.
* Remove unused imports.

---

## Pull Requests

Before opening a PR:

### Checklist

* [ ] Code builds successfully
* [ ] No TypeScript errors
* [ ] Documentation updated if needed
* [ ] Examples added if applicable
* [ ] Existing functionality remains unaffected

### PR Title Examples

```txt
feat: add Timeline component
fix: resolve Tooltip positioning issue
docs: improve Button documentation
refactor: simplify SketchBorder rendering
```

---

## Reporting Bugs

When reporting a bug, please include:

* SketchUi version
* Browser
* Operating system
* Reproduction steps
* Expected behavior
* Actual behavior
* Screenshots (if relevant)

---

## Feature Requests

Feature requests are welcome.

Please describe:

* The problem you're trying to solve
* Proposed solution
* Possible API design
* Example use cases

---

## Development Philosophy

SketchUi aims to be:

* Fun
* Creative
* Lightweight
* Accessible
* Highly customizable
* Developer-friendly

When contributing, try to preserve these principles.

---

## License

By contributing to SketchUi, you agree that your contributions will be licensed under the MIT License.

---

Happy building! 