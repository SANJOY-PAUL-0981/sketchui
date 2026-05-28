"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { componentRegistry } from "@/lib/registry"
import { Tape } from "@/components/ui/Tape"

const GETTING_STARTED = [
    { name: "Introduction", href: "/docs/getting-started/introduction" },
    { name: "Installation", href: "/docs/getting-started/installation" },
    { name: "Contribute", href: "/docs/getting-started/contribute" },
]

export function MobileDocsNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const currentPage = [
        ...GETTING_STARTED,
        ...componentRegistry.map(c => ({ name: c.name, href: c.href })),
    ].find(p => pathname === p.href)?.name ?? "Docs"

    return (
        <>
            <div className="md:hidden mb-6">
                <button
                    onClick={() => setOpen(true)}
                    className={cn(
                        "w-full flex items-center justify-between",
                        "font-family-hand text-[15px] font-bold",
                        "px-4 py-2.5 border-2 border-[#111] bg-[#fde047]",
                        "rounded-lg shadow-[3px_3px_0_#111]",
                        "transition-transform duration-150 active:translate-y-0.5 active:shadow-[1px_1px_0_#111]",
                        "-rotate-[0.3deg]"
                    )}
                >
                    <span>☰ {currentPage}</span>
                    <span className="text-black/40 text-sm font-normal font-family-gaegu">
                        Browse all ↓
                    </span>
                </button>
            </div>

            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 md:hidden",
                    "bg-[#fffbf2] border-r-2 border-dashed border-[#111]",
                    "flex flex-col py-6 px-4 overflow-y-auto",
                    "transition-transform duration-200 ease-out",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="font-family-hand text-xl font-bold inline-flex items-center gap-1"
                    >
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
                    <button
                        onClick={() => setOpen(false)}
                        className={cn(
                            "font-family-hand text-sm px-3 py-1",
                            "border-2 border-[#111] bg-white rounded-md",
                            "shadow-[2px_2px_0_#111]",
                            "transition-transform active:translate-y-0.5"
                        )}
                    >
                        ✕ Close
                    </button>
                </div>

                <NavSection title="Getting Started">
                    {GETTING_STARTED.map(item => (
                        <NavItem
                            key={item.href}
                            href={item.href}
                            active={pathname === item.href}
                            onClick={() => setOpen(false)}
                        >
                            {item.name}
                        </NavItem>
                    ))}
                </NavSection>

                <hr className="border-t-2 border-dashed border-[#111]/20 my-4" />

                <NavSection title="Components">
                    {componentRegistry
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map(item => (
                            <NavItem
                                key={item.slug}
                                href={item.href}
                                active={pathname === item.href}
                                onClick={() => setOpen(false)}
                            >
                                {item.name}
                                {item.status !== "ready" && (
                                    <StatusPill status={item.status} />
                                )}
                            </NavItem>
                        ))}
                </NavSection>
            </div>
        </>
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
    onClick,
    children,
}: {
    href: string
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "flex items-center justify-between",
                "font-family-hand text-[15px] px-2.5 py-1.5 rounded-md",
                "border border-transparent transition-all duration-100",
                "hover:bg-[#fef3c7] hover:border-[#111] hover:translate-x-0.5",
                active && "bg-[#fde047] border-[#111] font-bold shadow-[2px_2px_0_#111] -rotate-[0.5deg]"
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
                "border border-[#111] rounded ml-auto",
                status === "planned" && "bg-[#e5e7eb]",
                status === "experimental" && "bg-[#c084fc] text-white"
            )}
        >
            {status}
        </span>
    )
}