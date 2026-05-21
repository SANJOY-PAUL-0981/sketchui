"use client"

import { ReactNode, useEffect, useRef } from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type SectionTitleVariant = "yellow" | "purple" | "green" | "pink" | "blue" | "orange" | "paper"

type RoughTitleOptions = {
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

type SectionTitleProps = {
    children: ReactNode
    subtitle?: string
    icon?: ReactNode

    variant?: SectionTitleVariant
    borderColor?: string
    transparent?: boolean

    width?: number
    height?: number
    x?: number
    y?: number

    rotate?: number

    roughOptions?: RoughTitleOptions

    className?: string
    titleClassName?: string
    subtitleClassName?: string
}

const colors: Record<SectionTitleVariant, string> = {
    yellow: "#fde047",
    purple: "#d8c7ff",
    green: "#bbf7d0",
    pink: "#fbcfe8",
    blue: "#bfdbfe",
    orange: "#fed7aa",
    paper: "#fff7df",
}

const seedMap: Record<SectionTitleVariant, number> = {
    yellow: 20,
    purple: 40,
    green: 60,
    pink: 80,
    blue: 100,
    orange: 120,
    paper: 140,
}

export function SectionTitle({
    children,
    subtitle,
    icon,

    variant = "yellow",
    borderColor = "#111",
    transparent = false,

    width = 260,
    height = 64,
    x = 5,
    y = 5,

    rotate = -1,

    roughOptions,

    className,
    titleClassName,
    subtitleClassName,
}: SectionTitleProps) {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const shape = rc.rectangle(x, y, width, height, {
            seed: roughOptions?.seed ?? seedMap[variant],
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.8,
            fill: transparent ? undefined : roughOptions?.fill ?? colors[variant],
            fillStyle: transparent ? undefined : roughOptions?.fillStyle ?? "hachure",
            hachureGap: roughOptions?.hachureGap ?? 6,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.5,
            bowing: roughOptions?.bowing ?? 0.8,
        })

        svg.appendChild(shape)
    }, [variant, borderColor, transparent, width, height, x, y, roughOptions])

    const totalWidth = width + x * 2
    const totalHeight = height + y * 2

    return (
        <div className={cn("inline-flex flex-col gap-2", className)}>
            <div
                className="relative inline-flex items-center justify-center"
                style={{
                    width: totalWidth,
                    height: totalHeight,
                    transform: rotate ? `rotate(${rotate}deg)` : undefined,
                }}
            >
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${totalWidth} ${totalHeight}`}
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                />

                <div
                    className={cn(
                        "relative z-10 flex items-center gap-3 px-5 text-3xl font-black text-black",
                        titleClassName
                    )}
                >
                    {icon && <span className="inline-flex">{icon}</span>}
                    <span>{children}</span>
                </div>
            </div>

            {subtitle && (
                <p
                    className={cn(
                        "max-w-md text-sm font-medium text-black/70",
                        subtitleClassName
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    )
}