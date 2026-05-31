"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Toggle } from "@/components/ui/Toggle"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { SketchBorder } from "@/components/ui/SketchBorder"
import { Seperator } from "@/components/ui/Separator"
import { Avatar } from "../ui/Avatar"

import star from "@/public/doodles/blue-star.png"
import drops from "@/public/doodles/drops.png"
import accessible from "@/public/doodles/tick.png"
import lightweight from "@/public/doodles/gold-love.png"
import customizable from "@/public/doodles/pencil.png"

export function Hero() {
    return (
        <section className="relative overflow-hidden px-6 py-16 max-md:px-5 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
                <div className="relative">
                    <Image
                        src={star}
                        alt="star"
                        width={120}
                        height={120}
                        className="absolute -left-6 -top-8 hidden rotate-[-12deg] lg:block xl:-left-24 xl:-top-14"
                    />

                    <h1 className="font-family-hand text-6xl font-black leading-[0.95] md:text-7xl xl:text-8xl">
                        Hand-drawn.
                        <br />
                        Beautiful.
                        <br />
                        <span className="inline-block rotate-[-1deg] bg-[#fde047] px-3 py-1">
                            Yours.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-lg font-family-gaegu text-lg text-black/75 sm:text-xl max-md:w-[95vw]">
                        SketchUi is a React component library built with
                        Rough.js to bring a playful, hand-drawn look to your
                        product.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-5 font-family-hand">
                        <Link href="/docs/getting-started/introduction">
                            <Button
                                variant="yellow"
                                width={170}
                                height={58}
                                fontSize={18}
                                roughOptions={{
                                    roughness: 0.75
                                }}
                                className="cursor-pointer"
                            >
                                Get Started →
                            </Button>
                        </Link>

                        <Link href="/docs/components/button">
                            <Button
                                variant="paper"
                                width={170}
                                height={58}
                                fontSize={18}
                                className="cursor-pointer"
                            >
                                View Components
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-8 max-md: w-[90vw]">
                        <Feature
                            icon={accessible}
                            title="Accessible"
                        />

                        <Feature
                            icon={lightweight}
                            title="Lightweight"
                        />

                        <Feature
                            icon={customizable}
                            title="Customizable"
                        />
                    </div>
                </div>

                <div className="relative max-md:hidden">
                    <div className="absolute -right-4 -top-8 hidden rotate-12 lg:block xl:-right-20 xl:-top-14">
                        <Image
                            src={drops}
                            alt="star"
                            width={120}
                            height={120}
                        />
                    </div>

                    <Card
                        variant="paper"
                        transparent
                        width="100%"
                        height={520}
                        shape="rounded-rectangle"
                        radius={16}
                        className="relative"
                        contentClassName="h-full"
                        roughOptions={{
                            roughness: 0.75,
                            strokeWidth: 2
                        }}
                    >
                        <div className="flex h-full flex-col font-family-hand">
                            <div className="mb-8 flex items-center gap-2">
                                <div className="size-3 rounded-full border border-black bg-red-300" />
                                <div className="size-3 rounded-full border border-black bg-yellow-300" />
                                <div className="size-3 rounded-full border border-black bg-green-300" />
                            </div>

                            <div className="mb-8">
                                <SectionTitle
                                    width={250}
                                    height={54}
                                    variant="yellow"
                                    roughOptions={{
                                        hachureGap: 2
                                    }}
                                >
                                    Section Title
                                </SectionTitle>
                            </div>

                            <div className="mb-4 flex items-center gap-4">
                                <Button
                                    variant="purple"
                                    shape="rounded-rectangle"
                                    width={110}
                                    roughOptions={{
                                        hachureGap: 2,
                                        roughness: 0.75,
                                        hoverRoughness: 0.35
                                    }}
                                >
                                    Button
                                </Button>

                                <Button
                                    variant="paper"
                                    width={130}
                                    shape="rounded-rectangle"
                                    roughOptions={{
                                        hachureGap: 2,
                                        roughness: 0.75,
                                        hoverRoughness: 0.35
                                    }}
                                >
                                    Secondary
                                </Button>

                                <Toggle
                                    defaultChecked
                                    size="md"
                                    roughness={0.75}
                                />

                                <Avatar
                                    showInitials
                                    variant="green"
                                    size="lg"
                                    showStatus
                                    status="online"
                                    hoverWiggle
                                    roughOptions={{
                                        roughness: 0.75,
                                        strokeWidth: 2,
                                        fillStyle: "solid",
                                    }}
                                />
                            </div>

                            <div className="mb-4 flex justify-around font-family-gaegu">
                                <SketchBorder
                                    width={190}
                                    height={70}
                                    borderStyle="dashed"
                                    contentClassName="flex items-center justify-center"
                                    roughOptions={{
                                        roughness: 0.75
                                    }}
                                >
                                    Sketch broder
                                </SketchBorder>

                                <Card
                                    height={120}
                                    width={190}
                                    shape="rectangle"
                                    borderStyle="project-corner"
                                    variant="purple"
                                    roughOptions={{
                                        roughness: 1.15,
                                        fillStyle: "solid",
                                    }}
                                >
                                    Card
                                </Card>
                            </div>

                            <div className="mb-4 flex items-center gap-4 px-2">
                                <div className="h-[2px] flex-1 bg-black" />

                                <div className="size-5 rounded-full border-2 border-black bg-purple-300" />

                                <div className="h-[2px] flex-1 bg-black" />
                            </div>

                            <div className="mb-4 flex items-center gap-4">
                                <div className="h-4 flex-1 overflow-hidden rounded-full border-2 border-black bg-white">
                                    <div className="h-full w-[70%] bg-pink-300" />
                                </div>

                                <span className="font-family-hand text-lg font-bold">
                                    70%
                                </span>
                            </div>

                            <div className="mt-auto">
                                <Seperator
                                    variant="wavy"
                                    color="purple"
                                    thickness={18}
                                    amplitude={15}
                                    frequency={26}
                                    roughOptions={{
                                        roughness: 0.45
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}

function Feature({
    icon,
    title,
}: {
    icon: any
    title: string
}) {
    return (
        <div className="flex items-center gap-3">
            <Image
                src={icon}
                alt={title}
                width={42}
                height={42}
            />

            <span className="font-family-hand text-xl font-bold">
                {title}
            </span>
        </div>
    )
}