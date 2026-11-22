"use client"

import { useState } from "react"
import { DatePicker } from "@/components/ui/DatePicker"

export function DemoDatePicker() {
    const [date, setDate] = useState<Date | undefined>()

    return (
        <div className="flex flex-wrap items-start justify-center gap-14">
            <div className="flex flex-col items-start gap-3">
                <p className="font-family-hand text-lg font-bold">Basic</p>
                <DatePicker />
            </div>

            <div className="flex flex-col items-start gap-3">
                <p className="font-family-hand text-lg font-bold">Controlled</p>
                <DatePicker
                    value={date}
                    onChange={setDate}
                    variant="yellow"
                    minDate={new Date()}
                    width={280}
                    roughOptions={{
                        fillStyle: "solid",
                        roughness: 0.9,
                        strokeWidth: 2,
                    }}
                />
                <p className="font-family-gaegu text-sm text-black/60">
                    {date ? `Selected: ${date.toDateString()}` : "No date selected"}
                </p>
            </div>
        </div>
    )
}
