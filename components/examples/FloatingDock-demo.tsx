import { BookOpen, Code2, Home, Layers, Mail, Settings } from "lucide-react"

import {
    FloatingDock,
    type FloatingDockItem,
} from "@/components/ui/FloatingDock"

const items: FloatingDockItem[] = [
    { label: "Home", href: "/", icon: <Home size={22} /> },
    {
        label: "Docs",
        href: "/docs/getting-started/introduction",
        icon: <BookOpen size={22} />,
    },
    {
        label: "Components",
        href: "/docs/components/button",
        icon: <Layers size={22} />,
    },
    {
        label: "Contact",
        href: "mailto:hello@example.com",
        icon: <Mail size={22} />,
        external: true,
    },
    {
        label: "Settings",
        href: "/docs/getting-started/contribute",
        icon: <Settings size={22} />,
    },
]

export function DemoFloatingDock() {
    return (
        <div className="flex w-full flex-col items-center gap-12">
            <div className="flex flex-col items-center">
                <p className="mb-4 font-family-hand text-lg font-bold">
                    Classic yellow dock
                </p>
                <FloatingDock items={items} variant="yellow" fixed={false} />
            </div>

            <div className="flex flex-col items-center">
                <p className="mb-4 font-family-hand text-lg font-bold">
                    Hachure pink dock, no magnification
                </p>
                <FloatingDock
                    items={items.slice(0, 4)}
                    variant="pink"
                    fixed={false}
                    magnify={false}
                    roughOptions={{
                        fillStyle: "hachure",
                        hachureGap: 4,
                        roughness: 1.7,
                    }}
                />
            </div>

            <div className="flex flex-col items-center">
                <p className="mb-4 font-family-hand text-lg font-bold">
                    Compact blue dock, stronger magnify
                </p>
                <FloatingDock
                    items={[
                        ...items.slice(0, 3),
                        {
                            label: "Source",
                            href: "https://github.com/SANJOY-PAUL-0981/sketchui",
                            icon: <Code2 size={22} />,
                            external: true,
                        },
                    ]}
                    variant="blue"
                    fixed={false}
                    magnificationRadius={100}
                    magnificationAmount={0.8}
                    itemClassName="size-12"
                />
            </div>
        </div>
    )
}
