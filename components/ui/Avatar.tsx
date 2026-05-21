"use client"

import { useEffect, useId, useRef } from "react"
import Image from "next/image"
import rough from "roughjs"
import { cn } from "@/lib/utils"
import type { StaticImageData } from "next/image"

type AvatarSize = "sm" | "md" | "lg" | "xl" | number

type AvatarVariant = "gray" | "paper" | "yellow" | "purple" | "green" | "pink" | "blue" | "white"

type AvatarStatus = "online" | "offline" | "busy" | "away"

type RoughAvatarOptions = {
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

type AvatarProps = {
    src?: string | StaticImageData
    alt?: string
    name?: string
    size?: AvatarSize
    variant?: AvatarVariant
    bgColor?: string
    borderColor?: string
    initials?: string
    showInitials?: boolean
    status?: AvatarStatus
    showStatus?: boolean
    rotate?: number
    hoverWiggle?: boolean
    roughOptions?: RoughAvatarOptions
    className?: string
    imageClassName?: string
    fallbackClassName?: string
}

const sizeMap: Record<Exclude<AvatarSize, number>, number> = {
    sm: 36,
    md: 52,
    lg: 72,
    xl: 96,
}

const variantColors: Record<AvatarVariant, string> = {
    gray: "#e5e7eb",
    paper: "#fffbf2",
    yellow: "#fde047",
    purple: "#d8c7ff",
    green: "#bbf7d0",
    pink: "#fbcfe8",
    blue: "#bfdbfe",
    white: "#ffffff",
}

const statusColors: Record<AvatarStatus, string> = {
    online: "#22c55e",
    offline: "#9ca3af",
    busy: "#ef4444",
    away: "#f59e0b",
}

function getSize(size: AvatarSize) {
    return typeof size === "number" ? size : sizeMap[size]
}

function getInitials(name?: string, initials?: string) {
    if (initials) return initials.slice(0, 3).toUpperCase()
    if (!name) return ""

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
}

function DefaultAvatarDoodle({
    size,
    color = "#111",
}: {
    size: number
    color?: string
}) {
    const strokeWidth = Math.max(2, size * 0.045)

    return (
        <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M50 28 C39 28, 32 36, 32 47 C32 58, 40 65, 50 65 C61 65, 69 57, 68 46 C67 36, 60 28, 50 28 Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M24 83 C28 72, 38 68, 50 68 C63 68, 73 73, 77 83"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M42 46 L42.3 46"
                stroke={color}
                strokeWidth={strokeWidth + 1}
                strokeLinecap="round"
            />
            <path
                d="M58 46 L58.3 46"
                stroke={color}
                strokeWidth={strokeWidth + 1}
                strokeLinecap="round"
            />

            <path
                d="M43 55 C48 52, 54 52, 59 55"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </svg>
    )
}

export function Avatar({
    src,
    alt,
    name,
    size = "md",
    variant = "gray",
    bgColor,
    borderColor = "#111",
    initials,
    showInitials = false,
    status,
    showStatus = false,
    rotate = 0,
    hoverWiggle = false,
    roughOptions,
    className,
    imageClassName,
    fallbackClassName,
}: AvatarProps) {
    const svgRef = useRef<SVGSVGElement | null>(null)
    const clipId = useId()

    const finalSize = getSize(size)
    const finalBg = bgColor ?? variantColors[variant]
    const finalInitials = getInitials(name, initials)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const padding = Math.max(3, finalSize * 0.06)
        const radius = finalSize / 2 - padding

        const circle = rc.circle(finalSize / 2, finalSize / 2, radius * 2, {
            seed: roughOptions?.seed ?? 120,
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? Math.max(1.8, finalSize * 0.035),
            fill: roughOptions?.fill ?? finalBg,
            fillStyle: roughOptions?.fillStyle ?? "solid",
            hachureGap: roughOptions?.hachureGap ?? 7,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.4,
            bowing: roughOptions?.bowing ?? 0.8,
        })

        svg.appendChild(circle)
    }, [finalSize, finalBg, borderColor, roughOptions])

    return (
        <span
            className={cn(
                "relative inline-flex shrink-0 items-center justify-center",
                hoverWiggle &&
                "transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:-rotate-2",
                className
            )}
            style={{
                width: finalSize,
                height: finalSize,
                rotate: `${rotate}deg`,
            }}
        >
            <svg
                ref={svgRef}
                width={finalSize}
                height={finalSize}
                viewBox={`0 0 ${finalSize} ${finalSize}`}
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
            />

            <span
                className="absolute inset-[8%] overflow-hidden rounded-full"
                style={{
                    clipPath: `url(#${clipId})`,
                }}
            >
                <svg width="0" height="0" className="absolute">
                    <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <circle cx="0.5" cy="0.5" r="0.5" />
                    </clipPath>
                </svg>

                {src ? (
                    <Image
                        src={src}
                        alt={alt ?? name ?? "Avatar"}
                        fill
                        sizes={`${finalSize}px`}
                        className={cn("object-cover", imageClassName)}
                    />
                ) : showInitials && finalInitials ? (
                    <span
                        className={cn(
                            "flex h-full w-full items-center justify-center font-black text-black",
                            fallbackClassName
                        )}
                        style={{
                            fontSize: Math.max(12, finalSize * 0.32),
                            backgroundColor: "transparent",
                        }}
                    >
                        {finalInitials}
                    </span>
                ) : (
                    <span
                        className={cn(
                            "flex h-full w-full items-center justify-center",
                            fallbackClassName
                        )}
                    >
                        <DefaultAvatarDoodle size={finalSize} />
                    </span>
                )}
            </span>

            {showStatus && status && (
                <span
                    className="absolute bottom-[4%] right-[4%] rounded-full border-2 border-black shadow-[1.5px_1.5px_0_#111]"
                    style={{
                        width: Math.max(10, finalSize * 0.22),
                        height: Math.max(10, finalSize * 0.22),
                        backgroundColor: statusColors[status],
                    }}
                    aria-label={status}
                />
            )}
        </span>
    )
}