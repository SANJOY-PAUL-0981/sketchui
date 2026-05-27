import { Badge } from "@/components/ui/Badge"

export function DemoBadge() {
    return (
        <div className="flex flex-wrap items-center gap-6">
            <Badge
                variant="green"
                borderColor="#22c55e"
                shape="rounded-rectangle"
                width={60}
                height={20}
                roughOptions={{
                    roughness: 0.75,
                    strokeWidth: 2,
                    fillStyle: "solid"
                }}>Success</Badge>

            <Badge
                variant="red"
                borderColor="red"
                shape="ellipse"
                width={60}
                height={20}
                roughOptions={{
                    roughness: 0.5,
                    strokeWidth: 2,
                    fillStyle: "solid"
                }}>failed</Badge>

            <Badge
                width={60}
                height={20}
                variant="sky"
                borderColor="#5CD0FF"
                shape="rectangle"
                roughOptions={{
                    fillStyle: "dots",
                    hachureGap: 2.35,
                    roughness: 0.5,
                    strokeWidth: 2
                }}
            >
                Dots
            </Badge>

            <Badge
                shape="circle"
                variant="orange"
                borderColor="orange"
                width={35}
                height={35}
                roughOptions={{
                    roughness: 0.5,
                    strokeWidth: 2,
                    fillStyle: "zigzag"
                }}
            >
                A
            </Badge>
        </div>
    )
}