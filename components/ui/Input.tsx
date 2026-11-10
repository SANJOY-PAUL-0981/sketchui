
"use client"

import {
    forwardRef,
    useEffect,
    useRef,
    type InputHTMLAttributes,
} from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type InputSize = "sm" | "md" | "lg"
type InputShape = "rectangle" | "rounded-rectangle" | "pill"

type InputVariant =
    | "yellow"
    | "purple"
    | "green"
    | "pink"
    | "blue"
    | "gray"
    | "paper"

type RoughInputOptions = {
    seed?: number
    stroke?: string
    strokeWidth?: number
    roughness?: number
    bowing?: number
}

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size"
> & {
    label?: string
    helperText?: string
    error?: string
    size?: InputSize
    shape?: InputShape
    variant?: InputVariant
    height?: number | string
    width?: number | string
    borderColor?: string
    bgColor?: string
    radius?: number
    rotate?: number
    roughOptions?: RoughInputOptions
    inputClassName?: string
}

const variants: Record<
    InputVariant,
    { border: string }
> = {
    yellow: { border: "#d4a017" },
    purple: { border: "#9333ea" },
    green: { border: "#16a34a" },
    pink: { border: "#db2777" },
    blue: { border: "#2563eb" },
    gray: { border: "#6b7280" },
    paper: { border: "#292524" },
}

const sizes: Record<InputSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-base",
    lg: "h-14 px-5 text-lg",
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            helperText,
            error,
            size = "md",
            shape = "rectangle",
            variant = "paper",
            width = "100%",
            height = 44,
            borderColor,
            bgColor,
            radius = 12,
            rotate = 0,
            roughOptions,
            className,
            inputClassName,
            disabled,
            type = "text",
            ...props
        },
        forwardedRef
    ) => {
        const wrapperRef = useRef<HTMLDivElement>(null)
        const svgRef = useRef<SVGSVGElement>(null)

        const colors = variants[variant]

        const stroke = roughOptions?.stroke ?? borderColor ?? colors.border
        const strokeWidth = roughOptions?.strokeWidth ?? 1.8
        const roughness = roughOptions?.roughness ?? 1.2
        const bowing = roughOptions?.bowing ?? 1
        const seed = roughOptions?.seed ?? 12

        useEffect(() => {
            const wrapper = wrapperRef.current
            const svg = svgRef.current

            if (!wrapper || !svg) return

            const drawBorder = () => {
                const { width, height } = wrapper.getBoundingClientRect()

                if (!width || !height) return

                svg.innerHTML = ""
                svg.setAttribute("width", String(width))
                svg.setAttribute("height", String(height))
                svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

                const rc = rough.svg(svg)

                const options = {
                    seed,
                    stroke,
                    strokeWidth,
                    roughness,
                    bowing,
                    fill: "none",
                }

                let node: SVGGElement

                if (shape === "pill") {
                    const r = height / 2

                    const path = `
                        M ${r} 1
                        L ${width - r} 1
                        Q ${width - 1} 1 ${width - 1} ${r}
                        Q ${width - 1} ${height - 1} ${width - r} ${height - 1}
                        L ${r} ${height - 1}
                        Q 1 ${height - 1} 1 ${r}
                        Q 1 1 ${r} 1
                        Z
                    `

                    node = rc.path(path, options)
                } else if (shape === "rounded-rectangle") {
                    const r = Math.min(radius, width / 2, height / 2)

                    const path = `
                        M ${r} 1
                        L ${width - r} 1
                        Q ${width - 1} 1 ${width - 1} ${r}
                        L ${width - 1} ${height - r}
                        Q ${width - 1} ${height - 1} ${width - r} ${height - 1}
                        L ${r} ${height - 1}
                        Q 1 ${height - 1} 1 ${height - r}
                        L 1 ${r}
                        Q 1 1 ${r} 1
                        Z
                    `

                    node = rc.path(path, options)
                } else {
                    node = rc.rectangle(
                        1,
                        1,
                        width - 2,
                        height - 2,
                        options
                    )
                }

                svg.appendChild(node)
            }

            drawBorder()

            const observer = new ResizeObserver(drawBorder)
            observer.observe(wrapper)

            return () => observer.disconnect()
        }, [
            shape,
            radius,
            stroke,
            strokeWidth,
            roughness,
            bowing,
            seed,
        ])

        return (
            <div
                className={cn("flex flex-col gap-1.5", className)}
                style={{ width }}
            >
                {label && (
                    <label
                        className="font-family-hand text-base font-bold"
                        htmlFor={props.id}
                    >
                        {label}
                        {props.required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </label>
                )}

                <div
                    ref={wrapperRef}
                    className={cn(
                        "relative isolate flex items-center",
                        "transition-transform duration-200",
                        "focus-within:-translate-y-0.5",
                        disabled && "cursor-not-allowed opacity-50"
                    )}
                    style={{
                        backgroundColor: bgColor ?? "transparent",
                        borderRadius:
                            shape === "pill"
                                ? 9999
                                : shape === "rounded-rectangle"
                                  ? radius
                                  : 0,
                        transform: `rotate(${rotate}deg)`,
                    }}
                >
                    <svg
                        ref={svgRef}
                        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
                    />

                    <input
                        {...props}
                        ref={forwardedRef}
                        type={type}
                        disabled={disabled}
                        aria-invalid={!!error || props["aria-invalid"]}
                        className={cn(
                            "relative z-10 w-full bg-transparent outline-none",
                            "font-family-gaegu text-black placeholder:text-black/40",
                            "disabled:cursor-not-allowed",
                            "focus:outline-none",
                            sizes[size],
                            inputClassName
                        )}
                    />
                </div>

                {(error || helperText) && (
                    <p
                        className={cn(
                            "font-family-gaegu text-sm",
                            error ? "text-red-600" : "text-black/60"
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = "Input"
