import { Button } from "@/components/ui/Button"

export function DemoButton() {
    return (
        <div className="flex flex-wrap items-end gap-6">
            <Button className="cursor-pointer">Default (yellow)</Button>
            <Button className="cursor-pointer" enable3D variant="green" depth={16}
            roughOptions={{
                roughness: 1.5,
                hoverRoughness: 0.5,
            }}
            >
                Purple 3D
            </Button>
            <Button className="cursor-pointer"
            shape="rounded-rectangle"
                variant="purple"
                roughOptions={{
                    fillStyle: "cross-hatch",
                    hachureGap: 7,
                    roughness: 0.75,
                    hoverRoughness: 0.5,
                    hoverHachureGap: 2
                }}
            >
                Cross Hatch
            </Button>
        </div>
    )
}