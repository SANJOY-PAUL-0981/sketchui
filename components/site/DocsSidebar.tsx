import Link from "next/link"
import { componentRegistry } from "@/lib/registry"

const gettingStarted = [
    {
        title: "Introduction",
        href: "/docs/getting-started/introduction",
    },
    {
        title: "Installation",
        href: "/docs/getting-started/installation",
    },
    {
        title: "Contribute",
        href: "/docs/getting-started/contribute",
    },
    {
        title: "Showcase",
        href: "/docs/getting-started/showcase",
    },
]

export function DocsSidebar() {
    const components = componentRegistry
        .slice()
        .sort((a, b) => a.order - b.order)

    return (
        <div className="sticky top-8 space-y-8">
            <div>
                <h3 className="mb-3 text-sm font-family-hand font-black uppercase tracking-wide">
                    Getting Started
                </h3>

                <div className="space-y-2 font-family-gaegu">
                    {gettingStarted.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block text-sm font-bold text-black/60 transition hover:text-black"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-sm font-family-hand font-black uppercase tracking-wide">
                    Components
                </h3>

                <div className="space-y-2">
                    {components.map((component) => (
                        <Link
                            key={component.href}
                            href={component.href}
                            className="block text-sm font-family-gaegu font-bold text-black/60 transition hover:text-black"
                        >
                            {component.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}