"use client"

import { useEffect, useRef } from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type BadgeShape = "rectangle" | "rounded-rectangle" | "ellipse" | "circle"

type BadgeVariant = "yellow" | "purple" | "green" | "pink" | "blue" | "gray" | "silver" | "red" | "orange" | "sky"

type RoughBadgeOptions = {
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

type BadgeProps = {
    children: React.ReactNode
    width?: number
    height?: number
    x?: number
    y?: number
    fontSize?: number
    paddingX?: number
    fontWeight?: "normal" | "medium" | "semibold" | "bold"
    shape?: BadgeShape
    variant?: BadgeVariant
    borderColor?: string
    fillColor?: string
    transparent?: boolean
    roughOptions?: RoughBadgeOptions
    radius?: number
    className?: string
    textClassName?: string
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

const colors: Record<BadgeVariant, string> = {
    yellow: "#F2F272",
    purple: "#d8c7ff",
    green: "#bbf7d0",
    pink: "#fbcfe8",
    blue: "#bfdbfe",
    gray: "#e5e7eb",
    silver: "#d1d5db",
    red: "#fecaca",
    orange: "#fed7aa",
    sky: "#bae6fd",
}

const seedMap: Record<BadgeVariant, number> = {
    yellow: 20,
    purple: 40,
    green: 60,
    pink: 80,
    blue: 100,
    gray: 120,
    silver: 140,
    red: 160,
    orange: 180,
    sky: 200,
}

export function Badge({
    children,
    width = 120,
    height = 38,
    x = 4,
    y = 4,
    fontSize = 14,
    paddingX = 12,
    fontWeight = "semibold",
    shape = "rectangle",
    variant = "yellow",
    borderColor = "#111",
    fillColor,
    transparent = false,
    roughOptions,
    radius = 12,
    className,
    textClassName,
}: BadgeProps) {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const commonOptions = {
            seed: roughOptions?.seed ?? seedMap[variant],
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.4,
            fill: transparent ? undefined : roughOptions?.fill ?? fillColor ?? colors[variant],
            fillStyle: transparent ? undefined : roughOptions?.fillStyle ?? "hachure",
            hachureGap: roughOptions?.hachureGap ?? 5,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.2,
            bowing: roughOptions?.bowing ?? 0.7,
        }

        let shapeNode

        if (shape === "ellipse") {
            shapeNode = rc.ellipse(
                x + width / 2,
                y + height / 2,
                width,
                height,
                commonOptions
            )
        } else if (shape === "circle") {
            const size = Math.min(width, height)

            shapeNode = rc.circle(
                x + width / 2,
                y + height / 2,
                size,
                commonOptions
            )
        } else if (shape === "rounded-rectangle") {
            shapeNode = rc.path(
                roundedRectPath(x, y, width, height, radius),
                commonOptions
            )
        } else {
            shapeNode = rc.rectangle(x, y, width, height, commonOptions)
        }

        svg.appendChild(shapeNode)
    }, [
        x,
        y,
        width,
        height,
        shape,
        variant,
        borderColor,
        fillColor,
        transparent,
        roughOptions,
        radius,
    ])

    return (
        <span
            className={cn("relative inline-flex items-center justify-center", className)}
            style={{
                width: width + x * 2,
                height: height + y * 2,
            }}
        >
            <svg
                ref={svgRef}
                viewBox={`0 0 ${width + x * 2} ${height + y * 2}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            />

            <span
                className={cn(
                    "relative z-10 px-3 text-sm font-semibold text-black flex h-full w-full items-center justify-center",
                    textClassName
                )}
                style={{
                    fontSize,
                    paddingLeft: paddingX,
                    paddingRight: paddingX,
                    fontWeight,
                }}
            >
                {children}
            </span>
        </span>
    )
}