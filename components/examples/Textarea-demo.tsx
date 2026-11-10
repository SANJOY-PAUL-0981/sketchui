
import { Textarea } from "@/components/ui/Textarea"

export function DemoTextArea() {
    return (
        <div className="flex flex-col gap-8">
            <Textarea
                label="Soft Sketch"
                placeholder="Share your thoughts..."
                variant="purple"
                shape="rounded-rectangle"
                radius={10}
                height={120}
                width="150%"
                roughOptions={{
                    seed: 24,
                    roughness: 1,
                    strokeWidth: 2,
                    bowing: 1,
                }}
            />
        </div>
    )
}
