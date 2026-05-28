import { DemoBadge } from "@/components/examples/Badge-demo"
import { DemoButton } from "@/components/examples/Button-demo"
import { DemoCard } from "@/components/examples/Card-demo"
import { DemoTape } from "../examples/Tape-demo"
import { DemoPaper } from "../examples/Paper-demo"
import { DemoSketchBorder } from "../examples/SketchBorder-demo"
import { DemoToast } from "../examples/Toast-demo"
import { DemoAvatar } from "../examples/Avatar-demo"
import { DemoCalender } from "../examples/Calender-demo"
import { DemoHoverCard } from "../examples/HoverCard-demo"
import { DemoLoader } from "../examples/Loader-demo"
import { DemoSectionTitle } from "../examples/SectionTitle-demo"
import { DemoSeparator } from "../examples/Separator-demo"
import { DemoToggle } from "../examples/Toggle-demo"
import { DemoTooltip } from "../examples/Tooltip-demo"

import { Avatar } from "../ui/Avatar"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { Calender } from "../ui/Calender"
import { Card } from "../ui/Card"
import { HoverCard } from "../ui/HoverCard"
import { Loader } from "../ui/Loader"
import { Paper } from "../ui/Paper"
import { SectionTitle } from "../ui/SectionTitle"
import { SketchBorder } from "../ui/SketchBorder"
import { Tape } from "../ui/Tape"
import { Toast } from "../ui/Toast"
import { Toggle } from "../ui/Toggle"
import { Tooltip } from "../ui/Tooltip"
import { DemoDoodleGridBackground } from "../examples/DoodleGridBackground-demo"
import { DemoNotebookBackground } from "../examples/NotebookBackground-demo"

import Link from "next/link"
import { Pre } from "../site/Pre"


const demos = {
    "button-demo": DemoButton,
    "card-demo": DemoCard,
    "badge-demo": DemoBadge,
    "tape-demo": DemoTape,
    "paper-demo": DemoPaper,
    "sketch-border-demo": DemoSketchBorder,
    "toast-demo": DemoToast,
    "avatar-demo": DemoAvatar,
    "calender-demo": DemoCalender,
    "hover-card-demo": DemoHoverCard,
    "loader-demo": DemoLoader,
    "section-title-demo": DemoSectionTitle,
    "separator-demo": DemoSeparator,
    "toggle-demo": DemoToggle,
    "tooltip-demo": DemoTooltip
}

type DemoName = keyof typeof demos

export function ComponentPreview({ name }: { name: DemoName }) {
    const Demo = demos[name]

    return (
        <Paper
            variant="cream"
            edgeStyle="folded-corner"
            foldSide="top-left"
            height="auto"
            className="my-6"
            contentClassName="min-h-[260px] flex items-center justify-center"
            roughOptions={{
                roughness: 1.5
            }}
        >
            <Demo />
        </Paper>
    )
}

export const mdxComponents = {
    ComponentPreview,
    Avatar,
    Badge,
    Button,
    Calender,
    Card,
    HoverCard,
    Loader,
    Paper,
    SectionTitle,
    SketchBorder,
    Tape,
    Toast,
    Toggle,
    Tooltip,
    DemoDoodleGridBackground,
    DemoNotebookBackground,
    Link,
    pre: async ({ children }: any) => {
        const code = children.props.children

        const language =
            children.props.className?.replace("language-", "") ??
            "tsx"

        return (
            <Pre
                code={code}
                language={language}
            />
        )
    },
    h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="mt-8 text-3xl font-bold font-family-hand pb-4">{children}</h2>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="my-4 ml-6 list-disc space-y-1 font-family-gaegu">{children}</ul>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className="pl-1 font-family-gaegu">{children}</li>
    ),
    table: ({ children }: { children: React.ReactNode }) => (
        <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse font-family-gaegu text-[15px]">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
        <thead className="border-b-2 border-dashed border-current">
            {children}
        </thead>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
        <th className="px-4 py-2 text-left font-bold font-family-hand text-lg">
            {children}
        </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
        <td className="px-4 py-2 border-b border-dashed border-current/20">
            {children}
        </td>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
        <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            {children}
        </tr>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
        <code className="font-family-mono text-[13px] px-2 py-0.5 rounded-md bg-amber-100 text-black/80 border border-amber-300">
            {children}
        </code>
    ),
}