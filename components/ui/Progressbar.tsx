"use client"

import { useEffect, useId, useRef, useState } from "react"
import rough from "roughjs"

import { cn } from "@/lib/utils"

type ProgressbarVariant =
    | "yellow"
    | "purple"
    | "green"
    | "pink"
    | "blue"
    | "orange"
    | "gray"
    | "red"
    | "sky"
    | "paper"

type ProgressbarFillStyle =
    | "solid"
    | "hachure"
    | "zigzag"
    | "cross-hatch"
    | "dots"
    | "dashed"
    | "zigzag-line"

type ProgressbarProps = {
    value?: number
    max?: number
    width?: number | string
    height?: number
    variant?: ProgressbarVariant
    fillColor?: string
    trackColor?: string
    borderColor?: string
    textColor?: string
    fillStyle?: ProgressbarFillStyle
    hachureGap?: number
    hachureAngle?: number
    strokeWidth?: number
    roughness?: number
    bowing?: number
    seed?: number
    duration?: number
    delay?: number
    stagger?: number
    showValue?: boolean
    showReplay?: boolean
    label?: string
    animateOnChange?: boolean
    className?: string
    valueClassName?: string
    replayClassName?: string
}

const colors: Record<ProgressbarVariant, string> = {
    yellow: "#fde047",
    purple: "#d8c7ff",
    green: "#bbf7d0",
    pink: "#fbcfe8",
    blue: "#bfdbfe",
    orange: "#fed7aa",
    gray: "#e5e7eb",
    red: "#fecaca",
    sky: "#bae6fd",
    paper: "#fff7df",
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

export function Progressbar({
    value = 0,
    max = 100,
    width = "100%",
    height = 28,
    variant = "green",
    fillColor,
    trackColor = "#fffbf2",
    borderColor = "#111",
    textColor = "#111",
    fillStyle = "hachure",
    hachureGap = 5,
    hachureAngle = -10,
    strokeWidth = 1.8,
    roughness = 1.3,
    bowing = 0.8,
    seed,
    duration = 900,
    delay = 100,
    stagger = 45,
    showValue = false,
    showReplay = false,
    label = "Progress",
    animateOnChange = true,
    className,
    valueClassName,
    replayClassName,
}: ProgressbarProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)
    const firstDrawRef = useRef(true)
    const [animationKey, setAnimationKey] = useState(0)

    const rawId = useId()
    const clipId = `sketch-progress-${rawId.replace(/:/g, "")}`

    const clampedValue = Math.max(0, Math.min(max, value))
    const progress = max > 0 ? clampedValue / max : 0
    const percent = Math.round(progress * 100)

    const finalFill = fillColor ?? colors[variant]
    const finalSeed = seed ?? 460

    useEffect(() => {
        const wrapper = wrapperRef.current
        const svg = svgRef.current
        if (!wrapper || !svg) return

        let timer: number | undefined

        const draw = () => {
            const rect = wrapper.getBoundingClientRect()
            const drawWidth = rect.width
            const drawHeight = rect.height

            if (drawWidth <= 0 || drawHeight <= 0) return

            if (timer) {
                window.clearTimeout(timer)
                timer = undefined
            }

            svg.replaceChildren()
            svg.setAttribute("viewBox", `0 0 ${drawWidth} ${drawHeight}`)

            const ns = "http://www.w3.org/2000/svg"
            const radius = Math.max(4, drawHeight / 2 - 4)
            const shape = roundedRectPath(
                4,
                4,
                drawWidth - 8,
                drawHeight - 8,
                radius
            )

            const defs = document.createElementNS(ns, "defs")
            const clip = document.createElementNS(ns, "clipPath")
            clip.setAttribute("id", clipId)
            clip.setAttribute("clipPathUnits", "userSpaceOnUse")

            const clipRect = document.createElementNS(ns, "rect")
            clipRect.setAttribute("x", "0")
            clipRect.setAttribute("y", "0")
            clipRect.setAttribute("width", String(drawWidth))
            clipRect.setAttribute("height", String(drawHeight))
            clipRect.style.transformOrigin = "left center"
            clipRect.style.transform = "scaleX(0)"

            clip.appendChild(clipRect)
            defs.appendChild(clip)
            svg.appendChild(defs)

            const rc = rough.svg(svg)

            const track = rc.path(shape, {
                seed: finalSeed + 4,
                stroke: "transparent",
                strokeWidth: 0,
                fill: trackColor,
                fillStyle: "solid",
                roughness: roughness * 0.5,
                bowing,
            })
            svg.appendChild(track)

            const fillGroup = document.createElementNS(ns, "g")
            fillGroup.setAttribute("clip-path", `url(#${clipId})`)
            const fill = rc.path(shape, {
                seed: finalSeed,
                stroke: finalFill,
                strokeWidth,
                fill: finalFill,
                fillStyle,
                hachureGap,
                hachureAngle,
                roughness,
                bowing,
            })
            fillGroup.appendChild(fill)
            svg.appendChild(fillGroup)

            const outline = rc.path(shape, {
                seed: finalSeed + 8,
                stroke: borderColor,
                strokeWidth,
                roughness,
                bowing,
            })
            svg.appendChild(outline)

            const paths = Array.from(svg.querySelectorAll("path"))
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
            const shouldAnimate =
                firstDrawRef.current || animateOnChange || animationKey > 0

            firstDrawRef.current = false

            if (reducedMotion || !shouldAnimate) {
                paths.forEach((path) => {
                    path.style.strokeDashoffset = "0"
                })
                clipRect.style.transition = `transform ${duration}ms ease-out`
                clipRect.style.transform = `scaleX(${progress})`
                return
            }

            paths.forEach((path) => {
                const length = path.getTotalLength()
                path.style.strokeDasharray = `${length}`
                path.style.strokeDashoffset = `${length}`
                path.getBoundingClientRect()
            })

            clipRect.style.transition = `transform ${duration}ms ease-out`

            timer = window.setTimeout(() => {
                paths.forEach((path, index) => {
                    path.style.transition = `stroke-dashoffset ${duration}ms ease-out ${index * stagger}ms`
                    path.style.strokeDashoffset = "0"
                })

                clipRect.style.transform = `scaleX(${progress})`
            }, delay)
        }

        draw()

        const observer = new ResizeObserver(draw)
        observer.observe(wrapper)

        return () => {
            if (timer) {
                window.clearTimeout(timer)
            }
            observer.disconnect()
        }
    }, [
        animationKey,
        progress,
        animateOnChange,
        clipId,
        finalFill,
        finalSeed,
        trackColor,
        borderColor,
        fillStyle,
        hachureGap,
        hachureAngle,
        strokeWidth,
        roughness,
        bowing,
        duration,
        delay,
        stagger,
        value,
    ])

    return (
        <div
            className={cn("inline-flex flex-col gap-2", className)}
            style={{ width }}
        >
            <div
                ref={wrapperRef}
                role="progressbar"
                aria-label={label}
                aria-valuenow={clampedValue}
                aria-valuemin={0}
                aria-valuemax={max}
                className="relative"
                style={{ width: "100%", height }}
            >
                <svg
                    ref={svgRef}
                    className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden="true"
                />

                {showValue && (
                    <span
                        className={cn(
                            "absolute inset-y-0 right-3 z-10 flex items-center",
                            "font-family-hand text-sm font-black",
                            valueClassName
                        )}
                        style={{ color: textColor }}
                    >
                        {percent}%
                    </span>
                )}
            </div>

            {showReplay && (
                <button
                    type="button"
                    onClick={() => setAnimationKey((prev) => prev + 1)}
                    className={cn(
                        "self-start rounded-lg border-2 border-black bg-[#fffbf2] px-3 py-1",
                        "font-family-hand text-xs font-bold text-black",
                        "outline-none transition-transform hover:-rotate-1 active:scale-95",
                        "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                        replayClassName
                    )}
                >
                    Redraw strokes
                </button>
            )}
        </div>
    )
}
