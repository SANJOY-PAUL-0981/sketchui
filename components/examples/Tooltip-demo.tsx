import { Tooltip } from "@/components/ui/Tooltip"
import { Button } from "@/components/ui/Button"

export function DemoTooltip() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-8 py-10">
            <Tooltip
                content="A simple sketch themed tooltip."
            >
                <Button
                roughOptions={{
                    roughness: 1,
                    hoverRoughness: 0.5
                }}>
                    Hover Me
                </Button>
            </Tooltip>

            <Tooltip
                content="Dashed borders and custom styling."
                placement="bottom"
                variant="yellow"
                borderStyle="dashed"
                activeRotate={1}
                activeScale={1.02}
                roughOptions={{
                    fillStyle: "solid",
                    roughness: 1,
                    strokeWidth: 2,
                }}
            >
                <Button variant="yellow"
                roughOptions={{
                    roughness: 1,
                    hoverRoughness: 0.5
                }}>
                    Bottom Tooltip
                </Button>
            </Tooltip>

            <Tooltip
                placement="right"
                variant="purple"
                maxWidth={220}
                content={
                    <div>
                        <p className="font-black">
                            SketchUi
                        </p>
                        <p>
                            Hand-drawn React components with
                            lots of customization.
                        </p>
                    </div>
                }
                roughOptions={{
                    fillStyle: "hachure",
                    hachureGap: 5,
                    roughness: 1.4,
                    strokeWidth: 2,
                }}
            >
                <Button
                shape="rounded-rectangle" 
                variant="purple"
                roughOptions={{
                    roughness: 1,
                    hoverRoughness: 0.5
                }}>
                    Rich Content
                </Button>
            </Tooltip>
        </div>
    )
}