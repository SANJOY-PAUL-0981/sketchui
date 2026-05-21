"use client"

import "./style/Calender.css"
import {
    ButtonHTMLAttributes,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"

type CalenderVariant =
    | "paper"
    | "white"
    | "yellow"
    | "purple"
    | "green"
    | "pink"
    | "blue"
    | "gray"
    | "orange"
    | "red"
    | "sky"

type CalenderShape = "rectangle" | "rounded-rectangle"
type CalenderBorderStyle = "solid" | "dashed"

type FoldSide =
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"

type PageAnimation = "slide" | "flip" | "fade" | "none"

type RoughCalenderOptions = {
    seed?: number
    stroke?: string
    strokeWidth?: number
    fill?: string
    fillStyle?:
    | "solid"
    | "hachure"
    | "zigzag"
    | "cross-hatch"
    | "dots"
    | "dashed"
    | "zigzag-line"
    hachureGap?: number
    hachureAngle?: number
    roughness?: number
    bowing?: number
    dashLength?: number
    dashGap?: number
}

type CalenderProps = {
    value?: Date
    defaultValue?: Date
    onChange?: (date: Date) => void

    month?: Date
    defaultMonth?: Date
    onMonthChange?: (date: Date) => void

    minDate?: Date
    maxDate?: Date
    disabledDates?: Date[]
    isDateDisabled?: (date: Date) => boolean

    weekStartsOn?: 0 | 1

    variant?: CalenderVariant
    shape?: CalenderShape
    borderStyle?: CalenderBorderStyle

    borderColor?: string
    fillColor?: string
    textColor?: string
    mutedTextColor?: string
    selectedColor?: string
    hoverColor?: string
    foldedColor?: string
    shadowColor?: string

    showShadow?: boolean

    foldedCorner?: boolean
    foldSide?: FoldSide
    foldSize?: number

    pageAnimation?: PageAnimation

    radius?: number
    padding?: number
    width?: number | string

    roughOptions?: RoughCalenderOptions

    className?: string
    headerClassName?: string
    dayClassName?: string
}

const colors: Record<CalenderVariant, string> = {
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

const weekDaysSunday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const weekDaysMonday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function startOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isSameDay(a?: Date, b?: Date) {
    if (!a || !b) return false

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

function isSameMonth(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth()
    )
}

function addMonths(date: Date, amount: number) {
    return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function getMonthMatrix(month: Date, weekStartsOn: 0 | 1) {
    const year = month.getFullYear()
    const monthIndex = month.getMonth()

    const firstDay = new Date(year, monthIndex, 1)
    const firstDayIndex = firstDay.getDay()

    const offset =
        weekStartsOn === 1
            ? firstDayIndex === 0
                ? 6
                : firstDayIndex - 1
            : firstDayIndex

    const start = new Date(year, monthIndex, 1 - offset)

    const days: Date[] = []

    for (let i = 0; i < 42; i++) {
        days.push(
            new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate() + i
            )
        )
    }

    return days
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

function getFoldPath(
    width: number,
    height: number,
    size: number,
    side: FoldSide
) {
    if (side === "top-right") {
        return `M ${width - size} 6 L ${width - 6} 6 L ${width - 6} ${size + 6
            } Z`
    }

    if (side === "top-left") {
        return `M 6 6 L ${size + 6} 6 L 6 ${size + 6} Z`
    }

    if (side === "bottom-right") {
        return `M ${width - 6} ${height - size - 6} L ${width - 6} ${height - 6
            } L ${width - size - 6} ${height - 6} Z`
    }

    return `M 6 ${height - size - 6} L 6 ${height - 6} L ${size + 6} ${height - 6
        } Z`
}

function SketchCircle({
    active,
    color,
    borderColor,
    roughness = 1.4,
    className,
}: {
    active: boolean
    color: string
    borderColor: string
    roughness?: number
    className?: string
}) {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg || !active) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const node = rc.circle(20, 20, 32, {
            seed: 900,
            stroke: borderColor,
            strokeWidth: 1.8,
            fill: color,
            fillStyle: "solid",
            roughness,
            bowing: 0.8,
        })

        svg.appendChild(node)
    }, [active, color, borderColor, roughness])

    if (!active) return null

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 40 40"
            className={cn(
                "pointer-events-none absolute inset-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 overflow-visible",
                className
            )}
            aria-hidden="true"
        />
    )
}

function NavButton({
    children,
    className,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            className={cn(
                "grid size-9 place-items-center rounded-full font-black text-black",
                "transition-transform duration-150 hover:-translate-y-0.5 active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export function Calender({
    value,
    defaultValue,
    onChange,

    month,
    defaultMonth,
    onMonthChange,

    minDate,
    maxDate,
    disabledDates = [],
    isDateDisabled,

    weekStartsOn = 0,

    variant = "paper",
    shape = "rounded-rectangle",
    borderStyle = "dashed",

    borderColor = "#111",
    fillColor,
    textColor = "#111",
    mutedTextColor = "rgba(17,17,17,0.45)",
    selectedColor = "#fde047",
    hoverColor = "rgba(17,17,17,0.08)",
    foldedColor = "#fef3c7",
    shadowColor = "#111",

    showShadow = false,

    foldedCorner = false,
    foldSide = "top-right",
    foldSize = 42,

    pageAnimation = "slide",

    radius = 26,
    padding = 20,
    width = 360,

    roughOptions,

    className,
    headerClassName,
    dayClassName,
}: CalenderProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)

    const isControlledValue = value !== undefined
    const isControlledMonth = month !== undefined

    const [internalValue, setInternalValue] = useState<Date | undefined>(
        defaultValue
    )

    const [internalMonth, setInternalMonth] = useState<Date>(
        defaultMonth ?? value ?? defaultValue ?? new Date()
    )

    const [direction, setDirection] = useState<"next" | "prev">("next")
    const [animationKey, setAnimationKey] = useState(0)

    const selectedDate = isControlledValue ? value : internalValue
    const currentMonth = isControlledMonth ? month! : internalMonth

    const finalFill = fillColor ?? colors[variant]

    const days = useMemo(
        () => getMonthMatrix(currentMonth, weekStartsOn),
        [currentMonth, weekStartsOn]
    )

    const weekDays = weekStartsOn === 1 ? weekDaysMonday : weekDaysSunday

    function disabled(date: Date) {
        const d = startOfDay(date)

        if (minDate && d < startOfDay(minDate)) return true
        if (maxDate && d > startOfDay(maxDate)) return true

        if (disabledDates.some((disabledDate) => isSameDay(disabledDate, d))) {
            return true
        }

        return isDateDisabled?.(d) ?? false
    }

    function selectDate(date: Date) {
        if (disabled(date)) return

        const finalDate = startOfDay(date)

        if (!isControlledValue) {
            setInternalValue(finalDate)
        }

        onChange?.(finalDate)
    }

    function changeMonth(amount: number) {
        const nextMonth = addMonths(currentMonth, amount)

        setDirection(amount > 0 ? "next" : "prev")
        setAnimationKey((prev) => prev + 1)

        if (!isControlledMonth) {
            setInternalMonth(nextMonth)
        }

        onMonthChange?.(nextMonth)
    }

    useEffect(() => {
        const svg = svgRef.current
        const wrapper = wrapperRef.current

        if (!svg || !wrapper) return

        svg.replaceChildren()

        const rect = wrapper.getBoundingClientRect()

        const x = 6
        const y = 6
        const drawWidth = rect.width - x * 2
        const drawHeight = rect.height - y * 2

        if (drawWidth <= 0 || drawHeight <= 0) return

        const rc = rough.svg(svg)

        const options = {
            seed: roughOptions?.seed ?? 700,
            stroke: roughOptions?.stroke ?? borderColor,
            strokeWidth: roughOptions?.strokeWidth ?? 1.8,
            fill: roughOptions?.fill ?? finalFill,
            fillStyle: roughOptions?.fillStyle ?? "solid",
            hachureGap: roughOptions?.hachureGap ?? 8,
            hachureAngle: roughOptions?.hachureAngle ?? -10,
            roughness: roughOptions?.roughness ?? 1.25,
            bowing: roughOptions?.bowing ?? 0.8,
            strokeLineDash:
                borderStyle === "dashed"
                    ? [
                        roughOptions?.dashLength ?? 10,
                        roughOptions?.dashGap ?? 8,
                    ]
                    : undefined,
        }

        const node =
            shape === "rounded-rectangle"
                ? rc.path(
                    roundedRectPath(x, y, drawWidth, drawHeight, radius),
                    options
                )
                : rc.rectangle(x, y, drawWidth, drawHeight, options)

        svg.appendChild(node)

        if (foldedCorner) {
            const fold = rc.path(
                getFoldPath(rect.width, rect.height, foldSize, foldSide),
                {
                    seed: 710,
                    stroke: borderColor,
                    strokeWidth: 1.5,
                    fill: foldedColor,
                    fillStyle: "solid",
                    roughness: 1.15,
                    bowing: 0.7,
                }
            )

            svg.appendChild(fold)
        }
    }, [
        variant,
        shape,
        borderStyle,
        borderColor,
        finalFill,
        foldedCorner,
        foldSide,
        foldSize,
        foldedColor,
        radius,
        roughOptions,
    ])

    return (
        <div
            ref={wrapperRef}
            className={cn("relative overflow-visible", className)}
            style={{
                width,
                filter: showShadow
                    ? `drop-shadow(7px 7px 0 ${shadowColor})`
                    : undefined,
            }}
        >
            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
            />

            <div
                className="relative z-10"
                style={{
                    padding,
                    color: textColor,
                }}
            >
                <div
                    className={cn(
                        "mb-4 flex items-center justify-between gap-3",
                        headerClassName
                    )}
                >
                    <NavButton
                        onClick={() => changeMonth(-1)}
                        aria-label="Previous month"
                    >
                        ←
                    </NavButton>

                    <div className="text-center">
                        <p className="font-family-hand text-xl font-black leading-none max-md:text-lg">
                            {monthNames[currentMonth.getMonth()]}
                        </p>
                        <p className="mt-1 font-family-gaegu text-sm font-black opacity-60">
                            {currentMonth.getFullYear()}
                        </p>
                    </div>

                    <NavButton
                        onClick={() => changeMonth(1)}
                        aria-label="Next month"
                    >
                        →
                    </NavButton>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                    {weekDays.map((day) => (
                        <div
                            key={day}
                            className="grid h-8 place-items-center font-family-gaegu text-xs font-black uppercase tracking-wide opacity-60"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div
                    key={animationKey}
                    className={cn(
                        "mt-1 grid grid-cols-7 gap-1.5",
                        pageAnimation === "slide" &&
                        (direction === "next"
                            ? "animate-sketch-calendar-slide-next"
                            : "animate-sketch-calendar-slide-prev"),
                        pageAnimation === "flip" &&
                        "animate-sketch-calendar-flip",
                        pageAnimation === "fade" &&
                        "animate-sketch-calendar-fade"
                    )}
                >
                    {days.map((date) => {
                        const isCurrentMonth = isSameMonth(date, currentMonth)
                        const isSelected = isSameDay(date, selectedDate)
                        const isToday = isSameDay(date, new Date())
                        const isDisabled = disabled(date)

                        return (
                            <button
                                key={date.toISOString()}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => selectDate(date)}
                                className={cn(
                                    "group relative grid aspect-square place-items-center rounded-full",
                                    "font-family-gaegu text-base font-black",
                                    "transition-transform duration-150 ease-out",
                                    "hover:-translate-y-0.5 active:scale-95",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black",
                                    isDisabled &&
                                    "cursor-not-allowed opacity-30 hover:translate-y-0 active:scale-100",
                                    dayClassName
                                )}
                                style={{
                                    color: isCurrentMonth
                                        ? textColor
                                        : mutedTextColor,
                                }}
                            >
                                {!isSelected && !isDisabled && (
                                    <span
                                        className="pointer-events-none absolute inset-1 rounded-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                                        style={{
                                            backgroundColor: hoverColor,
                                        }}
                                    />
                                )}

                                <SketchCircle
                                    active={isSelected}
                                    color={selectedColor}
                                    borderColor={borderColor}
                                />

                                {isToday && !isSelected && (
                                    <span
                                        className="absolute bottom-1 h-1.5 w-1.5 rounded-full"
                                        style={{
                                            backgroundColor: borderColor,
                                        }}
                                    />
                                )}

                                <span className="relative z-10">
                                    {date.getDate()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}