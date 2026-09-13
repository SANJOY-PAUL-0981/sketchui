"use client"

import { useEffect, useRef, useState } from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type AlertVariant = "info" | "success" | "warning" | "error" | "note"

type AlertStyle = "filled" | "outline" | "paper"

type AlertShape = "rectangle" | "rounded-rectangle"

type AlertBorderStyle = "rough" | "dashed"

type AlertIcon = "info" | "check" | "warning" | "error" | "lightbulb" | "none"

type RoughAlertOptions = {
    seed?: number
    stroke?: string
    strokeWidth?: number
    roughness?: number
    bowing?: number
}

type AlertProps = {
    children: React.ReactNode

    title?: string

    variant?: AlertVariant
    alertStyle?: AlertStyle
    shape?: AlertShape
    borderStyle?: AlertBorderStyle
    icon?: AlertIcon

    width?: number | string
    minHeight?: number | string

    radius?: number
    padding?: number

    borderColor?: string
    fillColor?: string

    transparent?: boolean

    dismissible?: boolean
    onDismiss?: () => void

    action?: React.ReactNode

    rotate?: number

    roughOptions?: RoughAlertOptions

    className?: string
    contentClassName?: string
}

const colors: Record<AlertVariant, string> = {
    info: "#bfdbfe",
    success: "#bbf7d0",
    warning: "#fde68a",
    error: "#fecaca",
    note: "#e9d5ff",
}

const seedMap: Record<AlertVariant, number> = {
    info: 101,
    success: 202,
    warning: 303,
    error: 404,
    note: 505,
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

function AlertIconSvg({
    icon,
}: {
    icon: AlertIcon
}) {
    if (icon === "none") return null

    if (icon === "check") {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5 12.5 9.5 17 19 7" />
            </svg>
        )
    }

    if (icon === "warning") {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 3 2.5 20h19L12 3Z" />
                <path d="M12 9v5" />
                <path d="M12 17.5h.01" />
            </svg>
        )
    }

    if (icon === "error") {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                <circle cx="12" cy="12" r="9" />
                <path d="m9 9 6 6M15 9l-6 6" />
            </svg>
        )
    }

    if (icon === "lightbulb") {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M8.5 14.5C7.55 13.6 7 12.35 7 11a5 5 0 0 1 10 0c0 1.35-.55 2.6-1.5 3.5-.65.6-1 1.2-1 2.5h-5c0-1.3-.35-1.9-1-2.5Z" />
            </svg>
        )
    }

    return (
        <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 10v6" />
            <path d="M12 7h.01" />
        </svg>
    )
}

export function Alert({
    children,
    title,

    variant = "info",
    alertStyle = "filled",
    shape = "rounded-rectangle",
    borderStyle = "rough",
    icon,

    width = "100%",
    minHeight = 90,

    radius = 18,
    padding = 20,

    borderColor = "#111",
    fillColor,

    transparent = false,

    dismissible = false,
    onDismiss,

    action,

    rotate = 0,

    roughOptions,

    className,
    contentClassName,
}: AlertProps) {
    const svgRef = useRef<SVGSVGElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const [visible, setVisible] = useState(true)

    const defaultIcon: Record<AlertVariant, AlertIcon> = {
        info: "info",
        success: "check",
        warning: "warning",
        error: "error",
        note: "lightbulb",
    }

    const resolvedIcon = icon ?? defaultIcon[variant]

    useEffect(() => {
        const svg = svgRef.current
        const wrapper = wrapperRef.current

        if (!svg || !wrapper || !visible) return

        const rect = wrapper.getBoundingClientRect()

        const drawWidth = rect.width
        const drawHeight = rect.height

        if (drawWidth <= 0 || drawHeight <= 0) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const isOutline = alertStyle === "outline"
        const isPaper = alertStyle === "paper"

        const fill =
            transparent || isOutline
                ? undefined
                : fillColor ??
                (isPaper ? "#fffbf2" : colors[variant])

        const options = {
            seed: roughOptions?.seed ?? seedMap[variant],
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.8,
            fill,
            fillStyle: fill
                ? isPaper
                    ? "solid"
                    : "solid"
                : undefined,
            roughness: roughOptions?.roughness ?? 1.5,
            bowing: roughOptions?.bowing ?? 0.9,
            strokeLineDash:
                borderStyle === "dashed"
                    ? [8, 7]
                    : undefined,
        }

        const x = 5
        const y = 5
        const w = drawWidth - 10
        const h = drawHeight - 10

        let node: SVGGElement

        if (shape === "rounded-rectangle") {
            node = rc.path(
                roundedRectPath(x, y, w, h, radius),
                options
            )
        } else {
            node = rc.rectangle(x, y, w, h, options)
        }

        svg.appendChild(node)
    }, [
        visible,
        variant,
        alertStyle,
        shape,
        borderStyle,
        radius,
        borderColor,
        fillColor,
        transparent,
        roughOptions,
        children,
    ])

    if (!visible) return null

    const handleDismiss = () => {
        setVisible(false)
        onDismiss?.()
    }

    return (
        <div
            ref={wrapperRef}
            role="alert"
            className={cn(
                "relative overflow-visible",
                className
            )}
            style={{
                width,
                minHeight,
                transform: rotate
                    ? `rotate(${rotate}deg)`
                    : undefined,
            }}
        >
            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
            />

            <div
                className={cn(
                    "relative z-10 flex items-start gap-4 text-black",
                    contentClassName
                )}
                style={{
                    padding,
                }}
            >
                {resolvedIcon !== "none" && (
                    <div className="mt-0.5 shrink-0">
                        <AlertIconSvg icon={resolvedIcon} />
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    {title && (
                        <h3 className="font-bold leading-tight">
                            {title}
                        </h3>
                    )}

                    <div
                        className={cn(
                            "text-sm leading-relaxed",
                            title && "mt-1"
                        )}
                    >
                        {children}
                    </div>

                    {action && (
                        <div className="mt-3">
                            {action}
                        </div>
                    )}
                </div>

                {dismissible && (
                    <button
                        type="button"
                        onClick={handleDismiss}
                        aria-label="Dismiss alert"
                        className="shrink-0 text-xl font-bold leading-none transition-transform hover:rotate-6"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    )
}