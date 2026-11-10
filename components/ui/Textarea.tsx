
"use client"

import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    type TextareaHTMLAttributes,
} from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type TextAreaSize = "sm" | "md" | "lg"

type TextAreaShape =
    | "rectangle"
    | "rounded-rectangle"
    | "pill"

type TextAreaVariant =
    | "yellow"
    | "purple"
    | "green"
    | "pink"
    | "blue"
    | "gray"
    | "paper"

type RoughTextAreaOptions = {
    seed?: number
    stroke?: string
    strokeWidth?: number
    roughness?: number
    bowing?: number
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    helperText?: string
    error?: string

    size?: TextAreaSize
    shape?: TextAreaShape
    variant?: TextAreaVariant

    width?: number | string
    height?: number | string

    borderColor?: string
    bgColor?: string
    radius?: number
    rotate?: number

    roughOptions?: RoughTextAreaOptions

    textareaClassName?: string
}

const variantColors: Record<TextAreaVariant, string> = {
    yellow: "#d4a017",
    purple: "#9333ea",
    green: "#16a34a",
    pink: "#db2777",
    blue: "#2563eb",
    gray: "#6b7280",
    paper: "#292524",
}

const sizeStyles: Record<TextAreaSize, string> = {
    sm: "text-sm p-2.5",
    md: "text-base p-3",
    lg: "text-lg p-4",
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            label,
            helperText,
            error,

            size = "md",
            shape = "rounded-rectangle",
            variant = "paper",

            width = "100%",
            height = 120,

            borderColor,
            bgColor = "transparent",
            radius = 12,
            rotate = 0,

            roughOptions = {},

            className,
            textareaClassName,

            disabled,
            readOnly,

            rows = 4,
            style,

            ...props
        },
        forwardedRef
    ) => {
        const wrapperRef = useRef<HTMLDivElement>(null)
        const svgRef = useRef<SVGSVGElement>(null)
        const textareaRef = useRef<HTMLTextAreaElement>(null)

        useImperativeHandle(
            forwardedRef,
            () => textareaRef.current!
        )

        useEffect(() => {
            const wrapper = wrapperRef.current
            const svg = svgRef.current

            if (!wrapper || !svg) return

            const drawBorder = () => {
                const rect = wrapper.getBoundingClientRect()
                const w = rect.width
                const h = rect.height

                if (!w || !h) return

                svg.setAttribute("width", String(w))
                svg.setAttribute("height", String(h))
                svg.setAttribute("viewBox", `0 0 ${w} ${h}`)

                svg.replaceChildren()

                const rc = rough.svg(svg)

                const stroke =
                    error
                        ? "#dc2626"
                        : borderColor ??
                        roughOptions.stroke ??
                        variantColors[variant]

                const options = {
                    seed: roughOptions.seed ?? 12,
                    stroke,
                    strokeWidth: roughOptions.strokeWidth ?? 1.8,
                    roughness: roughOptions.roughness ?? 1.2,
                    bowing: roughOptions.bowing ?? 1,
                    fill: "none",
                }

                let node: SVGElement

                if (shape === "rectangle") {
                    node = rc.rectangle(0, 0, w, h, options)
                } else {
                    const r =
                        shape === "pill"
                            ? Math.min(h / 2, w / 2)
                            : Math.min(radius, h / 2, w / 2)

                    const path = `
                        M ${r} 0
                        H ${w - r}
                        Q ${w} 0 ${w} ${r}
                        V ${h - r}
                        Q ${w} ${h} ${w - r} ${h}
                        H ${r}
                        Q 0 ${h} 0 ${h - r}
                        V ${r}
                        Q 0 0 ${r} 0
                        Z
                    `

                    node = rc.path(path, options)
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
            variant,
            borderColor,
            error,
            roughOptions,
        ])

        return (
            <div
                className={cn("flex flex-col gap-2", className)}
                style={{ width }}
            >
                {label && (
                    <label className="text-sm font-medium">
                        {label}
                        {props.required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </label>
                )}

                <div
                    ref={wrapperRef}
                    className="relative"
                    style={{
                        width: "100%",
                        height,
                        transform: rotate
                            ? `rotate(${rotate}deg)`
                            : undefined,
                        backgroundColor: bgColor,
                    }}
                >
                    <svg
                        ref={svgRef}
                        className="pointer-events-none absolute inset-0 z-10"
                        style={{
                            overflow: "visible",
                            width: "100%",
                            height: "100%",
                        }}
                    />

                    <textarea
                        ref={textareaRef}
                        rows={rows}
                        disabled={disabled}
                        readOnly={readOnly}
                        aria-invalid={!!error}
                        className={cn(
                            "relative z-0 h-full w-full resize-none",
                            "border-0 bg-transparent outline-none",
                            "focus-visible:outline-none",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "placeholder:text-muted-foreground",
                            sizeStyles[size],
                            textareaClassName
                        )}
                        style={{
                            boxSizing: "border-box",
                            backgroundColor: bgColor,
                            resize: "none",
                            ...style,
                        }}
                        {...props}
                    />
                </div>

                {(error || helperText) && (
                    <p
                        className={cn(
                            "text-xs",
                            error
                                ? "text-red-500"
                                : "text-muted-foreground"
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        )
    }
)

Textarea.displayName = "TextArea"
