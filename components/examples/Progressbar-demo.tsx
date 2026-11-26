"use client"

import { useState } from "react"

import { Progressbar } from "@/components/ui/Progressbar"

export function DemoProgressbar() {
    const [value, setValue] = useState(35)

    return (
        <div className="flex w-full flex-col gap-12">
            <div className="flex flex-col gap-3">
                <p className="font-family-hand pl-5 text-lg font-bold">
                    Pencil shading
                </p>
                <Progressbar
                    value={68}
                    variant="green"
                    showValue
                    showReplay
                    width={340}
                    height={32}
                />
            </div>

            <div className="flex flex-wrap gap-10">
                <div className="flex flex-col gap-3">
                    <p className="font-family-hand text-lg font-bold">Dots</p>
                    <Progressbar
                        value={45}
                        variant="yellow"
                        fillStyle="dots"
                        hachureGap={4}
                        showValue
                        width={280}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <p className="font-family-hand text-lg font-bold">Zigzag</p>
                    <Progressbar
                        value={82}
                        variant="blue"
                        fillStyle="zigzag"
                        roughness={1.7}
                        showValue
                        width={280}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="font-family-hand text-lg font-bold">
                    Change the value
                </p>
                <Progressbar
                    value={value}
                    variant="pink"
                    fillStyle="cross-hatch"
                    hachureGap={3}
                    showValue
                    width={340}
                    height={32}
                />
                <div className="flex flex-wrap gap-2">
                    {[15, 40, 65, 90].map((next) => (
                        <button
                            key={next}
                            type="button"
                            onClick={() => setValue(next)}
                            className="rounded-lg border-2 border-black bg-[#fffbf2] px-3 py-1 font-family-hand text-sm font-bold transition-transform hover:-rotate-1 active:scale-95"
                        >
                            {next}%
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
