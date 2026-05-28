import { SketchBorder } from "@/components/ui/SketchBorder"

export function DemoSketchBorder() {
    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 px-2">
            <SketchBorder shape="rounded-rectangle" minHeight={280} width={280}>
                <h3 className="text-lg font-semibold">Rounded Border</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    A softer rounded border for cards and sections.
                </p>
            </SketchBorder>

            <SketchBorder borderStyle="dashed"
                minHeight={280}
                width={280}
                transparent={false}
                fillColor="#FDFBD4"
                roughOptions={{
                    fillStyle: "zigzag"
                }}>
                <h3 className="text-lg font-semibold">Dashed Border</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    A dashed sketch border for notes or empty states.
                </p>
            </SketchBorder>

            <SketchBorder
                transparent={false}
                fillColor="pink"
                minHeight={280}
                width={280}
                roughOptions={{
                    fillStyle: "solid",
                    strokeWidth: 2.4,
                    roughness: 2.4,
                    bowing: 1.2,
                }}
            >
                <h3 className="text-lg font-semibold">Rough Stroke</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Increase roughness and stroke width for a stronger sketch.
                </p>
            </SketchBorder>
        </div>
    )
}