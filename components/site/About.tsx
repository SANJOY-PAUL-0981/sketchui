"use client"

import Image from "next/image"

import { Badge } from "@/components/ui/Badge"
import { Paper } from "../ui/Paper"
import { Seperator } from "@/components/ui/Separator"
import { Tape } from "../ui/Tape"

import drop from "@/public/doodles/drops.png"
import tick from "@/public/doodles/green-tick.png"
import love from "@/public/doodles/pink-love.png"
import cube from "@/public/doodles/cube.png"
import star from "@/public/doodles/star.png"

const features = [
    {
        icon: tick,
        title: "Built with Next.js & TypeScript",
    },
    {
        icon: love,
        title: "Powered by Rough.js",
    },
    {
        icon: cube,
        title: "Customizable & Themeable",
    },
    {
        icon: star,
        title: "Open Source (MIT)",
    },
]

export function About() {
    return (
        <section className="relative overflow-hidden">
            <Seperator
                variant="wavy"
                thickness={18}
                color="black"
                roughOptions={{
                    roughness: 0.25,
                }}
            />

            <div className="relative bg-[#fffbf2]">
                <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-70"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(59,130,246,0.22) 32px, transparent 33px)",
                    }}
                />

                <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(17,17,17,0.18) 0.7px, transparent 0.7px)",
                        backgroundSize: "18px 18px",
                    }}
                />

                <div className="relative z-10 px-6 py-24 max-md:py-5">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid items-center gap-16 lg:grid-cols-[220px_1fr]">
                            <div className="flex justify-center lg:justify-start">
                                <div className="relative">
                                    <Image
                                        src={drop}
                                        alt=""
                                        width={88}
                                        height={88}
                                        className="absolute -right-16 -top-16 z-20 rotate-12"
                                    />

                                    <div className="absolute left-1/2 -top-4 z-10 -translate-x-1/2 rotate-[-18deg]">
                                        <Tape
                                            variant="pink"
                                            tapeStyle="side-torn"
                                            width={70}
                                            height={40}
                                            rotate={95}
                                        />
                                    </div>

                                    <div className="rotate-[-8deg] max-md:hidden">
                                        <Paper
                                            width={160}
                                            height={160}
                                            variant="yellow"
                                            padding={0}
                                            x={8}
                                            y={8}
                                            contentClassName="flex h-full items-center justify-center"
                                        >
                                            <div className="pl-4 font-family-hand text-8xl font-black">
                                                S
                                            </div>
                                        </Paper>
                                    </div>
                                </div>
                            </div>

                            <div className="font-family-hand">
                                <Badge
                                    variant="purple"
                                    width={80}
                                    height={30}
                                    shape="rounded-rectangle"
                                    borderColor="#b8b4ff"
                                    roughOptions={{
                                        roughness: 0.5,
                                        strokeWidth: 3,
                                        fillStyle: "hachure",
                                        hachureGap: 2,
                                    }}
                                >
                                    ABOUT
                                </Badge>

                                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight md:text-5xl">
                                    Made for builders who
                                    <br />
                                    love creative UI
                                </h2>

                                <div className="mt-8 grid lg:grid-cols-[1fr_320px]">
                                    <div>
                                        <p className="font-family-gaegu text-xl leading-relaxed text-black/75">
                                            SketchUi helps you build interfaces
                                            that feel more human, playful and
                                            memorable.
                                        </p>

                                        <p className="mt-4 font-family-gaegu text-xl leading-relaxed text-black/75">
                                            Every component is crafted with care
                                            to give your product a unique
                                            hand-drawn personality.
                                        </p>

                                        <p className="mt-4 font-family-gaegu text-xl leading-relaxed text-black/75">
                                            Instead of perfect geometric UI,
                                            SketchUi embraces imperfections,
                                            doodles, notebook paper aesthetics
                                            and playful interactions.
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        {features.map((item) => (
                                            <div
                                                key={item.title}
                                                className="flex items-center gap-4"
                                            >
                                                <Image
                                                    src={item.icon}
                                                    alt=""
                                                    width={48}
                                                    height={48}
                                                />

                                                <span className="font-family-gaegu text-lg font-semibold">
                                                    {item.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Seperator
                variant="wavy"
                thickness={18}
                color="black"
                roughOptions={{
                    roughness: 0.25,
                }}
            />
        </section>
    )
}