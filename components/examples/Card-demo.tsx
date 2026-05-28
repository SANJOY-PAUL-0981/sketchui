import { Card } from "@/components/ui/Card"

export function DemoCard() {
    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-14">
            <Card
                variant="blue"
                height={250}
                width={250}
                roughOptions={{
                    fillStyle: "dots",
                    hachureGap: 6,
                    roughness: 1.6,
                }}
            >
                <h3 className="text-lg font-semibold">Dots Filled style & Basic</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Use dotted Rough.js fill for a playful look.
                </p>
            </Card>

            <Card borderStyle="dashed" variant="sky" height={250} width={250}>
                <h3 className="text-lg font-semibold">Dashed Border</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    A sketchy dashed border for notes and callouts.
                </p>
            </Card>

            <Card borderStyle="project-corner" variant="paper" height={250} width={250}>
                <h3 className="text-lg font-semibold">Project Corner</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    A folded-corner style card for projects or highlights.
                </p>
            </Card>
        </div>
    )
}