import { HoverCard } from "@/components/ui/HoverCard"
import { Button } from "@/components/ui/Button"

export function DemoHoverCard() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-8">
            <HoverCard
                content="A simple sketch themed hover card."
                variant="paper"
            >
                <Button>
                    Hover Me
                </Button>
            </HoverCard>

            <HoverCard
                placement="bottom"
                variant="yellow"
                borderStyle="dashed"
                content={
                    <div className="space-y-1">
                        <p className="font-black">
                            SketchUi
                        </p>
                        <p>
                            Build playful hand-drawn interfaces
                            with React.
                        </p>
                    </div>
                }
                roughOptions={{
                    fillStyle: "solid",
                    roughness: 1,
                    strokeWidth: 2,
                }}
            >
                <Button variant="yellow">
                    Project Info
                </Button>
            </HoverCard>
        </div>
    )
}