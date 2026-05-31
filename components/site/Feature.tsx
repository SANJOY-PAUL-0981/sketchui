"use client"

import Image from "next/image"

import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { Seperator } from "@/components/ui/Separator"

import star from "@/public/doodles/star.png"
import drop from "@/public/doodles/drops.png"

import componentIcon from "@/public/doodles/component.png"
import colorIcon from "@/public/doodles/color.png"
import customizeIcon from "@/public/doodles/custom.png"
import responsiveIcon from "@/public/doodles/responsive.png"
import puzzleIcon from "@/public/doodles/puzzle.png"
import codeIcon from "@/public/doodles/code.png"

const features = [
    {
        icon: componentIcon,
        title: "20+ Components",
        description:
            "Buttons, toasts, cards, badges, tooltips and more.",
        color: "#fde68a",
    },
    {
        icon: colorIcon,
        title: "Hand-drawn Style",
        description:
            "Beautiful sketch style powered by Rough.js.",
        color: "#d8c7ff",
    },
    {
        icon: customizeIcon,
        title: "Highly Customizable",
        description:
            "Themes, colors, rough options and shapes, your way.",
        color: "#bbf7d0",
    },
    {
        icon: responsiveIcon,
        title: "Responsive",
        description:
            "Looks perfect on all devices, from mobile to desktop.",
        color: "#fbcfe8",
    },
    {
        icon: puzzleIcon,
        title: "Easy to Use",
        description:
            "Simple API, well documented and developer friendly.",
        color: "#fed7aa",
    },
    {
        icon: codeIcon,
        title: "Accessible",
        description:
            "Built with accessibility best practices in mind.",
        color: "#bfdbfe",
    },
]

export function Features() {
    return (
        <section className="relative overflow-hidden bg-[#fffbf2] pt-16">
            <Image
                src={star}
                alt=""
                width={90}
                height={90}
                className="absolute left-8 top-62 rotate-[-12deg] max-md:left-1"
            />

            <Image
                src={drop}
                alt=""
                width={120}
                height={120}
                className="absolute right-10 top-20 rotate-12 max-md:-right-5"
            />

            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-center text-center">
                    <Badge
                        variant="green"
                        width={100}
                        height={34}
                        shape="rounded-rectangle"
                        borderColor="#86efac"
                        className="font-family-hand"
                        roughOptions={{
                            roughness: 0.5,
                            strokeWidth: 3,
                            fillStyle: "hachure",
                            hachureGap: 2
                        }}
                    >
                        FEATURES
                    </Badge>

                    <h2 className="mt-6 max-w-3xl font-family-hand text-4xl font-black leading-tight md:text-5xl">
                        Everything you need to
                        <br />
                        build delightful interfaces
                    </h2>

                    <div className="mt-6">
                        <Seperator
                            variant="wavy"
                            color="#86efac"
                            thickness={18}
                            amplitude={8}
                            frequency={20}
                            length={310}
                            roughOptions={{
                                roughness: 0.5,
                            }}
                        />
                    </div>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3 max-md:px-5">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            variant="paper"
                            height={180}
                            shape="rectangle"
                            borderStyle="rough"
                            x={4}
                            y={4}
                            padding={24}
                            roughOptions={{
                                fillStyle: "zigzag",
                                hachureGap: 3
                            }}
                        >
                            <div className="flex h-full gap-5">

                                <div className="relative h-20 w-20 shrink-0">
                                    <svg
                                        viewBox="0 0 100 100"
                                        className="absolute inset-0 h-full w-full"
                                    >
                                        <path
                                            d="M50 10 C80 5,95 30,88 55 C82 85,55 95,30 88 C5 82,8 45,18 25 C25 12,40 8,50 10 Z"
                                            fill={feature.color}
                                            opacity="0.75"
                                        />

                                        <path
                                            d="M48 14 C78 8,92 30,84 52 C80 78,55 90,34 84 C12 78,12 48,22 28 C28 16,40 12,48 14 Z"
                                            fill={feature.color}
                                            opacity="0.35"
                                        />
                                    </svg>

                                    <Image
                                        src={feature.icon}
                                        alt={feature.title}
                                        width={34}
                                        height={34}
                                        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-family-hand text-2xl font-bold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 font-family-gaegu text-lg leading-relaxed text-black/75">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
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