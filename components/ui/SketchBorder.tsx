"use client"

import { useEffect, useRef } from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type SketchBorderShape = "rectangle" | "rounded-rectangle" | "circle" | "ellipse"

type SketchBorderStyle = "solid" | "dashed"

type RoughBorderOptions = {
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

type SketchBorderProps = {
    children?: React.ReactNode
    width?: number | string
    height?: number | string
    minHeight?: number | string
    x?: number
    y?: number
    shape?: SketchBorderShape
    borderStyle?: SketchBorderStyle
    radius?: number
    borderColor?: string
    fillColor?: string
    transparent?: boolean
    padding?: number
    rotate?: number
    roughOptions?: RoughBorderOptions
    className?: string
    contentClassName?: string
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

export function SketchBorder({
    children,
    width = "100%",
    height,
    minHeight = 120,
    x = 6,
    y = 6,
    shape = "rectangle",
    borderStyle = "solid",
    radius = 16,
    borderColor = "#111",
    fillColor = "transparent",
    transparent = true,
    padding = 16,
    rotate = 0,
    roughOptions,
    className,
    contentClassName,
}: SketchBorderProps) {
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

        const options = {
            seed: roughOptions?.seed ?? 99,
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.8,
            fill: transparent ? undefined : roughOptions?.fill ?? fillColor,
            fillStyle: transparent ? undefined : roughOptions?.fillStyle ?? "solid",
            hachureGap: roughOptions?.hachureGap ?? 7,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.6,
            bowing: roughOptions?.bowing ?? 0.9,
            strokeLineDash: borderStyle === "dashed" ? [8, 8] : undefined,
        }

        let node: SVGGElement

        if (shape === "circle") {
            const size = Math.min(drawWidth, drawHeight)
            node = rc.circle(x + drawWidth / 2, y + drawHeight / 2, size, options)
        } else if (shape === "ellipse") {
            node = rc.ellipse(
                x + drawWidth / 2,
                y + drawHeight / 2,
                drawWidth,
                drawHeight,
                options
            )
        } else if (shape === "rounded-rectangle") {
            node = rc.path(
                roundedRectPath(x, y, drawWidth, drawHeight, radius),
                options
            )
        } else {
            node = rc.rectangle(x, y, drawWidth, drawHeight, options)
        }

        svg.appendChild(node)
    }, [
        x,
        y,
        shape,
        borderStyle,
        radius,
        borderColor,
        fillColor,
        transparent,
        roughOptions,
        children,
    ])

    return (
        <div
            ref={wrapperRef}
            className={cn("relative", className)}
            style={{
                width,
                height,
                minHeight,
                transform: rotate ? `rotate(${rotate}deg)` : undefined,
            }}
        >
            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 h-full w-full"
                style={{ overflow: "visible" }}
                aria-hidden="true"
            />

            {children && (
                <div
                    className={cn("relative z-10", contentClassName)}
                    style={{ padding }}
                >
                    {children}
                </div>
            )}
        </div>
    )
}