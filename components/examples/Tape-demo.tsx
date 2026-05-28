import { Tape } from "@/components/ui/Tape"

export function DemoTape() {
    return (
        <div className="flex flex-wrap items-center gap-8">
            <Tape
                variant="pink"
                height={45}
            />

            <Tape
                height={45}
                variant="yellow"
                tapeStyle="side-torn"
                roughOptions={{
                    fillStyle: "cross-hatch",
                    hachureGap: 2,
                    roughness: 2,
                }}
            />
        </div>
    )
}