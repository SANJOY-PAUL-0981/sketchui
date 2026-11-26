"use client"

import {
    useEffect,
    useId,
    useRef,
    useState,
    type ReactNode,
} from "react"
import rough from "roughjs"

import { cn } from "@/lib/utils"

export type RadioOption = {
    value: string
    label: ReactNode
    description?: ReactNode
    disabled?: boolean
}

type RadioVariant =
    | "paper"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "orange"

type RadioShape = "circle" | "rounded"

type RadioSize = "sm" | "md" | "lg" | number

type RoughRadioOptions = {
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

type RadioGroupProps = {
    items: RadioOption[]
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    name?: string
    label?: ReactNode
    orientation?: "vertical" | "horizontal"
    disabled?: boolean

    variant?: RadioVariant
    shape?: RadioShape
    size?: RadioSize
    borderColor?: string
    checkedColor?: string
    uncheckedColor?: string
    roughOptions?: RoughRadioOptions

    className?: string
    legendClassName?: string
    itemClassName?: string
    indicatorClassName?: string
    labelClassName?: string
    descriptionClassName?: string
}

const colors: Record<RadioVariant, string> = {
    paper: "#fff7df",
    yellow: "#fde047",
    green: "#bbf7d0",
    blue: "#bfdbfe",
    purple: "#d8c7ff",
    pink: "#fbcfe8",
    orange: "#fed7aa",
}

const sizeMap: Record<Exclude<RadioSize, number>, number> = {
    sm: 22,
    md: 28,
    lg: 36,
}

function getSize(size: RadioSize) {
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

function RadioIndicator({
    checked,
    size,
    shape,
    variant,
    borderColor,
    checkedColor,
    uncheckedColor,
    roughOptions,
}: {
    checked: boolean
    size: number
    shape: RadioShape
    variant: RadioVariant
    borderColor: string
    checkedColor?: string
    uncheckedColor: string
    roughOptions?: RoughRadioOptions
}) {
    const outerRef = useRef<SVGSVGElement | null>(null)
    const dotRef = useRef<SVGSVGElement | null>(null)

    const fill = checked ? checkedColor ?? colors[variant] : uncheckedColor
    const seed = roughOptions?.seed ?? 240

    useEffect(() => {
        const svg = outerRef.current
        if (!svg) return

        svg.replaceChildren()

        const rc = rough.svg(svg)
        const options = {
            seed,
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.8,
            fill,
            fillStyle: roughOptions?.fillStyle ?? "solid",
            hachureGap: roughOptions?.hachureGap ?? 6,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.3,
            bowing: roughOptions?.bowing ?? 0.8,
        }

        const node =
            shape === "circle"
                ? rc.circle(size / 2, size / 2, size - 4, options)
                : rc.path(
                    roundedRectPath(2, 2, size - 4, size - 4, Math.max(5, size * 0.24)),
                    options
                )

        svg.appendChild(node)
    }, [size, shape, borderColor, fill, seed, roughOptions])

    useEffect(() => {
        const svg = dotRef.current
        if (!svg) return

        svg.replaceChildren()

        if (!checked) return

        const rc = rough.svg(svg)
        const dotSize = Math.max(6, size * 0.3)
        const node = rc.circle(size / 2, size / 2, dotSize, {
            seed: seed + 10,
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.4,
            fill: roughOptions?.stroke ?? borderColor,
            fillStyle: "solid",
            roughness: roughOptions?.roughness ?? 1.1,
            bowing: roughOptions?.bowing ?? 0.7,
        })

        svg.appendChild(node)
    }, [checked, size, borderColor, seed, roughOptions])

    return (
        <>
            <svg
                ref={outerRef}
                viewBox={`0 0 ${size} ${size}`}
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
            />
            <svg
                ref={dotRef}
                viewBox={`0 0 ${size} ${size}`}
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
            />
        </>
    )
}

export function RadioGroup({
    items,
    value,
    defaultValue,
    onValueChange,
    name,
    label,
    orientation = "vertical",
    disabled = false,
    variant = "paper",
    shape = "circle",
    size = "md",
    borderColor = "#111",
    checkedColor,
    uncheckedColor = "transparent",
    roughOptions,
    className,
    legendClassName,
    itemClassName,
    indicatorClassName,
    labelClassName,
    descriptionClassName,
}: RadioGroupProps) {
    const generatedId = useId()
    const groupName = name ?? generatedId

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const selected = isControlled ? value : internalValue

    const pixelSize = getSize(size)

    function handleChange(next: string) {
        if (!isControlled) {
            setInternalValue(next)
        }

        onValueChange?.(next)
    }

    return (
        <fieldset
            disabled={disabled}
            className={cn("m-0 min-w-0 border-0 p-0", className)}
        >
            {label && (
                <legend
                    className={cn(
                        "mb-3 font-family-hand text-lg font-black text-black",
                        legendClassName
                    )}
                >
                    {label}
                </legend>
            )}

            <div
                className={cn(
                    "flex",
                    orientation === "horizontal"
                        ? "flex-wrap items-start gap-6"
                        : "flex-col gap-3",
                )}
            >
                {items.map((item) => {
                    const checked = selected === item.value
                    const itemDisabled = disabled || item.disabled

                    return (
                        <label
                            key={item.value}
                            className={cn(
                                "inline-flex items-start gap-3 select-none",
                                itemDisabled
                                    ? "cursor-not-allowed opacity-60"
                                    : "cursor-pointer",
                                itemClassName
                            )}
                        >
                            <input
                                type="radio"
                                name={groupName}
                                value={item.value}
                                checked={checked}
                                disabled={itemDisabled}
                                onChange={() => handleChange(item.value)}
                                className="peer sr-only"
                            />

                            <span
                                className={cn(
                                    "relative inline-flex shrink-0 rounded-full outline-none",
                                    "peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2",
                                    indicatorClassName
                                )}
                                style={{
                                    width: pixelSize,
                                    height: pixelSize,
                                }}
                            >
                                <RadioIndicator
                                    checked={checked}
                                    size={pixelSize}
                                    shape={shape}
                                    variant={variant}
                                    borderColor={borderColor}
                                    checkedColor={checkedColor}
                                    uncheckedColor={uncheckedColor}
                                    roughOptions={roughOptions}
                                />
                            </span>

                            <span className="flex flex-col">
                                <span
                                    className={cn(
                                        "font-family-gaegu text-base font-bold leading-tight text-black",
                                        labelClassName
                                    )}
                                >
                                    {item.label}
                                </span>

                                {item.description && (
                                    <span
                                        className={cn(
                                            "mt-0.5 font-family-gaegu text-sm text-black/60",
                                            descriptionClassName
                                        )}
                                    >
                                        {item.description}
                                    </span>
                                )}
                            </span>
                        </label>
                    )
                })}
            </div>
        </fieldset>
    )
}
