"use client"

import {
    useEffect,
    useId,
    useRef,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
} from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"
import { Calender } from "./Calender"

type DatePickerVariant = "paper" | "white" | "yellow" | "purple" | "green" | "pink" | "blue" | "gray" | "orange" | "red" | "sky"

type DatePickerShape = "rectangle" | "rounded-rectangle"

type DatePickerBorderStyle = "solid" | "dashed"

type DatePickerPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end"

type DatePickerPageAnimation = "slide" | "flip" | "fade" | "none"

type RoughDatePickerOptions = {
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

type DatePickerProps = {
    value?: Date
    defaultValue?: Date
    onChange?: (date: Date | undefined) => void
    defaultOpen?: boolean
    placeholder?: string
    formatDate?: (date: Date) => string
    clearable?: boolean
    closeOnSelect?: boolean
    label?: string
    disabled?: boolean

    variant?: DatePickerVariant
    shape?: DatePickerShape
    borderStyle?: DatePickerBorderStyle
    placement?: DatePickerPlacement

    width?: number | string
    height?: number
    calendarWidth?: number | string

    weekStartsOn?: 0 | 1
    minDate?: Date
    maxDate?: Date
    disabledDates?: Date[]
    isDateDisabled?: (date: Date) => boolean

    selectedColor?: string
    showShadow?: boolean
    pageAnimation?: DatePickerPageAnimation

    borderColor?: string
    fillColor?: string
    textColor?: string

    roughOptions?: RoughDatePickerOptions

    className?: string
    triggerClassName?: string
    popoverClassName?: string
    calendarClassName?: string
    clearButtonClassName?: string
}

const colors: Record<DatePickerVariant, string> = {
    paper: "#fffbf2",
    white: "#ffffff",
    yellow: "#fef3c7",
    purple: "#d8c7ff",
    green: "#bbf7d0",
    pink: "#fbcfe8",
    blue: "#bfdbfe",
    gray: "#e5e7eb",
    orange: "#fed7aa",
    red: "#fecaca",
    sky: "#bae6fd",
}

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

function defaultFormatDate(date: Date) {
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
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

function getPlacementClasses(placement: DatePickerPlacement) {
    if (placement === "bottom-start") {
        return "left-0 top-full mt-2 origin-top-left"
    }

    if (placement === "bottom-end") {
        return "right-0 top-full mt-2 origin-top-right"
    }

    if (placement === "top-start") {
        return "left-0 bottom-full mb-2 origin-bottom-left"
    }

    return "right-0 bottom-full mb-2 origin-bottom-right"
}

function CalendarDoodle() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-4 shrink-0"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M4 6.5 19 6 M4 6.5 4 19 M19 6 19 19 M4 19 19 19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 10.5 19 10.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M8 4.5 8 8 M15 4.5 15 8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M8.5 14.5 8.7 14.5 M12 14.5 12.2 14.5 M15.5 14.5 15.7 14.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
        </svg>
    )
}

export function DatePicker({
    value,
    defaultValue,
    onChange,
    defaultOpen = false,
    placeholder = "Pick a date",
    formatDate,
    clearable = true,
    closeOnSelect = true,
    label = "Pick a date",
    disabled = false,

    variant = "paper",
    shape = "rounded-rectangle",
    borderStyle = "solid",
    placement = "bottom-start",

    width = 260,
    height = 48,
    calendarWidth = 300,

    weekStartsOn = 0,
    minDate,
    maxDate,
    disabledDates,
    isDateDisabled,

    selectedColor = "#fde047",
    showShadow = false,
    pageAnimation = "slide",

    borderColor,
    fillColor,
    textColor = "#111",

    roughOptions,

    className,
    triggerClassName,
    popoverClassName,
    calendarClassName,
    clearButtonClassName,
}: DatePickerProps) {
    const wrapperRef = useRef<HTMLSpanElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)

    const popoverId = useId()

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue)
    const [open, setOpen] = useState(defaultOpen)

    const selected = isControlled ? value : internalValue
    const radius = Math.min(14, height / 2 - 2)

    useEffect(() => {
        const trigger = triggerRef.current
        const svg = svgRef.current

        if (!trigger || !svg) return

        const draw = () => {
            const rect = trigger.getBoundingClientRect()
            const drawWidth = rect.width
            const drawHeight = rect.height

            if (drawWidth <= 0 || drawHeight <= 0) return

            svg.replaceChildren()
            svg.setAttribute("viewBox", `0 0 ${drawWidth} ${drawHeight}`)

            const rc = rough.svg(svg)

            const options = {
                seed: roughOptions?.seed ?? 330,
                stroke: roughOptions?.stroke ?? borderColor ?? "#111",
                strokeWidth: roughOptions?.strokeWidth ?? 1.8,
                fill: roughOptions?.fill ?? fillColor ?? colors[variant],
                fillStyle: roughOptions?.fillStyle ?? "solid",
                hachureGap: roughOptions?.hachureGap ?? 7,
                hachureAngle: roughOptions?.hachureAngle ?? -10,
                roughness: roughOptions?.roughness ?? 1.4,
                bowing: roughOptions?.bowing ?? 0.8,
                strokeLineDash: borderStyle === "dashed" ? [8, 6] : undefined,
            }

            const node =
                shape === "rounded-rectangle"
                    ? rc.path(
                        roundedRectPath(2, 2, drawWidth - 4, drawHeight - 4, radius),
                        options
                    )
                    : rc.rectangle(2, 2, drawWidth - 4, drawHeight - 4, options)

            svg.appendChild(node)
        }

        draw()

        const observer = new ResizeObserver(draw)
        observer.observe(trigger)

        return () => observer.disconnect()
    }, [variant, shape, borderStyle, borderColor, fillColor, radius, roughOptions])

    useEffect(() => {
        if (!open) return

        function handlePointerDown(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false)
                triggerRef.current?.focus()
            }
        }

        document.addEventListener("mousedown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("mousedown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [open])

    function handleSelect(date: Date) {
        if (!isControlled) {
            setInternalValue(date)
        }

        onChange?.(date)

        if (closeOnSelect) {
            setOpen(false)
            triggerRef.current?.focus()
        }
    }

    function handleClear() {
        if (!isControlled) {
            setInternalValue(undefined)
        }

        onChange?.(undefined)
        setOpen(false)
        triggerRef.current?.focus()
    }

    function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
        if (event.key === "ArrowDown" && !disabled) {
            event.preventDefault()
            setOpen(true)
        }
    }

    return (
        <span
            ref={wrapperRef}
            className={cn("relative inline-flex", className)}
        >
            <button
                ref={triggerRef}
                type="button"
                aria-label={label}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={open ? popoverId : undefined}
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                onKeyDown={handleTriggerKeyDown}
                className={cn(
                    "relative inline-flex items-center justify-start rounded-lg px-3 outline-none",
                    "font-family-gaegu text-base font-bold text-black",
                    "transition-transform duration-150 ease-out",
                    "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                    !disabled && "active:scale-[0.98]",
                    triggerClassName
                )}
                style={{
                    width,
                    height,
                }}
            >
                <svg
                    ref={svgRef}
                    className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden="true"
                />

                <span
                    className="relative z-10 flex items-center gap-2 truncate"
                    style={{ color: textColor }}
                >
                    <CalendarDoodle />
                    <span className={cn("truncate", !selected && "text-black/45")}>
                        {selected
                            ? (formatDate ?? defaultFormatDate)(selected)
                            : placeholder}
                    </span>
                </span>
            </button>

            {open && (
                <div
                    id={popoverId}
                    role="dialog"
                    aria-label="Choose a date"
                    className={cn(
                        "absolute z-50 animate-sketch-calendar-fade",
                        getPlacementClasses(placement),
                        popoverClassName
                    )}
                >
                    <Calender
                        key={selected ? "datepicker-selected" : "datepicker-empty"}
                        value={selected}
                        onChange={handleSelect}
                        width={calendarWidth}
                        variant={variant}
                        shape={shape}
                        borderStyle={borderStyle}
                        borderColor={borderColor}
                        fillColor={fillColor}
                        textColor={textColor}
                        selectedColor={selectedColor}
                        showShadow={showShadow}
                        weekStartsOn={weekStartsOn}
                        minDate={minDate}
                        maxDate={maxDate}
                        disabledDates={disabledDates}
                        isDateDisabled={isDateDisabled}
                        pageAnimation={pageAnimation}
                        roughOptions={roughOptions}
                        className={calendarClassName}
                    />

                    {clearable && selected && (
                        <div className="mt-2 flex justify-center">
                            <button
                                type="button"
                                onClick={handleClear}
                                className={cn(
                                    "font-family-hand text-sm font-bold text-black/70 underline underline-offset-4 outline-none",
                                    "hover:text-black focus-visible:ring-2 focus-visible:ring-black",
                                    clearButtonClassName
                                )}
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            )}
        </span>
    )
}
