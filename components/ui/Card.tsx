"use client"

import { useEffect, useRef } from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type CardShape = "rectangle" | "rounded-rectangle"

type CardVariant = "yellow" | "purple" | "green" | "pink" | "blue" | "gray" | "silver" | "red" | "orange" | "sky" | "paper"

type CardBorderStyle = "rough" | "dashed" | "project-corner"

type FoldSide = "top-right" | "top-left" | "bottom-right" | "bottom-left"

type RoughCardOptions = {
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

type CardProps = {
    children: React.ReactNode
    width?: number | string
    height?: number | string
    x?: number
    y?: number
    shape?: CardShape
    radius?: number
    variant?: CardVariant
    borderColor?: string
    transparent?: boolean
    roughOptions?: RoughCardOptions
    padding?: number
    className?: string
    contentClassName?: string
    borderStyle?: CardBorderStyle

    foldSide?: FoldSide
    foldSize?: number

    depth?: boolean
    depthStyle?: "solid" | "extrude"
    depthColor?: string
    depthStrokeColor?: string
    depthOffsetX?: number
    depthOffsetY?: number
}

const colors: Record<CardVariant, string> = {
    yellow: "#fde047",
    purple: "#d8c7ff",
    green: "#bbf7d0",
    pink: "#fbcfe8",
    blue: "#bfdbfe",
    gray: "#e5e7eb",
    silver: "#d1d5db",
    red: "#fecaca",
    orange: "#fed7aa",
    sky: "#bae6fd",
    paper: "#fff7df",
}

const seedMap: Record<CardVariant, number> = {
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
    paper: 220,
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

function projectCornerPath(
    x: number,
    y: number,
    width: number,
    height: number,
    corner: number,
    foldSide: FoldSide
) {
    const right = x + width
    const bottom = y + height

    switch (foldSide) {
        case "top-left":
            return `
                M ${x + corner} ${y}
                L ${right} ${y}
                L ${right} ${bottom}
                L ${x} ${bottom}
                L ${x} ${y + corner}
                Z

                M ${x + corner} ${y}
                L ${x + corner} ${y + corner}
                L ${x} ${y + corner}
            `

        case "bottom-right":
            return `
                M ${x} ${y}
                L ${right} ${y}
                L ${right} ${bottom - corner}
                L ${right - corner} ${bottom}
                L ${x} ${bottom}
                Z

                M ${right} ${bottom - corner}
                L ${right - corner} ${bottom - corner}
                L ${right - corner} ${bottom}
            `

        case "bottom-left":
            return `
                M ${x} ${y}
                L ${right} ${y}
                L ${right} ${bottom}
                L ${x + corner} ${bottom}
                L ${x} ${bottom - corner}
                Z

                M ${x} ${bottom - corner}
                L ${x + corner} ${bottom - corner}
                L ${x + corner} ${bottom}
            `

        case "top-right":
        default:
            return `
                M ${x} ${y}
                L ${right - corner} ${y}
                L ${right} ${y + corner}
                L ${right} ${bottom}
                L ${x} ${bottom}
                Z

                M ${right - corner} ${y}
                L ${right - corner} ${y + corner}
                L ${right} ${y + corner}
            `
    }
}

export function Card({
    children,
    width = "100%",
    height = 220,
    x = 6,
    y = 6,
    shape = "rounded-rectangle",
    radius = 18,
    variant = "paper",
    borderColor = "#111",
    transparent = false,
    roughOptions,
    padding = 24,
    className,
    contentClassName,
    borderStyle = "rough",
    foldSide = "top-right",
    foldSize = 22,
}: CardProps) {
    const svgRef = useRef<SVGSVGElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const svg = svgRef.current
        const wrapper = wrapperRef.current
        if (!svg || !wrapper) return

        const rect = wrapper.getBoundingClientRect()
        const drawWidth = rect.width - x * 2
        const drawHeight = rect.height - y * 2

        if (drawWidth <= 0 || drawHeight <= 0) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const commonOptions = {
            seed: roughOptions?.seed ?? seedMap[variant],
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.8,
            fill: transparent ? undefined : roughOptions?.fill ?? colors[variant],
            fillStyle: transparent ? undefined : roughOptions?.fillStyle ?? "hachure",
            hachureGap: roughOptions?.hachureGap ?? 7,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.5,
            bowing: roughOptions?.bowing ?? 0.9,
        }

        let shapeNode: SVGGElement

        if (borderStyle === "dashed") {
            shapeNode = rc.rectangle(x, y, drawWidth, drawHeight, {
                ...commonOptions,
                strokeLineDash: [8, 6],
            })
        } else if (borderStyle === "project-corner") {
            const path = projectCornerPath(
                x,
                y,
                drawWidth,
                drawHeight,
                foldSize,
                foldSide
            )

            shapeNode = rc.path(path, {
                ...commonOptions,
                fill: transparent ? undefined : roughOptions?.fill ?? colors[variant],
                fillStyle: transparent
                    ? undefined
                    : roughOptions?.fillStyle ?? "hachure",
            })
        } else {
            shapeNode =
                shape === "rounded-rectangle"
                    ? rc.path(
                        roundedRectPath(x, y, drawWidth, drawHeight, radius),
                        commonOptions
                    )
                    : rc.rectangle(x, y, drawWidth, drawHeight, commonOptions)
        }

        svg.appendChild(shapeNode)
    }, [
        x,
        y,
        shape,
        radius,
        variant,
        borderColor,
        transparent,
        roughOptions,
        children,
        borderStyle,
        foldSide,
        foldSize,
    ])

    return (
        <div
            ref={wrapperRef}
            className={cn("relative", className)}
            style={{
                width,
                height,
            }}
        >
            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
            />

            <div
                className={cn("relative z-10", contentClassName)}
                style={{ padding }}
            >
                {children}
            </div>
        </div>
    )
}