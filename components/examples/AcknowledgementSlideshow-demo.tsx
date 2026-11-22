"use client"

import { useState } from "react"
import {
    AcknowledgementSlideshow,
    type AcknowledgementItem,
} from "@/components/ui/AcknowledgementSlideshow"

const acknowledgements: AcknowledgementItem[] = [
    {
        name: "dhruv",
        role: "@atetoon",
        message:
            "SketchUI was the first component library I saw and instantly decided to use for a project, and that became AskAMI. I loved its hand-drawn, artistic style, and the components were easy to customize and fit my design really well.",
        avatarVariant: "green",
    },
    {
        name: "Sarah Chen",
        role: "Frontend Engineer",
        message:
            "Finally a UI library that feels creative without sacrificing usability.",
        avatarVariant: "purple",
    },
    {
        name: "Alex Kumar",
        role: "Product Designer",
        message:
            "The sketch aesthetic helped our product feel more approachable and memorable.",
        avatarVariant: "yellow",
    },
]

export function DemoAcknowledgementSlideshow() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="flex flex-col gap-14">
            <AcknowledgementSlideshow
                items={acknowledgements}
                title="Loved by developers"
                subtitle="Auto-advancing acknowledgement cards."
            />

            <AcknowledgementSlideshow
                items={acknowledgements}
                title="Controlled"
                activeIndex={activeIndex}
                onActiveIndexChange={setActiveIndex}
                autoPlay={false}
                variant="yellow"
                borderStyle="dashed"
                roughOptions={{
                    fillStyle: "hachure",
                    hachureGap: 5,
                    roughness: 1.2,
                }}
            />
            <p className="text-center font-family-gaegu text-sm text-black/60">
                Active slide: {activeIndex + 1} of {acknowledgements.length}
            </p>
        </div>
    )
}
