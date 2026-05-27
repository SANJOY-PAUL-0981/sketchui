"use client"

import {
    ReactNode,
    useEffect,
    useId,
    useRef,
    useState,
} from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type HoverCardVariant = "paper" | "white" | "yellow" | "purple" | "green" | "pink" | "blue" | "gray" | "orange" | "red" | "sky"

type HoverCardPlacement = "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end"

type HoverCardShape = "rectangle" | "rounded-rectangle"
type HoverCardBorderStyle = "solid" | "dashed"

type RoughHoverCardOptions = {
    seed?: number
    stroke?: string
    strokeWidth?: number
    fill?: string
    fillStyle?: "solid" | "hachure" | "zigzag" | "cross-hatch" | "dots" | "dashed" | "zigzag-line"
    hachureGap?: number
    hachureAngle?: number
    roughness?: number
    bowing?: number
    dashLength?: number
    dashGap?: number
}

type HoverCardProps = {
    children: ReactNode
    content: ReactNode
    variant?: HoverCardVariant
    placement?: HoverCardPlacement
    shape?: HoverCardShape
    borderStyle?: HoverCardBorderStyle
    borderColor?: string
    fillColor?: string
    textColor?: string
    shadowColor?: string
    width?: number | string
    minWidth?: number | string
    maxWidth?: number | string
    padding?: number
    radius?: number
    offset?: number
    openDelay?: number
    closeDelay?: number
    disabled?: boolean
    showShadow?: boolean
    showArrow?: boolean
    arrowSize?: number
    rotate?: number
    activeRotate?: number
    activeScale?: number
    roughOptions?: RoughHoverCardOptions
    className?: string
    triggerClassName?: string
    contentClassName?: string
}

const colors: Record<HoverCardVariant, string> = {
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

const seedMap: Record<HoverCardVariant, number> = {
    paper: 501,
    white: 502,
    yellow: 503,
    purple: 504,
    green: 505,
    pink: 506,
    blue: 507,
    gray: 508,
    orange: 509,
    red: 510,
    sky: 511,
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

function getPlacementStyle(
    placement: HoverCardPlacement,
    offset: number
): {
    className: string
    transform: string
    origin: string
} {
    if (placement === "top") {
        return {
            className: "left-1/2 bottom-full",
            transform: `translateX(-50%) translateY(-${offset}px)`,
            origin: "origin-bottom",
        }
    }

    if (placement === "bottom") {
        return {
            className: "left-1/2 top-full",
            transform: `translateX(-50%) translateY(${offset}px)`,
            origin: "origin-top",
        }
    }

    if (placement === "left") {
        return {
            className: "right-full top-1/2",
            transform: `translateX(-${offset}px) translateY(-50%)`,
            origin: "origin-right",
        }
    }

    if (placement === "right") {
        return {
            className: "left-full top-1/2",
            transform: `translateX(${offset}px) translateY(-50%)`,
            origin: "origin-left",
        }
    }

    if (placement === "top-start") {
        return {
            className: "left-0 bottom-full",
            transform: `translateY(-${offset}px)`,
            origin: "origin-bottom-left",
        }
    }

    if (placement === "top-end") {
        return {
            className: "right-0 bottom-full",
            transform: `translateY(-${offset}px)`,
            origin: "origin-bottom-right",
        }
    }

    if (placement === "bottom-start") {
        return {
            className: "left-0 top-full",
            transform: `translateY(${offset}px)`,
            origin: "origin-top-left",
        }
    }

    return {
        className: "right-0 top-full",
        transform: `translateY(${offset}px)`,
        origin: "origin-top-right",
    }
}

function getArrowClasses(placement: HoverCardPlacement) {
    if (placement.startsWith("top")) {
        return "left-1/2 top-full -translate-x-1/2 -translate-y-[2px] rotate-45"
    }

    if (placement.startsWith("bottom")) {
        return "left-1/2 bottom-full -translate-x-1/2 translate-y-[2px] rotate-45"
    }

    if (placement === "left") {
        return "left-full top-1/2 -translate-x-[2px] -translate-y-1/2 rotate-45"
    }

    return "right-full top-1/2 translate-x-[2px] -translate-y-1/2 rotate-45"
}

export function HoverCard({
    children,
    content,

    variant = "paper",
    placement = "top",
    shape = "rounded-rectangle",
    borderStyle = "solid",

    borderColor = "#111",
    fillColor,
    textColor = "#111",
    shadowColor = "#111",

    width = 280,
    minWidth,
    maxWidth = 340,

    padding = 18,
    radius = 18,
    offset = 12,

    openDelay = 120,
    closeDelay = 120,
    disabled = false,

    showShadow = true,
    showArrow = false,
    arrowSize = 12,

    rotate = -1,
    activeRotate = 0,
    activeScale = 1,

    roughOptions,

    className,
    triggerClassName,
    contentClassName,
}: HoverCardProps) {
    const id = useId()

    const svgRef = useRef<SVGSVGElement | null>(null)
    const cardRef = useRef<HTMLDivElement | null>(null)

    const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [mounted, setMounted] = useState(false)
    const [open, setOpen] = useState(false)

    const finalFill = fillColor ?? colors[variant]
    const placementData = getPlacementStyle(placement, offset)

    function clearTimers() {
        if (openTimerRef.current) clearTimeout(openTimerRef.current)
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }

    function showCard() {
        if (disabled) return

        clearTimers()

        openTimerRef.current = setTimeout(() => {
            setMounted(true)
            requestAnimationFrame(() => setOpen(true))
        }, openDelay)
    }

    function hideCard() {
        clearTimers()

        closeTimerRef.current = setTimeout(() => {
            setOpen(false)

            closeTimerRef.current = setTimeout(() => {
                setMounted(false)
            }, 170)
        }, closeDelay)
    }

    useEffect(() => {
        return clearTimers
    }, [])

    useEffect(() => {
        const svg = svgRef.current
        const card = cardRef.current

        if (!svg || !card || !mounted) return

        svg.replaceChildren()

        const rect = card.getBoundingClientRect()

        const x = 5
        const y = 5
        const drawWidth = rect.width - x * 2
        const drawHeight = rect.height - y * 2

        if (drawWidth <= 0 || drawHeight <= 0) return

        const rc = rough.svg(svg)

        const options = {
            seed: roughOptions?.seed ?? seedMap[variant],
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.8,
            fill: roughOptions?.fill ?? finalFill,
            fillStyle: roughOptions?.fillStyle ?? "solid",
            hachureGap: roughOptions?.hachureGap ?? 8,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.35,
            bowing: roughOptions?.bowing ?? 0.8,
            strokeLineDash:
                borderStyle === "dashed"
                    ? [
                        roughOptions?.dashLength ?? 10,
                        roughOptions?.dashGap ?? 8,
                    ]
                    : undefined,
        }

        const node =
            shape === "rounded-rectangle"
                ? rc.path(
                    roundedRectPath(x, y, drawWidth, drawHeight, radius),
                    options
                )
                : rc.rectangle(x, y, drawWidth, drawHeight, options)

        svg.appendChild(node)
    }, [
        mounted,
        open,
        content,
        variant,
        shape,
        borderStyle,
        borderColor,
        finalFill,
        radius,
        roughOptions,
    ])

    return (
        <span
            className={cn("relative inline-flex", className)}
            onMouseEnter={showCard}
            onMouseLeave={hideCard}
            onFocus={showCard}
            onBlur={hideCard}
        >
            <span
                tabIndex={0}
                aria-describedby={mounted ? id : undefined}
                className={cn("inline-flex outline-none", triggerClassName)}
            >
                {children}
            </span>

            {mounted && (
                <div
                    id={id}
                    role="tooltip"
                    ref={cardRef}
                    className={cn(
                        "absolute z-50 pointer-events-none",
                        placementData.className,
                        placementData.origin,
                        "transition-[opacity,transform] duration-200 ease-out",
                        open ? "opacity-100" : "opacity-0",
                        contentClassName
                    )}
                    style={{
                        width,
                        minWidth,
                        maxWidth,
                        transform: `${placementData.transform} rotate(${open ? activeRotate : rotate
                            }deg) scale(${open ? activeScale : 0.96})`,
                        filter: showShadow
                            ? `drop-shadow(6px 6px 0 ${shadowColor})`
                            : undefined,
                    }}
                >
                    <svg
                        ref={svgRef}
                        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                        aria-hidden="true"
                    />

                    {showArrow && (
                        <span
                            className={cn(
                                "absolute z-0 border-2",
                                getArrowClasses(placement)
                            )}
                            style={{
                                width: arrowSize,
                                height: arrowSize,
                                backgroundColor: finalFill,
                                borderColor,
                            }}
                        />
                    )}

                    <div
                        className="relative z-10 font-family-gaegu text-sm font-bold leading-relaxed"
                        style={{
                            color: textColor,
                            padding,
                        }}
                    >
                        {content}
                    </div>
                </div>
            )}
        </span>
    )
}