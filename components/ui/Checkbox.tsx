"use client"

import { useEffect, useId, useRef, useState } from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type CheckboxShape = "square" | "rounded" | "circle"

type CheckboxVariant = "paper" | "yellow" | "green" | "blue" | "purple" | "pink" | "orange"

type CheckStyle = "check" | "cross" | "dot" | "plus" | "scribble"

type CheckboxSize = "sm" | "md" | "lg" | number

type RoughCheckboxOptions = {
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

type CheckboxProps = {
    checked?: boolean
    defaultChecked?: boolean
    indeterminate?: boolean

    onCheckedChange?: (checked: boolean) => void

    disabled?: boolean

    label?: React.ReactNode

    shape?: CheckboxShape
    checkStyle?: CheckStyle
    variant?: CheckboxVariant

    size?: CheckboxSize
    rotate?: number

    borderColor?: string
    checkedColor?: string
    uncheckedColor?: string

    roughOptions?: RoughCheckboxOptions

    className?: string
    labelClassName?: string
}

const colors: Record<CheckboxVariant, string> = {
    paper: "#fff7df",
    yellow: "#fde047",
    green: "#bbf7d0",
    blue: "#bfdbfe",
    purple: "#d8c7ff",
    pink: "#fbcfe8",
    orange: "#fed7aa",
}

const seedMap: Record<CheckboxVariant, number> = {
    paper: 220,
    yellow: 20,
    green: 60,
    blue: 100,
    purple: 40,
    pink: 80,
    orange: 180,
}

const sizeMap: Record<Exclude<CheckboxSize, number>, number> = {
    sm: 22,
    md: 28,
    lg: 36,
}

function getSize(size: CheckboxSize) {
    return typeof size === "number" ? size : sizeMap[size]
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

function checkPath(size: number) {
    return `
        M ${size * 0.22} ${size * 0.54}
        L ${size * 0.43} ${size * 0.75}
        L ${size * 0.78} ${size * 0.28}
    `
}

function scribblePath(size: number) {
    return `
        M ${size * 0.18} ${size * 0.56}
        L ${size * 0.28} ${size * 0.68}
        L ${size * 0.38} ${size * 0.52}
        L ${size * 0.48} ${size * 0.72}
        L ${size * 0.63} ${size * 0.34}
        L ${size * 0.76} ${size * 0.48}
    `
}

function crossPath(size: number) {
    return `
        M ${size * 0.28} ${size * 0.28}
        L ${size * 0.72} ${size * 0.72}

        M ${size * 0.72} ${size * 0.28}
        L ${size * 0.28} ${size * 0.72}
    `
}

function plusPath(size: number) {
    return `
        M ${size * 0.5} ${size * 0.25}
        L ${size * 0.5} ${size * 0.75}

        M ${size * 0.25} ${size * 0.5}
        L ${size * 0.75} ${size * 0.5}
    `
}

export function Checkbox({
    checked,
    defaultChecked = false,
    indeterminate = false,

    onCheckedChange,

    disabled = false,

    label,

    shape = "rounded",
    checkStyle = "check",
    variant = "paper",

    size = "md",
    rotate = 0,

    borderColor = "#111",
    checkedColor,
    uncheckedColor = "transparent",

    roughOptions,

    className,
    labelClassName,
}: CheckboxProps) {
    const id = useId()

    const boxSvgRef = useRef<SVGSVGElement | null>(null)
    const markSvgRef = useRef<SVGSVGElement | null>(null)

    const isControlled = checked !== undefined

    const [internalChecked, setInternalChecked] =
        useState(defaultChecked)

    const isChecked = isControlled
        ? checked
        : internalChecked

    const finalFill =
        checkedColor ?? colors[variant]

    const px = getSize(size)

    const radius =
        shape === "square"
            ? 0
            : shape === "rounded"
                ? Math.max(6, px * 0.22)
                : px / 2

    function handleToggle() {
        if (disabled) return

        const next = !isChecked

        if (!isControlled) {
            setInternalChecked(next)
        }

        onCheckedChange?.(next)
    }

    useEffect(() => {
        const svg = boxSvgRef.current
        if (!svg) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const options = {
            seed: roughOptions?.seed ?? seedMap[variant],
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.8,
            fill:
                isChecked || indeterminate
                    ? roughOptions?.fill ?? finalFill
                    : uncheckedColor,
            fillStyle: roughOptions?.fillStyle ?? "solid",
            hachureGap: roughOptions?.hachureGap ?? 6,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.4,
            bowing: roughOptions?.bowing ?? 0.8,
        }

        let node: SVGGElement

        if (shape === "circle") {
            node = rc.circle(px / 2, px / 2, px - 4, options)
        } else if (shape === "rounded") {
            node = rc.path(
                roundedRectPath(
                    2,
                    2,
                    px - 4,
                    px - 4,
                    radius
                ),
                options
            )
        } else {
            node = rc.rectangle(
                2,
                2,
                px - 4,
                px - 4,
                options
            )
        }

        svg.appendChild(node)
    }, [
        isChecked,
        indeterminate,
        px,
        radius,
        shape,
        variant,
        borderColor,
        finalFill,
        uncheckedColor,
        roughOptions,
    ])

    useEffect(() => {
        const svg = markSvgRef.current
        if (!svg) return

        svg.replaceChildren()

        if (!isChecked && !indeterminate) return

        const rc = rough.svg(svg)

        const common = {
            seed: (roughOptions?.seed ?? seedMap[variant]) + 100,
            stroke: borderColor,
            strokeWidth:
                (roughOptions?.strokeWidth ?? 1.8) + 0.3,
            roughness:
                (roughOptions?.roughness ?? 1.4) + 0.2,
            bowing:
                roughOptions?.bowing ?? 0.8,
            fill: "none",
        }

        let node: SVGGElement

        if (indeterminate) {
            node = rc.line(
                px * 0.25,
                px * 0.5,
                px * 0.75,
                px * 0.5,
                common
            )
        } else {
            switch (checkStyle) {
                case "cross":
                    node = rc.path(
                        crossPath(px),
                        common
                    )
                    break

                case "plus":
                    node = rc.path(
                        plusPath(px),
                        common
                    )
                    break

                case "scribble":
                    node = rc.path(
                        scribblePath(px),
                        common
                    )
                    break

                case "dot":
                    node = rc.circle(
                        px / 2,
                        px / 2,
                        px * 0.28,
                        {
                            ...common,
                            fill: borderColor,
                            fillStyle: "solid",
                        }
                    )
                    break

                default:
                    node = rc.path(
                        checkPath(px),
                        common
                    )
            }
        }

        svg.appendChild(node)

        const paths = svg.querySelectorAll("path")

        paths.forEach((path) => {
            const length = path.getTotalLength()

            path.style.strokeDasharray =
                `${length}`

            path.style.strokeDashoffset =
                `${length}`

            path.getBoundingClientRect()

            path.style.transition =
                "stroke-dashoffset 220ms ease"

            path.style.strokeDashoffset = "0"
        })
    }, [
        isChecked,
        indeterminate,
        checkStyle,
        px,
        borderColor,
        roughOptions,
        variant,
    ])

    return (
        <label
            htmlFor={id}
            className={cn(
                "inline-flex items-center gap-3 select-none",
                disabled
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer",
                className
            )}
            style={{
                transform: rotate
                    ? `rotate(${rotate}deg)`
                    : undefined,
            }}
        >
            <button
                type="button"
                role="checkbox"
                aria-checked={
                    indeterminate
                        ? "mixed"
                        : isChecked
                }
                disabled={disabled}
                onClick={handleToggle}
                className={cn(
                    "relative shrink-0 outline-none",
                    "transition-transform duration-150",
                    "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                    !disabled &&
                    "active:scale-95"
                )}
                style={{
                    width: px,
                    height: px,
                }}
            >
                <svg
                    ref={boxSvgRef}
                    viewBox={`0 0 ${px} ${px}`}
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                />

                <svg
                    ref={markSvgRef}
                    viewBox={`0 0 ${px} ${px}`}
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                />

                <input
                    id={id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleToggle}
                    disabled={disabled}
                    className="sr-only"
                    tabIndex={-1}
                />
            </button>

            {label && (
                <span
                    className={cn(
                        "text-sm font-medium text-black",
                        labelClassName
                    )}
                >
                    {label}
                </span>
            )}
        </label>
    )
}