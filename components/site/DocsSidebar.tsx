"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { componentRegistry } from "@/lib/registry"
import { Tape } from "@/components/ui/Tape"
import { Seperator } from "../ui/Separator"

const GETTING_STARTED = [
    { name: "Introduction", href: "/docs/getting-started/introduction" },
    { name: "Installation", href: "/docs/getting-started/installation" },
    { name: "Contribute", href: "/docs/getting-started/contribute" },
]

export function DocsSidebar() {
    const pathname = usePathname()

    return (
        <aside
            className={cn(
                "hidden md:flex flex-col",
                "w-56 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto scrollbar-hide",
                "border-r-2 border-dashed border-[#111]",
                "px-4 py-6 bg-[#fffbf2]"
            )}
        >
            <Link href="/" className="font-family-hand text-xl font-bold mb-7 inline-flex items-center gap-1">
                <span className="relative inline-block -rotate-1">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none">
                        <Tape
                            width={72}
                            height={50}
                            variant="yellow"
                            tapeStyle="side-torn"
                            roughOptions={{
                                fillStyle: "solid",
                                hachureGap: 4,
                                roughness: 1.8,
                            }}
                        />
                    </span>
                    <span className="relative z-0 px-2 py-0.5 font-bold">
                        Sketch
                    </span>
                </span>
                UI
            </Link>

            <NavSection title="Getting Started">
                {GETTING_STARTED.map(item => (
                    <NavItem key={item.href} href={item.href} active={pathname === item.href}>
                        {item.name}
                    </NavItem>
                ))}
            </NavSection>

            <Seperator
            variant="dashed"
            roughOptions={{
                roughness: 1,
                strokeWidth: 2,
                seed: 101,
            }}
            />

            <NavSection title="Components">
                {componentRegistry
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map(item => (
                        <NavItem
                            key={item.slug}
                            href={item.href}
                            active={pathname === item.href}
                        >
                            {item.name}
                            {item.status !== "ready" && (
                                <StatusPill status={item.status} />
                            )}
                        </NavItem>
                    ))}
            </NavSection>
        </aside>
    )
}

function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-4">
            <p className="font-family-gaegu text-[11px] font-bold uppercase tracking-widest text-black/40 mb-1.5 px-2">
                {title}
            </p>
            <div className="flex flex-col gap-0.5">{children}</div>
        </div>
    )
}

function NavItem({
    href,
    active,
    children,
}: {
    href: string
    active: boolean
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center justify-between gap-2",
                "font-family-hand text-[15px] px-2.5 py-1.5 rounded-md",
                "border border-transparent transition-all duration-100",
                "hover:bg-[#fef3c7] hover:border-[#111] hover:translate-x-0.5",
                active &&
                "bg-[#fde047] border-[#111] font-bold shadow-[2px_2px_0_#111] -rotate-[0.5deg]"
            )}
        >
            {children}
        </Link>
    )
}

function StatusPill({ status }: { status: "planned" | "experimental" }) {
    return (
        <span
            className={cn(
                "font-family-gaegu text-[10px] font-bold px-1.5 py-0.5",
                "border border-[#111] rounded ml-auto shrink-0",
                status === "planned" && "bg-[#e5e7eb] text-black/60",
                status === "experimental" && "bg-[#c084fc] text-white"
            )}
        >
            {status}
        </span>
    )
}