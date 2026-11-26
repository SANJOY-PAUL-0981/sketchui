"use client"

import { useState } from "react"

import {
    RadioGroup,
    type RadioOption,
} from "@/components/ui/RadioGroup"

const plans: RadioOption[] = [
    {
        value: "starter",
        label: "Starter",
        description: "The basics for a small side project.",
    },
    {
        value: "pro",
        label: "Pro",
        description: "More components and all the playful details.",
    },
    {
        value: "team",
        label: "Team",
        description: "Shared access for the whole crew.",
    },
]

const sizes: RadioOption[] = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
]

export function DemoRadioGroup() {
    const [plan, setPlan] = useState("pro")
    const [size, setSize] = useState("md")

    return (
        <div className="flex flex-wrap items-start justify-center gap-14">
            <RadioGroup
                items={plans}
                label="Choose a plan"
                value={plan}
                onValueChange={setPlan}
                variant="paper"
            />

            <div className="flex flex-col gap-3">
                <RadioGroup
                    items={sizes}
                    label="Size (controlled)"
                    value={size}
                    onValueChange={setSize}
                    orientation="horizontal"
                    variant="yellow"
                    size="lg"
                    roughOptions={{
                        fillStyle: "hachure",
                        hachureGap: 3,
                        roughness: 1.6,
                    }}
                />
                <p className="font-family-gaegu text-sm text-black/60">
                    Plan: {plan} · Size: {size}
                </p>
            </div>

            <RadioGroup
                items={[
                    ...plans.slice(0, 2),
                    { value: "soon", label: "Enterprise", disabled: true },
                ]}
                label="Green / with disabled option"
                defaultValue="starter"
                variant="green"
                checkedColor="#22c55e"
            />
        </div>
    )
}
