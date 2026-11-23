"use client"

import {
    useEffect,
    useRef,
    useState,
    type MouseEvent,
    type ReactNode,
} from "react"
import Link from "next/link"
import rough from "roughjs"

import { cn } from "@/lib/utils"

export type FloatingDockItem = {
    label: string
    href: string
    icon?: ReactNode
    external?: boolean
}

type FloatingDockVariant =
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

type RoughFloatingDockOptions = {
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

type FloatingDockProps = {
    items: FloatingDockItem[]
    variant?: FloatingDockVariant
    position?: "bottom" | "top"
    fixed?: boolean
    magnify?: boolean
    magnificationRadius?: number
    magnificationAmount?: number

    className?: string
    dockClassName?: string
    itemClassName?: string
    tooltipClassName?: string

    roughOptions?: RoughFloatingDockOptions
}

const colors: Record<FloatingDockVariant, string> = {
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

function roundedRectPath(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) {
    const r = Math.min(radius, width / 2, height / 2)

    return `
        M ${x + r} ${y}
        L ${x + width - r} ${y}
        Q ${x + width} ${y} ${x + width} ${y + r}
        L ${x + width} ${y + height - r}
        Q ${x + width} ${y + height} ${x + width - r} ${y + height}
        L ${x + r} ${y + height}
        Q ${x} ${y + height} ${x} ${y + height - r}
        L ${x} ${y + r}
        Q ${x} ${y} ${x + r} ${y}
        Z
    `
}

function DockItem({
    item,
    color,
    scale,
    roughOptions,
    itemClassName,
    tooltipClassName,
}: {
    item: FloatingDockItem
    color: string
    scale: number
    roughOptions?: RoughFloatingDockOptions
    itemClassName?: string
    tooltipClassName?: string
}) {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.replaceChildren()

        const rc = rough.svg(svg)
        const node = rc.circle(28, 28, 52, {
            seed: roughOptions?.seed ?? 880,
            stroke: roughOptions?.stroke ?? "#111",
            strokeWidth: roughOptions?.strokeWidth ?? 1.8,
            fill: roughOptions?.fill ?? color,
            fillStyle: roughOptions?.fillStyle ?? "solid",
            hachureGap: roughOptions?.hachureGap ?? 7,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.2,
            bowing: roughOptions?.bowing ?? 0.8,
        })

        svg.appendChild(node)
    }, [color, roughOptions])

    const content = (
        <span
            className={cn(
                "relative grid size-14 place-items-center",
                "transition-transform duration-150 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                itemClassName
            )}
            style={{
                transform: `scale(${scale})`,
                transformOrigin: "bottom center",
            }}
        >
            <svg
                ref={svgRef}
                viewBox="0 0 56 56"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
            />

            <span className="relative z-10 grid size-7 place-items-center text-black">
                {item.icon ?? (
                    <span className="font-family-hand text-sm font-black">
                        {item.label.slice(0, 1).toUpperCase()}
                    </span>
                )}
            </span>

            <span
                role="tooltip"
                className={cn(
                    "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2",
                    "whitespace-nowrap rounded-md border-2 border-black bg-[#fffbf2] px-2 py-0.5",
                    "font-family-hand text-xs font-bold opacity-0 transition-opacity duration-150",
                    "group-hover:opacity-100 group-focus-within:opacity-100",
                    tooltipClassName
                )}
            >
                {item.label}
            </span>
        </span>
    )

    if (item.external) {
        return (
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="group relative inline-flex"
            >
                {content}
            </a>
        )
    }

    return (
        <Link
            href={item.href}
            aria-label={item.label}
            className="group relative inline-flex"
        >
            {content}
        </Link>
    )
}

export function FloatingDock({
    items,
    variant = "paper",
    position = "bottom",
    fixed = true,
    magnify = true,
    magnificationRadius = 140,
    magnificationAmount = 0.45,
    className,
    dockClassName,
    itemClassName,
    tooltipClassName,
    roughOptions,
}: FloatingDockProps) {
    const dockRef = useRef<HTMLElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)
    const itemRefs = useRef<(HTMLSpanElement | null)[]>([])

    const [scales, setScales] = useState<number[]>([])

    useEffect(() => {
        const dock = dockRef.current
        const svg = svgRef.current
        if (!dock || !svg) return

        const draw = () => {
            const rect = dock.getBoundingClientRect()
            const drawWidth = rect.width - 4
            const drawHeight = rect.height - 4

            if (drawWidth <= 0 || drawHeight <= 0) return

            svg.replaceChildren()
            svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`)

            const rc = rough.svg(svg)
            const node = rc.path(
                roundedRectPath(2, 2, drawWidth, drawHeight, 28),
                {
                    seed: roughOptions?.seed ?? 890,
                    stroke: roughOptions?.stroke ?? "#111",
                    strokeWidth: roughOptions?.strokeWidth ?? 1.8,
                    fill: roughOptions?.fill ?? colors[variant],
                    fillStyle: roughOptions?.fillStyle ?? "solid",
                    hachureGap: roughOptions?.hachureGap ?? 7,
                    hachureAngle: roughOptions?.hachureAngle ?? -10,
                    roughness: roughOptions?.roughness ?? 1.2,
                    bowing: roughOptions?.bowing ?? 0.8,
                }
            )

            svg.appendChild(node)
        }

        draw()

        const observer = new ResizeObserver(draw)
        observer.observe(dock)

        return () => observer.disconnect()
    }, [variant, roughOptions])

    function handleMouseMove(event: MouseEvent<HTMLElement>) {
        if (!magnify) return

        const nextScales = itemRefs.current.map((element) => {
            if (!element) return 1

            const rect = element.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const distance = Math.abs(event.clientX - centerX)

            if (distance >= magnificationRadius) return 1

            return (
                1 +
                (1 - distance / magnificationRadius) * magnificationAmount
            )
        })

        setScales(nextScales)
    }

    function handleMouseLeave() {
        setScales([])
    }

    return (
        <div
            className={cn(
                "z-50",
                fixed
                    ? cn(
                          "fixed left-1/2 -translate-x-1/2",
                          position === "bottom" ? "bottom-6" : "top-6"
                      )
                    : "relative",
                className
            )}
        >
            <nav
                ref={dockRef}
                aria-label="Floating dock"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "relative flex items-center gap-1 rounded-[28px] px-3 py-3 max-sm:gap-0.5 max-sm:px-2",
                    dockClassName
                )}
            >
                <svg
                    ref={svgRef}
                    className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden="true"
                />

                <div className="relative z-10 flex items-center gap-1 max-sm:gap-0.5">
                    {items.map((item, index) => (
                        <span
                            key={`${item.label}-${item.href}`}
                            ref={(element) => {
                                itemRefs.current[index] = element
                            }}
                            className="inline-flex"
                        >
                            <DockItem
                                item={item}
                                color={colors[variant]}
                                scale={scales[index] ?? 1}
                                roughOptions={roughOptions}
                                itemClassName={itemClassName}
                                tooltipClassName={tooltipClassName}
                            />
                        </span>
                    ))}
                </div>
            </nav>
        </div>
    )
}
