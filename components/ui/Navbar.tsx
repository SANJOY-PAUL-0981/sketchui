"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card } from "./Card"
import { Seperator } from "./Separator"

export type NavbarItem = {
    label: string
    href: string
    icon?: ReactNode
    external?: boolean
}

type NavbarVariant =
    | "paper"
    | "white"
    | "yellow"
    | "purple"
    | "green"
    | "pink"
    | "blue"
    | "gray"
    | "orange"
    | "red"
    | "sky"

type RoughNavbarOptions = {
    seed?: number
    stroke?: string
    strokeWidth?: number
    fill?: string
    fillStyle?: "solid" | "hachure" | "zigzag" | "cross-hatch" | "dots" | "dashed" | "zigzag-line"
    hachureGap?: number
    hachureAngle?: number
    roughness?: number
    bowing?: number
}

type NavbarProps = {
    items: NavbarItem[]
    logo?: ReactNode
    action?: ReactNode
    variant?: NavbarVariant

    sticky?: boolean
    showBottomLine?: boolean
    showMobileMenu?: boolean

    className?: string
    navClassName?: string
    linkClassName?: string
    actionClassName?: string

    roughOptions?: RoughNavbarOptions
}

const colors: Record<NavbarVariant, string> = {
    paper: "#fffbf2",
    white: "#ffffff",
    yellow: "#fef3c7",
    purple: "#d8c7ff",
    green: "#bbf7d0",
    pink: "#fbcfe8",
    blue: "#bfdbfe",
    gray: "#e5e7eb",
    orange: "#fed7aa",
    red: "#fecaca",
    sky: "#bae6fd",
}

function NavbarLink({
    item,
    onNavigate,
    className,
}: {
    item: NavbarItem
    onNavigate?: () => void
    className?: string
}) {
    const content = (
        <>
            {item.icon && <span className="inline-flex shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
        </>
    )

    if (item.external) {
        return (
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className={className}
            >
                {content}
            </a>
        )
    }

    return (
        <Link href={item.href} onClick={onNavigate} className={className}>
            {content}
        </Link>
    )
}

export function Navbar({
    items,
    logo,
    action,
    variant = "paper",
    sticky = true,
    showBottomLine = true,
    showMobileMenu = true,
    className,
    navClassName,
    linkClassName,
    actionClassName,
    roughOptions,
}: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)

    const linkClasses = cn(
        "inline-flex items-center gap-2 font-family-hand text-lg font-bold text-black",
        "transition-transform duration-150 hover:-rotate-2 hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black",
        linkClassName
    )

    return (
        <header
            className={cn(
                "z-50 w-full px-6 py-4 font-family-hand max-md:px-4 max-md:py-3",
                sticky ? "sticky top-0" : "relative",
                className
            )}
            style={{ backgroundColor: colors[variant] }}
        >
            <nav
                aria-label="Main navigation"
                className={cn(
                    "mx-auto flex max-w-7xl items-center justify-between gap-4",
                    navClassName
                )}
            >
                {logo ?? (
                    <Link
                        href="/"
                        className="font-family-hand text-xl font-black text-black"
                    >
                        SketchUI
                    </Link>
                )}

                <div className="hidden items-center gap-8 max-lg:gap-5 max-md:hidden">
                    {items.map((item) => (
                        <NavbarLink
                            key={`${item.label}-${item.href}`}
                            item={item}
                            className={linkClasses}
                        />
                    ))}

                    {action && <div className={actionClassName}>{action}</div>}
                </div>

                {showMobileMenu && (
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        className={cn(
                            "inline-flex rounded-lg border-2 border-black bg-white/70 p-2 text-black",
                            "outline-none transition-transform active:scale-95",
                            "focus-visible:ring-2 focus-visible:ring-black",
                            "max-md:inline-flex md:hidden"
                        )}
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                )}
            </nav>

            {showMobileMenu && isOpen && (
                <Card
                    variant={variant === "white" ? "paper" : variant}
                    height="auto"
                    className="mt-4 md:hidden"
                    roughOptions={roughOptions}
                >
                    <div className="grid gap-3">
                        {items.map((item) => (
                            <NavbarLink
                                key={`${item.label}-${item.href}`}
                                item={item}
                                onNavigate={() => setIsOpen(false)}
                                className={cn(
                                    linkClasses,
                                    "w-full justify-center rounded-lg border-2 border-black bg-white/60 px-4 py-3"
                                )}
                            />
                        ))}

                        {action && (
                            <div className={cn("mt-1", actionClassName)}>
                                {action}
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {showBottomLine && (
                <Seperator
                    variant="wavy"
                    length="100%"
                    thickness={16}
                    color="#111"
                    className="absolute bottom-0 left-0 translate-y-1/2"
                    roughOptions={roughOptions}
                />
            )}
        </header>
    )
}
