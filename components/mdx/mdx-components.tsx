import { DemoBadge } from "@/components/examples/Badge-demo"
import { DemoButton } from "@/components/examples/Button-demo"
import { DemoCard } from "@/components/examples/Card-demo"

const demos = {
    "button-demo": DemoButton,
    "card-demo": DemoCard,
    "badge-demo": DemoBadge,
}

type DemoName = keyof typeof demos

export function ComponentPreview({ name }: { name: DemoName }) {
    const Demo = demos[name]

    return (
        <div className="my-6 rounded-2xl border-2 border-black bg-[#fffbf2] p-6 shadow-[5px_5px_0_#111]">
            <Demo />
        </div>
    )
}

export const mdxComponents = {
    ComponentPreview,
    h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="mt-8 text-2xl font-bold">{children}</h2>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="my-4 ml-6 list-disc space-y-1">{children}</ul>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className="pl-1">{children}</li>
    ),
}