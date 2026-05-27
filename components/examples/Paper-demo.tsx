import { Paper } from "@/components/ui/Paper"

export function DemoPaper() {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Paper variant="yellow" height={170} rotate={-2}>
                <h3 className="text-lg font-semibold">Basic & Rotated Note</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Add a slight rotation for a pinned-paper feeling.
                </p>
            </Paper>

            <Paper
                edgeStyle="folded-corner"
                foldSide="bottom-right"
                variant="pink"
                height={170}
                roughOptions={{
                    fillStyle: "hachure"
                }}
            >
                <h3 className="text-lg font-semibold">Bottom Fold</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Move the folded corner to another side.
                </p>
            </Paper>

            <Paper edgeStyle="curled-bottom" variant="blue" height={170}
            roughOptions={{
                fillStyle: "dots",
                hachureGap: 6,
                roughness: 0.5
            }}>
                <h3 className="text-lg font-semibold">Curled Bottom</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    A curved bottom edge for a loose paper effect.
                </p>
            </Paper>
        </div>
    )
}