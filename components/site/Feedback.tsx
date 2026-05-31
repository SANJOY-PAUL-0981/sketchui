"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/Card"
import Image from "next/image"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Avatar } from "@/components/ui/Avatar"
import { Seperator } from "@/components/ui/Separator"
import { SketchBorder } from "@/components/ui/SketchBorder"

import quote from "@/public/doodles/quote.png"
import mail from "@/public/doodles/mail.png"

const testimonials = [
    {
        name: "John Doe",
        role: "Indie Developer",
        message:
            "SketchUi makes my interfaces stand out. The hand-drawn style is just perfect!",
    },
    {
        name: "Sarah Chen",
        role: "Frontend Engineer",
        message:
            "Finally a UI library that feels creative without sacrificing usability.",
    },
    {
        name: "Alex Kumar",
        role: "Product Designer",
        message:
            "The sketch aesthetic helped our product feel more approachable and memorable.",
    },
]

export function Feedback() {
    const [active, setActive] = useState(0)

    const [direction, setDirection] = useState<"next" | "prev">("next")

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection("next")
            setActive((prev) => (prev + 1) % testimonials.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative overflow-hidden bg-[#fffbf2] pt-16">
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-40"
                style={{
                    backgroundImage: `
                linear-gradient(rgba(59,130,246,0.18) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.18) 1px, transparent 1px)
            `,
                    backgroundSize: "34px 34px",
                }}
            />

            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `
                linear-gradient(rgba(59,130,246,0.35) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.35) 1px, transparent 1px)
            `,
                    backgroundSize: "170px 170px",
                }}
            />

            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-25"
                style={{
                    backgroundImage: `
                radial-gradient(circle at 12% 18%, rgba(17,17,17,0.45) 1.2px, transparent 1.4px),
                radial-gradient(circle at 82% 22%, rgba(17,17,17,0.35) 1.4px, transparent 1.6px),
                radial-gradient(circle at 30% 76%, rgba(17,17,17,0.35) 1px, transparent 1.2px),
                radial-gradient(circle at 72% 70%, rgba(17,17,17,0.35) 1px, transparent 1.2px)
            `,
                    backgroundSize:
                        "220px 180px, 260px 220px, 190px 240px, 280px 260px",
                }}
            />

            <div className="relative z-10">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-16 lg:grid-cols-2">
                        <div>
                            <Badge
                                variant="purple"
                                width={180}
                                height={30}
                                shape="rounded-rectangle"
                                borderColor="#b8b4ff"
                                roughOptions={{
                                    roughness: 0.5,
                                    strokeWidth: 3,
                                    fillStyle: "hachure",
                                    hachureGap: 2,
                                }}
                                className="font-family-hand"
                            >
                                LOVED BY DEVELOPERS
                            </Badge>

                            <h2 className="mt-6 font-family-hand text-4xl font-black leading-tight md:text-5xl">
                                What developers
                                <br />
                                are saying
                            </h2>

                            <div className="mt-10">
                                <Card
                                    height={280}
                                    variant="paper"
                                    contentClassName="h-full"
                                    roughOptions={{
                                        fillStyle: "zigzag",
                                        hachureGap: 3
                                    }}
                                >
                                    <div
                                        key={active}
                                        className={cn(
                                            "relative flex h-full flex-col",
                                            "animate-testimonial-slide"
                                        )}
                                    >
                                        <Image
                                            src={quote}
                                            alt=""
                                            width={50}
                                            height={50}
                                            className="absolute -left-2 -top-2"
                                        />

                                        <div className="mt-10 flex-1">
                                            <p className="font-family-gaegu text-2xl leading-relaxed">
                                                "
                                                {
                                                    testimonials[active]
                                                        .message
                                                }
                                                "
                                            </p>
                                        </div>

                                        <div className="mt-8 flex items-center gap-4">
                                            <Avatar
                                                className="font-family-gaegu"
                                                name={
                                                    testimonials[active]
                                                        .name
                                                }
                                                showInitials
                                                variant="green"
                                                roughOptions={{
                                                    roughness: 0.5
                                                }}
                                            />

                                            <div>
                                                <p className="font-family-hand text-xl font-bold">
                                                    {
                                                        testimonials[
                                                            active
                                                        ].name
                                                    }
                                                </p>

                                                <p className="font-family-gaegu text-lg text-black/60">
                                                    {
                                                        testimonials[
                                                            active
                                                        ].role
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <div className="mt-6 flex justify-center gap-3">
                                    {testimonials.map(
                                        (_, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setActive(
                                                        index
                                                    )
                                                }
                                                className={`h-4 w-4 rounded-full border-2 border-black transition-all ${active ===
                                                    index
                                                    ? "bg-black"
                                                    : "bg-white"
                                                    }`}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <Badge
                                variant="pink"
                                width={120}
                                height={30}
                                shape="rounded-rectangle"
                                borderColor="#FFC0CB"
                                className="font-family-hand"
                                roughOptions={{
                                    roughness: 0.5,
                                    strokeWidth: 3,
                                    fillStyle: "hachure",
                                    hachureGap: 2,
                                }}
                            >
                                GET IN TOUCH
                            </Badge>

                            <h2 className="mt-6 font-family-hand text-4xl font-black leading-tight md:text-5xl">
                                Have questions or
                                <br />
                                feedback?
                            </h2>

                            <p className="mt-6 max-w-md font-family-gaegu text-xl text-black/75">
                                We'd love to hear from you.
                                Send us a message and
                                we'll get back to you as
                                soon as possible.
                            </p>

                            <Image
                                src={mail}
                                alt=""
                                width={290}
                                height={290}
                                className="absolute -right-30 -top-20 max-md:w-[200px] max-md:-right-15 max-md:top-0"
                            />

                            <form className="mt-5 space-y-5">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <SketchBorder
                                        height={70}
                                        contentClassName="h-full px-4"
                                        shape="rounded-rectangle"
                                        radius={8}
                                        roughOptions={{
                                            roughness: 0.75
                                        }}
                                    >
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            className="h-full w-full bg-transparent font-family-gaegu text-lg outline-none placeholder:text-black/50"
                                        />
                                    </SketchBorder>

                                    <SketchBorder
                                        height={70}
                                        contentClassName="h-full px-4"
                                        shape="rounded-rectangle"
                                        radius={8}
                                        roughOptions={{
                                            roughness: 0.75
                                        }}
                                    >
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            className="h-full w-full bg-transparent font-family-gaegu text-lg outline-none placeholder:text-black/50"
                                        />
                                    </SketchBorder>
                                </div>

                                <SketchBorder
                                    height={150}
                                    contentClassName="h-full p-4"
                                    shape="rounded-rectangle"
                                    radius={8}
                                    roughOptions={{
                                        roughness: 0.75
                                    }}
                                >
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        className="h-full w-full resize-none bg-transparent font-family-gaegu text-lg outline-none placeholder:text-black/50"
                                    />
                                </SketchBorder>

                                <Button
                                    type="submit"
                                    variant="pink"
                                    width={180}
                                    height={56}
                                    shape="rounded-rectangle"
                                    className="font-family-hand"
                                    roughOptions={{
                                        roughness: 0.5,
                                        strokeWidth: 2,
                                        hachureGap: 3
                                    }}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-24">
                <Seperator
                    variant="wavy"
                    thickness={18}
                    color="black"
                    roughOptions={{
                        roughness: 0.25,
                    }}
                />
            </div>
        </section>
    )
}