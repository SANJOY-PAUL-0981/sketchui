"use client"

import * as React from "react"

type DocsSidebarItem = {
    title: string
    href: string
    badge?: string
    disabled?: boolean
}

type DocsSidebarGroup = {
    title: string
    items: DocsSidebarItem[]
}

type DocsSidebarProps = {
    groups?: DocsSidebarGroup[]
    activeHref?: string
    title?: string
    description?: string
    className?: string
    onNavigate?: (href: string) => void
}

const defaultGroups: DocsSidebarGroup[] = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Installation", href: "/docs/installation" },
            { title: "Usage", href: "/docs/usage" },
        ],
    },
    {
        title: "Components",
        items: [
            { title: "Button", href: "/docs/components/button" },
            { title: "Card", href: "/docs/components/card" },
            { title: "Badge", href: "/docs/components/badge" },
            { title: "Tape", href: "/docs/components/tape" },
            { title: "Paper", href: "/docs/components/paper" },
            { title: "Sketch Border", href: "/docs/components/sketch-border" },
            { title: "Toast", href: "/docs/components/toast" },
            { title: "Avatar", href: "/docs/components/avatar" },
            { title: "Calendar", href: "/docs/components/calendar" },
            { title: "Hover Card", href: "/docs/components/hover-card" },
            { title: "Loader", href: "/docs/components/loader" },
            { title: "Separator", href: "/docs/components/separator" },
            { title: "Toggle", href: "/docs/components/toggle" },
            { title: "Tooltip", href: "/docs/components/tooltip" },
            { title: "Terminal", href: "/docs/components/terminal", badge: "new" },
        ],
    },
    {
        title: "Backgrounds",
        items: [
            { title: "Doodle Grid", href: "/docs/backgrounds/doodle-grid" },
            { title: "Notebook", href: "/docs/backgrounds/notebook" },
        ],
    },
]

export function DocsSidebar({
    groups = defaultGroups,
    activeHref,
    title = "SketchUI",
    description = "hand-drawn React components",
    className = "",
    onNavigate,
}: DocsSidebarProps) {
    return (
        <aside
            className={[
                "relative h-full w-full max-w-[280px]",
                "rounded-2xl border-2 border-black bg-[#fffbf2]",
                "p-4 shadow-[5px_5px_0px_#111]",
                "max-lg:max-w-full",
                className,
            ].join(" ")}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-xl border-2 border-dashed border-black/25"
            />

            <div className="relative z-10">
                <div className="mb-5 border-b-2 border-dashed border-black/25 pb-4">
                    <h2 className="text-xl font-black leading-none text-black">
                        {title}
                    </h2>
                    <p className="mt-1 text-xs font-bold text-black/55">
                        {description}
                    </p>
                </div>

                <nav className="space-y-5">
                    {groups.map((group) => (
                        <div key={group.title}>
                            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-black/45">
                                {group.title}
                            </p>

                            <ul className="space-y-1.5">
                                {group.items.map((item) => {
                                    const isActive = activeHref === item.href

                                    return (
                                        <li key={item.href}>
                                            <button
                                                type="button"
                                                disabled={item.disabled}
                                                onClick={() => {
                                                    if (item.disabled) return
                                                    onNavigate?.(item.href)
                                                }}
                                                className={[
                                                    "group relative flex w-full items-center justify-between gap-3",
                                                    "rounded-xl border-2 px-3 py-2 text-left text-sm font-black",
                                                    "transition duration-150 ease-out",
                                                    "disabled:cursor-not-allowed disabled:opacity-45",
                                                    isActive
                                                        ? "border-black bg-black text-[#fffbf2] shadow-[3px_3px_0px_#000]"
                                                        : "border-transparent text-black/75 hover:-translate-y-0.5 hover:border-black hover:bg-white hover:text-black hover:shadow-[3px_3px_0px_#111]",
                                                ].join(" ")}
                                            >
                                                <span className="truncate">
                                                    {item.title}
                                                </span>

                                                {item.badge && (
                                                    <span
                                                        className={[
                                                            "rounded-full border px-2 py-0.5 text-[10px] font-black uppercase",
                                                            isActive
                                                                ? "border-[#fffbf2] text-[#fffbf2]"
                                                                : "border-black text-black",
                                                        ].join(" ")}
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}

                                                {isActive && (
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute -left-1 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-[#fffbf2]"
                                                    />
                                                )}
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    )
}