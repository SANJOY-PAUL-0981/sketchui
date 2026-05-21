"use client"

import "./style/Loader.css"

import { cn } from "@/lib/utils"

type LoaderType = "dots" | "spinner"

type LoaderSize = "sm" | "md" | "lg" | number

type LoaderColor = "black" | "yellow" | "purple" | "green" | "pink" | "blue" | string

type LoaderMotion = "quick" | "normal" | "slow" | "slower"

type LoaderProps = {
    type?: LoaderType
    size?: LoaderSize
    color?: LoaderColor
    motion?: LoaderMotion
    speed?: number
    label?: string
    showLabel?: boolean
    className?: string
    labelClassName?: string
}

const colorMap: Record<string, string> = {
    black: "#111111",
    yellow: "#fde047",
    purple: "#c084fc",
    green: "#86efac",
    pink: "#f9a8d4",
    blue: "#93c5fd",
}

const sizeMap: Record<Exclude<LoaderSize, number>, number> = {
    sm: 28,
    md: 44,
    lg: 64,
}

const motionMap: Record<LoaderMotion, number> = {
    quick: 0.55,
    normal: 0.9,
    slow: 1.25,
    slower: 1.7,
}

function getSize(size: LoaderSize) {
    return typeof size === "number" ? size : sizeMap[size]
}

function getColor(color: LoaderColor) {
    return colorMap[color] ?? color
}

function getSpeed(motion: LoaderMotion, speed?: number) {
    return speed ?? motionMap[motion]
}

function DotsLoader({
    size,
    color,
    speed,
}: {
    size: number
    color: string
    speed: number
}) {
    const dot = Math.max(5, size * 0.18)
    const gap = dot * 0.9
    const width = dot * 3 + gap * 2
    const height = size

    return (
        <span
            className="inline-flex items-center justify-center"
            style={{
                width,
                height,
                ["--loader-speed" as string]: `${speed}s`,
            }}
            aria-hidden="true"
        >
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="mx-[2px] inline-block rounded-full border-2 border-black sketch-loader-dot-bounce"
                    style={{
                        width: dot,
                        height: dot,
                        backgroundColor: color,
                        animationDelay: `${i * 0.12}s`,
                        boxShadow: "2px 2px 0 #111",
                    }}
                />
            ))}
        </span>
    )
}

function SpinnerLoader({
    size,
    color,
    speed,
}: {
    size: number
    color: string
    speed: number
}) {
    const dot = Math.max(6, size * 0.16)
    const orbit = Math.max(10, size * 0.34)

    return (
        <span
            className="relative inline-flex items-center justify-center sketch-loader-spinner"
            style={{
                width: size,
                height: size,
                ["--loader-speed" as string]: `${speed}s`,
                ["--loader-orbit" as string]: `${orbit}px`,
            }}
            aria-hidden="true"
        >
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="absolute left-1/2 top-1/2 rounded-full border-2 border-black sketch-loader-orbit-dot"
                    style={{
                        width: dot,
                        height: dot,
                        backgroundColor: color,
                        boxShadow: "2px 2px 0 #111",
                        animationDelay: `${-(speed / 3) * i}s`,
                    }}
                />
            ))}
        </span>
    )
}

export function Loader({
    type = "dots",
    size = "md",
    color = "purple",
    motion = "normal",
    speed,
    label = "Loading",
    showLabel = false,
    className,
    labelClassName,
}: LoaderProps) {
    const finalSize = getSize(size)
    const finalColor = getColor(color)
    const finalSpeed = getSpeed(motion, speed)

    return (
        <div
            role="status"
            aria-label={label}
            className={cn(
                "inline-flex items-center justify-center gap-3 text-black",
                className
            )}
        >
            {type === "dots" && (
                <DotsLoader
                    size={finalSize}
                    color={finalColor}
                    speed={finalSpeed}
                />
            )}

            {type === "spinner" && (
                <SpinnerLoader
                    size={finalSize}
                    color={finalColor}
                    speed={finalSpeed}
                />
            )}

            {showLabel && (
                <span
                    className={cn(
                        "text-sm font-black tracking-wide",
                        "after:inline-block after:content-['...']",
                        labelClassName
                    )}
                >
                    {label}
                </span>
            )}

            <span className="sr-only">{label}</span>
        </div>
    )
}