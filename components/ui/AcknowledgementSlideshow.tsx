"use client"

import "./style/AcknowledgementSlideshow.css"

import {
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
} from "react"
import rough from "roughjs"
import { cn } from "@/lib/utils"
import { Avatar } from "./Avatar"
import { Card } from "./Card"

type AcknowledgementAvatarVariant =
    | "gray"
    | "paper"
    | "yellow"
    | "purple"
    | "green"
    | "pink"
    | "blue"
    | "white"

export type AcknowledgementItem = {
    name: string
    role?: string
    message: string
    avatarSrc?: string
    avatarVariant?: AcknowledgementAvatarVariant
}

type AcknowledgementVariant =
    | "yellow"
    | "purple"
    | "green"
    | "pink"
    | "blue"
    | "gray"
    | "silver"
    | "red"
    | "orange"
    | "sky"
    | "paper"

type AcknowledgementBorderStyle = "rough" | "dashed" | "project-corner"

type RoughAcknowledgementOptions = {
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

type AcknowledgementSlideshowProps = {
    items: AcknowledgementItem[]
    title?: string
    subtitle?: string

    activeIndex?: number
    defaultActiveIndex?: number
    onActiveIndexChange?: (index: number) => void

    autoPlay?: boolean
    interval?: number
    loop?: boolean

    showArrows?: boolean
    showDots?: boolean
    showQuoteIcon?: boolean

    variant?: AcknowledgementVariant
    borderStyle?: AcknowledgementBorderStyle
    width?: number | string
    height?: number

    roughOptions?: RoughAcknowledgementOptions

    className?: string
    cardClassName?: string
    slideClassName?: string
    arrowClassName?: string
    dotClassName?: string
    titleClassName?: string
    subtitleClassName?: string
}

type Direction = "next" | "prev"

function QuoteDoodle() {
    return (
        <svg
            viewBox="0 0 64 56"
            className="h-12 w-14 shrink-0 text-black/80"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M6 33 C6 18 15 9 29 8 L29 17 C20 18 15 23 14 30 L24 30 L24 45 L6 45 Z"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M36 33 C36 18 45 9 59 8 L59 17 C50 18 45 23 44 30 L54 30 L54 45 L36 45 Z"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function SketchArrowButton({
    direction,
    onClick,
    className,
}: {
    direction: Direction
    onClick: () => void
    className?: string
}) {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.replaceChildren()

        const rc = rough.svg(svg)
        const node = rc.circle(20, 20, 36, {
            seed: direction === "prev" ? 610 : 620,
            stroke: "#111",
            strokeWidth: 1.8,
            fill: "#fffbf2",
            fillStyle: "solid",
            roughness: 1.3,
            bowing: 0.8,
        })

        svg.appendChild(node)
    }, [direction])

    return (
        <button
            type="button"
            aria-label={
                direction === "prev"
                    ? "Previous acknowledgement"
                    : "Next acknowledgement"
            }
            onClick={onClick}
            className={cn(
                "relative grid size-10 shrink-0 place-items-center rounded-full outline-none",
                "transition-transform duration-150 hover:-translate-y-0.5 active:scale-95",
                "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                className
            )}
        >
            <svg
                ref={svgRef}
                viewBox="0 0 40 40"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
            />
            <span className="relative z-10 font-family-hand text-lg font-black text-black">
                {direction === "prev" ? "←" : "→"}
            </span>
        </button>
    )
}

export function AcknowledgementSlideshow({
    items,
    title,
    subtitle,

    activeIndex,
    defaultActiveIndex = 0,
    onActiveIndexChange,

    autoPlay = true,
    interval = 4000,
    loop = true,

    showArrows = true,
    showDots = true,
    showQuoteIcon = true,

    variant = "paper",
    borderStyle = "rough",
    width = "100%",
    height = 280,

    roughOptions,

    className,
    cardClassName,
    slideClassName,
    arrowClassName,
    dotClassName,
    titleClassName,
    subtitleClassName,
}: AcknowledgementSlideshowProps) {
    const isControlled = activeIndex !== undefined

    const [internalIndex, setInternalIndex] = useState(defaultActiveIndex)
    const [direction, setDirection] = useState<Direction>("next")
    const [paused, setPaused] = useState(false)

    const count = items.length
    const requestedIndex = isControlled ? activeIndex : internalIndex
    const currentIndex =
        count === 0
            ? 0
            : ((requestedIndex % count) + count) % count
    const currentItem = items[currentIndex]

    useEffect(() => {
        if (!autoPlay || paused || count <= 1) return

        const timer = setTimeout(() => {
            setDirection("next")

            const nextIndex = loop
                ? (currentIndex + 1) % count
                : Math.min(count - 1, currentIndex + 1)

            if (!isControlled) {
                setInternalIndex(nextIndex)
            }

            onActiveIndexChange?.(nextIndex)
        }, interval)

        return () => clearTimeout(timer)
    }, [
        autoPlay,
        paused,
        count,
        interval,
        loop,
        currentIndex,
        isControlled,
        onActiveIndexChange,
    ])

    function goTo(index: number, nextDirection?: Direction) {
        if (count === 0) return

        const resolvedIndex = loop
            ? ((index % count) + count) % count
            : Math.min(count - 1, Math.max(0, index))

        setDirection(nextDirection ?? (resolvedIndex >= currentIndex ? "next" : "prev"))

        if (!isControlled) {
            setInternalIndex(resolvedIndex)
        }

        onActiveIndexChange?.(resolvedIndex)
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === "ArrowRight") {
            event.preventDefault()
            goTo(currentIndex + 1, "next")
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault()
            goTo(currentIndex - 1, "prev")
        }
    }

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={title ?? "Acknowledgements"}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className={cn(
                "relative w-full outline-none",
                "focus-visible:ring-2 focus-visible:ring-black",
                className
            )}
            style={{ width }}
        >
            {(title || subtitle) && (
                <div className="mb-6">
                    {title && (
                        <h2
                            className={cn(
                                "font-family-hand text-3xl font-black leading-tight",
                                titleClassName
                            )}
                        >
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p
                            className={cn(
                                "mt-2 font-family-gaegu text-lg text-black/70",
                                subtitleClassName
                            )}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            <Card
                variant={variant}
                borderStyle={borderStyle}
                width="100%"
                height={height}
                className={cardClassName}
                contentClassName="h-full"
                roughOptions={roughOptions}
            >
                {!currentItem ? (
                    <div className="flex h-full items-center justify-center font-family-gaegu text-lg text-black/60">
                        No acknowledgements to show.
                    </div>
                ) : (
                    <div
                        key={`${currentIndex}-${direction}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${currentIndex + 1} of ${count}`}
                        className={cn(
                            "relative flex h-full flex-col",
                            direction === "next"
                                ? "sketch-ack-slide-next"
                                : "sketch-ack-slide-prev",
                            slideClassName
                        )}
                    >
                        {showQuoteIcon && <QuoteDoodle />}

                        <p className="mt-2 flex-1 font-family-gaegu text-lg leading-relaxed text-black">
                            “{currentItem.message}”
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            <Avatar
                                name={currentItem.name}
                                src={currentItem.avatarSrc}
                                variant={currentItem.avatarVariant ?? "green"}
                                showInitials
                            />

                            <div className="min-w-0">
                                <p className="font-family-hand text-xl font-black">
                                    {currentItem.name}
                                </p>
                                {currentItem.role && (
                                    <p className="font-family-gaegu text-base text-black/60">
                                        {currentItem.role}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Card>

            {(showArrows || showDots) && count > 0 && (
                <div className="mt-6 flex items-center justify-center gap-6">
                    {showArrows && (
                        <SketchArrowButton
                            direction="prev"
                            onClick={() => goTo(currentIndex - 1, "prev")}
                            className={arrowClassName}
                        />
                    )}

                    {showDots && count > 1 && (
                        <div className="flex items-center gap-3">
                            {items.map((item, index) => (
                                <button
                                    key={`${item.name}-${index}`}
                                    type="button"
                                    aria-label={`Go to acknowledgement ${index + 1}`}
                                    aria-current={
                                        index === currentIndex ? "true" : undefined
                                    }
                                    onClick={() => goTo(index)}
                                    className={cn(
                                        "size-4 rounded-full border-2 border-black transition-all",
                                        "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black",
                                        index === currentIndex
                                            ? "bg-black"
                                            : "bg-white",
                                        dotClassName
                                    )}
                                />
                            ))}
                        </div>
                    )}

                    {showArrows && (
                        <SketchArrowButton
                            direction="next"
                            onClick={() => goTo(currentIndex + 1, "next")}
                            className={arrowClassName}
                        />
                    )}
                </div>
            )}
        </div>
    )
}
