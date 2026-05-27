"use client"

import { useEffect, useRef, useState } from "react"
import rough from "roughjs"
import Link from "next/link"
import { cn } from "@/lib/utils"

type RoughButtonOptions = {
    seed?: number
    stroke?: string
    strokeWidth?: number
    fillStyle?: "solid" | "hachure" | "zigzag" | "cross-hatch" | "dots" | "dashed" | "zigzag-line"
    hachureGap?: number
    hoverHachureGap?: number
    hachureAngle?: number
    roughness?: number
    hoverRoughness?: number
    bowing?: number
}

type ButtonVariant = "yellow" | "purple" | "green"

type ButtonProps = {
    children: React.ReactNode
    href?: string
    external?: boolean
    onClick?: () => void
    variant?: ButtonVariant
    className?: string
    textClassName?: string
    roughOptions?: RoughButtonOptions

    width?: number
    height?: number
    x?: number
    y?: number
    fontSize?: number
    paddingX?: number
    fontWeight?: "normal" | "medium" | "semibold" | "bold"

    hoverSketch?: boolean

    /*
     - Controls whole button hover movement.
     - Example: hoverTranslateY={-4}, hoverTranslateX={0}
     */
    hoverTranslateX?: number
    hoverTranslateY?: number
    hoverRotate?: number
    hoverScale?: number

    enable3D?: boolean
    depth?: number
    depthAngle?: number
    depthFill?: string

    depthHachureGap?: number
    depthHachureAngle?: number
    depthRoughness?: number
    depthStrokeWidth?: number

    type?: "button" | "submit" | "reset"
    disabled?: boolean
}

const colors: Record<ButtonVariant, string> = {
    yellow: "#fde047",
    purple: "#c084fc",
    green: "#86efac",
}

const seedMap: Record<ButtonVariant, number> = {
    yellow: 50,
    purple: 100,
    green: 150,
}

const fontWeightMap = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
}

function polygonPath(points: [number, number][]) {
    return (
        points
            .map(([px, py], index) => `${index === 0 ? "M" : "L"} ${px} ${py}`)
            .join(" ") + " Z"
    )
}

export function Button({
    children,
    href,
    external = false,
    onClick,
    variant = "yellow",
    className,
    textClassName,
    roughOptions,
    width = 180,
    height = 48,
    x = 5,
    y = 5,
    fontSize = 18,
    paddingX = 18,
    fontWeight = "bold",
    hoverSketch = true,
    hoverTranslateX = 0,
    hoverTranslateY = -4,
    hoverRotate = -1,
    hoverScale = 1,
    enable3D = false,
    depth = 12,
    depthAngle = 35,
    depthFill = "#fffbf2",
    depthHachureGap = 5,
    depthHachureAngle = 85,
    depthRoughness,
    depthStrokeWidth,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const svgRef = useRef<SVGSVGElement | null>(null)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const normalHachureGap = roughOptions?.hachureGap ?? 5
        const hoverHachureGap = roughOptions?.hoverHachureGap ?? 0.75

        const normalRoughness = roughOptions?.roughness ?? 1.4
        const hoverRoughness = roughOptions?.hoverRoughness ?? 1.9

        const stroke = roughOptions?.stroke ?? "#111"
        const strokeWidth = roughOptions?.strokeWidth ?? 1.7

        const roughness =
            hoverSketch && isHovered ? hoverRoughness : normalRoughness

        const hachureGap =
            hoverSketch && isHovered
                ? hoverHachureGap
                : normalHachureGap

        const angleRad = (depthAngle * Math.PI) / 180

        const dx = enable3D ? Math.cos(angleRad) * depth : 0
        const dy = enable3D ? Math.sin(angleRad) * depth : 0

        const frontX = x
        const frontY = y

        const frontRight = frontX + width
        const frontBottom = frontY + height

        if (enable3D) {
            const rightFace = polygonPath([
                [frontRight, frontY],
                [frontRight + dx, frontY + dy],
                [frontRight + dx, frontBottom + dy],
                [frontRight, frontBottom],
            ])

            const bottomFace = polygonPath([
                [frontX, frontBottom],
                [frontRight, frontBottom],
                [frontRight + dx, frontBottom + dy],
                [frontX + dx, frontBottom + dy],
            ])

            const depthBaseSeed = roughOptions?.seed ?? seedMap[variant]

            const sideOptions = {
                seed: depthBaseSeed + 10,
                stroke,
                strokeWidth: depthStrokeWidth ?? strokeWidth,
                fill: depthFill,
                fillStyle: "hachure" as const,
                hachureGap: depthHachureGap,
                hachureAngle: depthHachureAngle,
                roughness: depthRoughness ?? roughness + 0.35,
                bowing: roughOptions?.bowing ?? 0.8,
            }

            const bottomOptions = {
                seed: depthBaseSeed + 20,
                stroke,
                strokeWidth: depthStrokeWidth ?? strokeWidth,
                fill: depthFill,
                fillStyle: "hachure" as const,
                hachureGap: depthHachureGap,
                hachureAngle: -35,
                roughness: depthRoughness ?? roughness + 0.35,
                bowing: roughOptions?.bowing ?? 0.8,
            }

            const rightShape = rc.path(rightFace, sideOptions)
            const bottomShape = rc.path(bottomFace, bottomOptions)

            svg.appendChild(rightShape)
            svg.appendChild(bottomShape)
        }

        const frontShape = rc.rectangle(frontX, frontY, width, height, {
            seed: roughOptions?.seed ?? seedMap[variant],
            stroke,
            strokeWidth,
            fill: colors[variant],
            fillStyle: roughOptions?.fillStyle ?? "hachure",
            hachureGap,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness,
            bowing: roughOptions?.bowing ?? 0.8,
        })

        svg.appendChild(frontShape)
    }, [
        variant,
        width,
        height,
        x,
        y,
        roughOptions,
        isHovered,
        hoverSketch,

        enable3D,
        depth,
        depthAngle,
        depthFill,

        depthHachureGap,
        depthHachureAngle,
        depthRoughness,
        depthStrokeWidth,
    ])

    const angleRad = (depthAngle * Math.PI) / 180

    const depthX = enable3D ? Math.cos(angleRad) * depth : 0
    const depthY = enable3D ? Math.sin(angleRad) * depth : 0

    const totalWidth = width + x * 2 + Math.abs(depthX) + 4
    const totalHeight = height + y * 2 + Math.abs(depthY) + 4

    const hoverTransform =
        isHovered && !disabled
            ? `translate(${hoverTranslateX}px, ${hoverTranslateY}px) rotate(${hoverRotate}deg) scale(${hoverScale})`
            : "translate(0px, 0px) rotate(0deg) scale(1)"

    const inner = (
        <span
            onMouseEnter={() => !disabled && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative inline-flex items-center justify-center",
                "text-black transition-transform duration-150 ease-out",
                className
            )}
            style={{
                width: totalWidth,
                height: totalHeight,
                transform: hoverTransform,
            }}
        >
            <svg
                ref={svgRef}
                viewBox={`0 0 ${totalWidth} ${totalHeight}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            />

            <span
                className={cn(
                    "relative z-10 flex items-center justify-center",
                    textClassName
                )}
                style={{
                    width,
                    height,
                    fontSize,
                    paddingLeft: paddingX,
                    paddingRight: paddingX,
                    fontWeight: fontWeightMap[fontWeight],
                }}
            >
                {children}
            </span>
        </span>
    )

    if (href) {
        return (
            <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-block"
            >
                {inner}
            </Link>
        )
    }

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className="inline-block disabled:cursor-not-allowed disabled:opacity-70"
        >
            {inner}
        </button>
    )
}