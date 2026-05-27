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

type TooltipVariant = "paper" | "white" | "yellow" | "purple" | "green" | "pink" | "blue" | "gray" | "orange" | "red" | "sky"

type TooltipPlacement = "top" | "bottom" | "left" | "right"
type TooltipShape = "rectangle" | "rounded-rectangle"
type TooltipBorderStyle = "solid" | "dashed"

type RoughTooltipOptions = {
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

type TooltipProps = {
    children: ReactNode
    content: ReactNode

    variant?: TooltipVariant
    placement?: TooltipPlacement
    shape?: TooltipShape
    borderStyle?: TooltipBorderStyle

    borderColor?: string
    fillColor?: string
    textColor?: string

    width?: number | string
    minWidth?: number | string
    maxWidth?: number | string

    paddingX?: number
    paddingY?: number
    radius?: number
    offset?: number

    delay?: number
    disabled?: boolean

    /**
     * Keep false by default because arrow can make sketch tooltip messy.
     */
    showArrow?: boolean
    arrowSize?: number

    rotate?: number
    activeRotate?: number
    activeScale?: number

    roughOptions?: RoughTooltipOptions

    className?: string
    triggerClassName?: string
    contentClassName?: string
}

const colors: Record<TooltipVariant, string> = {
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

const seedMap: Record<TooltipVariant, number> = {
    paper: 401,
    white: 402,
    yellow: 403,
    purple: 404,
    green: 405,
    pink: 406,
    blue: 407,
    gray: 408,
    orange: 409,
    red: 410,
    sky: 411,
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

function getPlacementClasses(placement: TooltipPlacement, offset: number) {
    if (placement === "top") {
        return {
            position: "left-1/2 bottom-full",
            transform: `translateX(-50%) translateY(-${offset}px)`,
            origin: "origin-bottom",
        }
    }

    if (placement === "bottom") {
        return {
            position: "left-1/2 top-full",
            transform: `translateX(-50%) translateY(${offset}px)`,
            origin: "origin-top",
        }
    }

    if (placement === "left") {
        return {
            position: "right-full top-1/2",
            transform: `translateX(-${offset}px) translateY(-50%)`,
            origin: "origin-right",
        }
    }

    return {
        position: "left-full top-1/2",
        transform: `translateX(${offset}px) translateY(-50%)`,
        origin: "origin-left",
    }
}

function getArrowClasses(placement: TooltipPlacement) {
    if (placement === "top") {
        return "left-1/2 top-full -translate-x-1/2 -translate-y-[2px] rotate-45"
    }

    if (placement === "bottom") {
        return "left-1/2 bottom-full -translate-x-1/2 translate-y-[2px] rotate-45"
    }

    if (placement === "left") {
        return "left-full top-1/2 -translate-x-[2px] -translate-y-1/2 rotate-45"
    }

    return "right-full top-1/2 translate-x-[2px] -translate-y-1/2 rotate-45"
}

export function Tooltip({
    children,
    content,

    variant = "paper",
    placement = "top",
    shape = "rounded-rectangle",
    borderStyle = "solid",

    borderColor = "#111",
    fillColor,
    textColor = "#111",

    width = "max-content",
    minWidth,
    maxWidth = 260,

    paddingX = 14,
    paddingY = 10,
    radius = 14,
    offset = 10,

    delay = 120,
    disabled = false,

    showArrow = false,
    arrowSize = 10,

    rotate = -1,
    activeRotate = 0,
    activeScale = 1,

    roughOptions,

    className,
    triggerClassName,
    contentClassName,
}: TooltipProps) {
    const id = useId()
    const svgRef = useRef<SVGSVGElement | null>(null)
    const tooltipRef = useRef<HTMLDivElement | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    const finalFill = fillColor ?? colors[variant]
    const placementData = getPlacementClasses(placement, offset)

    function showTooltip() {
        if (disabled) return

        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            setMounted(true)
            requestAnimationFrame(() => setOpen(true))
        }, delay)
    }

    function hideTooltip() {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        setOpen(false)

        timerRef.current = setTimeout(() => {
            setMounted(false)
        }, 160)
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    useEffect(() => {
        const svg = svgRef.current
        const tooltip = tooltipRef.current

        if (!svg || !tooltip || !mounted) return

        svg.replaceChildren()

        const rect = tooltip.getBoundingClientRect()
        const rc = rough.svg(svg)

        const x = 4
        const y = 4
        const drawWidth = rect.width - x * 2
        const drawHeight = rect.height - y * 2

        if (drawWidth <= 0 || drawHeight <= 0) return

        const options = {
            seed: roughOptions?.seed ?? seedMap[variant],
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.7,
            fill: roughOptions?.fill ?? finalFill,
            fillStyle: roughOptions?.fillStyle ?? "solid",
            hachureGap: roughOptions?.hachureGap ?? 8,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.35,
            bowing: roughOptions?.bowing ?? 0.8,
            strokeLineDash:
                borderStyle === "dashed"
                    ? [
                        roughOptions?.dashLength ?? 9,
                        roughOptions?.dashGap ?? 7,
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
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
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
                    ref={tooltipRef}
                    className={cn(
                        "pointer-events-none absolute z-50",
                        placementData.position,
                        placementData.origin,
                        "transition-[opacity,transform] duration-150 ease-out",
                        open ? "opacity-100" : "opacity-0",
                        contentClassName
                    )}
                    style={{
                        width,
                        minWidth,
                        maxWidth,
                        transform: `${placementData.transform} rotate(${open ? activeRotate : rotate
                            }deg) scale(${open ? activeScale : 0.96})`,
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
                        className="relative z-10 font-family-gaegu text-sm font-black leading-snug"
                        style={{
                            color: textColor,
                            paddingLeft: paddingX,
                            paddingRight: paddingX,
                            paddingTop: paddingY,
                            paddingBottom: paddingY,
                        }}
                    >
                        {content}
                    </div>
                </div>
            )}
        </span>
    )
}