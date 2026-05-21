"use client"

import { useEffect, useRef } from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type TapeVariant = "yellow" | "pink" | "green" | "blue" | "purple" | "orange" | "gray"

type TapeStyle = "smooth" | "torn" | "side-torn"

type RoughTapeOptions = {
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

type TapeProps = {
    width?: number
    height?: number

    variant?: TapeVariant
    tapeStyle?: TapeStyle

    rotate?: number
    opacity?: number

    roughOptions?: RoughTapeOptions
    className?: string
}

const colors: Record<TapeVariant, string> = {
    yellow: "#fde047",
    pink: "#f9a8d4",
    green: "#86efac",
    blue: "#93c5fd",
    purple: "#c084fc",
    orange: "#fdba74",
    gray: "#d1d5db",
}

const seedMap: Record<TapeVariant, number> = {
    yellow: 20,
    pink: 40,
    green: 60,
    blue: 80,
    purple: 100,
    orange: 120,
    gray: 140,
}

function smoothTapePath(x: number, y: number, width: number, height: number) {
    return `
    M ${x} ${y}
    L ${x + width} ${y}
    L ${x + width} ${y + height}
    L ${x} ${y + height}
    Z
  `
}

function tornTapePath(x: number, y: number, width: number, height: number) {
    return `
    M ${x} ${y + 2}
    L ${x + width * 0.12} ${y}
    L ${x + width * 0.24} ${y + 3}
    L ${x + width * 0.36} ${y + 1}
    L ${x + width * 0.48} ${y + 4}
    L ${x + width * 0.6} ${y}
    L ${x + width * 0.72} ${y + 3}
    L ${x + width * 0.84} ${y + 1}
    L ${x + width} ${y + 3}

    L ${x + width - 2} ${y + height}
    L ${x + width * 0.86} ${y + height - 2}
    L ${x + width * 0.74} ${y + height + 2}
    L ${x + width * 0.62} ${y + height - 1}
    L ${x + width * 0.5} ${y + height + 3}
    L ${x + width * 0.38} ${y + height}
    L ${x + width * 0.26} ${y + height + 2}
    L ${x + width * 0.14} ${y + height - 2}
    L ${x} ${y + height}
    Z
  `
}

function sideTornTapePath(
    x: number,
    y: number,
    width: number,
    height: number
) {
    return `
    M ${x + 4} ${y}
    L ${x + width - 4} ${y}

    L ${x + width} ${y + height * 0.12}
    L ${x + width - 3} ${y + height * 0.24}
    L ${x + width + 2} ${y + height * 0.36}
    L ${x + width - 2} ${y + height * 0.48}
    L ${x + width + 3} ${y + height * 0.6}
    L ${x + width - 1} ${y + height * 0.72}
    L ${x + width + 2} ${y + height * 0.84}
    L ${x + width - 4} ${y + height}

    L ${x + 4} ${y + height}

    L ${x} ${y + height * 0.86}
    L ${x + 3} ${y + height * 0.72}
    L ${x - 2} ${y + height * 0.58}
    L ${x + 2} ${y + height * 0.44}
    L ${x - 3} ${y + height * 0.3}
    L ${x + 1} ${y + height * 0.16}
    Z
  `
}

export function Tape({
    width = 96,
    height = 28,

    variant = "yellow",
    tapeStyle = "smooth",

    rotate = -4,
    opacity = 0.85,

    roughOptions,
    className,
}: TapeProps) {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const padding = 6
        const drawWidth = width - padding * 2
        const drawHeight = height - padding * 2

        const path =
            tapeStyle === "torn"
                ? tornTapePath(padding, padding, drawWidth, drawHeight)
                : tapeStyle === "side-torn"
                    ? sideTornTapePath(padding, padding, drawWidth, drawHeight)
                    : smoothTapePath(padding, padding, drawWidth, drawHeight)

        const shape = rc.path(path, {
            seed: roughOptions?.seed ?? seedMap[variant],
            stroke: roughOptions?.stroke ?? "rgba(17,17,17,0.45)",
            strokeWidth: roughOptions?.strokeWidth ?? 1.2,
            fill: roughOptions?.fill ?? colors[variant],
            fillStyle: roughOptions?.fillStyle ?? "solid",
            hachureGap: roughOptions?.hachureGap ?? 6,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.4,
            bowing: roughOptions?.bowing ?? 0.8,
        })

        svg.appendChild(shape)
    }, [width, height, variant, tapeStyle, roughOptions])

    return (
        <span
            className={cn("pointer-events-none inline-block", className)}
            style={{
                width,
                height,
                transform: `rotate(${rotate}deg)`,
                opacity,
            }}
            aria-hidden="true"
        >
            <svg
                ref={svgRef}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                className="h-full w-full"
            />
        </span>
    )
}