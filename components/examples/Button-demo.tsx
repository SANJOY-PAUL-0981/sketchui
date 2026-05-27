import { Button } from "@/components/ui/Button"

export function DemoButton() {
    return (
        <div className="flex flex-wrap items-end gap-6">
            <Button variant="green">Default (green)</Button>
            <Button enable3D variant="purple" depth={16}
            roughOptions={{
                roughness: 1.5,
                hoverRoughness: 0.5,
            }}
            >
                Purple 3D
            </Button>
            <Button
                variant="purple"
                roughOptions={{
                    fillStyle: "cross-hatch",
                    hachureGap: 7,
                    roughness: 0.75,
                }}
            >
                Cross Hatch
            </Button>
        </div>
    )
}