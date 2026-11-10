import { Input } from "@/components/ui/Input"

export function DemoInput() {
    return (
        <div className="flex flex-col gap-4">
            <Input
                label="Classic Sketch"
                placeholder="Enter your username..."
                variant="yellow"
                shape="rectangle"
                width="150%"
                roughOptions={{
                    seed: 12,
                    roughness: 1.5,
                    strokeWidth: 2,
                    bowing: 1,
                }}
            />

            <Input
                label="Soft Sketch"
                placeholder="hello@example.com"
                variant="purple"
                shape="rounded-rectangle"
                radius={10}
                width="150%"
                height={22}
                roughOptions={{
                    seed: 24,
                    roughness: 1,
                    strokeWidth: 2.5,
                    bowing: 1.25,
                }}
            />

            <Input
                label="Playful Sketch"
                placeholder="Search something..."
                variant="green"
                shape="pill"
                width="150%"
                size="lg"
                roughOptions={{
                    seed: 42,
                    roughness: 1.5,
                    strokeWidth: 2,
                    bowing: 1,
                }}
            />
        </div>
    )
}