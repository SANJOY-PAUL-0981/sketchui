export type ComponentStatus = "ready" | "planned" | "experimental"

export type ComponentRegistryItem = {
    name: string
    slug: string
    description: string
    href: string
    status: ComponentStatus
    order: number
}

export const componentRegistry: ComponentRegistryItem[] = [
    {
        name: "Button",
        slug: "button",
        description: "A hand-drawn button with playful sketch effects.",
        href: "/docs/components/button",
        status: "ready",
        order: 1,
    },
    {
        name: "Card",
        slug: "card",
        description: "A sketchy paper card for playful interfaces.",
        href: "/docs/components/card",
        status: "ready",
        order: 2,
    },
    {
        name: "Badge",
        slug: "badge",
        description: "Small doodle-style labels for tags and statuses.",
        href: "/docs/components/badge",
        status: "ready",
        order: 3,
    },
    {
        name: "Tape",
        slug: "tape",
        description: "A torn tape component for stuck-paper effects.",
        href: "/docs/components/tape",
        status: "ready",
        order: 4,
    },
    {
        name: "Paper",
        slug: "paper",
        description: "A paper-like wrapper for notes and content blocks.",
        href: "/docs/components/paper",
        status: "ready",
        order: 5,
    },
    {
        name: "SketchBorder",
        slug: "sketch_border",
        description: "A hand-drawn border wrapper for sketch-style layouts.",
        href: "/docs/components/sketch_border",
        status: "ready",
        order: 6,
    },
    {
        name: "Toast",
        slug: "toast",
        description: "A comic themed sketchy toast component with playful variants.",
        href: "/docs/components/toast",
        status: "ready",
        order: 7,
    },
    {
        name: "Avatar",
        slug: "avatar",
        description: "A hand-drawn sketchy themed avatar component.",
        href: "/docs/components/avatar",
        status: "ready",
        order: 8
    },
    {
        name: "Calender",
        slug: "calender",
        description: "A fun sketch theme based calender components with different layouts.",
        href: "/docs/components/calender",
        status: "ready",
        order: 9
    },
    {
        name: "HoverCard",
        slug: "hover_card",
        description: "A rough sketch styled hover card, where the card gets rendered on hover, and supports a lot of customisation.",
        href: "/docs/components/hover_card",
        status: "ready",
        order: 10
    },
    {
        name: "Loader",
        slug: "loader",
        description: "A fun loader component.",
        href: "/docs/components/loader",
        status: "ready",
        order: 11
    },
    {
        name: "SectionTitle",
        slug: "section_title",
        description: "A hand-drawn themed heading tag or title.",
        href: "/docs/components/section_title",
        status: "ready",
        order: 12
    },
    {
        name: "Separator",
        slug: "separator",
        description: "A hand-drawn separator or divider component with lots of customisation freedom.",
        href: "/docs/components/separator",
        status: "ready",
        order: 13
    },
    {
        name: "Toggle",
        slug: "toogle",
        description: "A fun sketch theme based toggle switch component.",
        href: "/docs/components/toggle",
        status: "ready",
        order: 14
    },
    {
        name: "Tooltip",
        slug: "tooltip",
        description: "A hand-drawn tooltip component.",
        href: "/docs/components/tooltip",
        status: "ready",
        order: 15
    },
    {
        name: "Combobox",
        slug: "combobox",
        description: "A hand-drawn combobox component.",
        href: "/docs/components/combobox",
        status: "ready",
        order: 16
    },
    {
        name: "Checkbox",
        slug: "checkbox",
        description: "A hand-drawn checkbox component.",
        href: "/docs/components/checkbox",
        status: "ready",
        order: 17
    },
    {
        name: "DoodleGridBackground",
        slug: "doodle_grid_background",
        description: "A doodle grid paper themed window background.",
        href: "/docs/components/doodle_grid_background",
        status: "ready",
        order: 18
    },
    {
        name: "NotebookBackground",
        slug: "notebook_background",
        description: "A ruled notebook themed window backkground.",
        href: "/docs/components/notebook_background",
        status: "ready",
        order: 19
    },

]