import { Seperator } from "@/components/ui/Separator"

export function DemoSeparator() {
    return (
        <div className="flex w-full flex-col gap-10">
            <Seperator
                variant="dashed"
                color="purple"
                roughOptions={{
                    strokeWidth: 2,
                    roughness: 1,
                }}
            />

            <Seperator
                variant="wavy"
                color="green"
                amplitude={8}
                frequency={10}
                roughOptions={{
                    strokeWidth: 2,
                    roughness: 1.5,
                }}
            />

            <Seperator
                variant="curly"
                color="orange"
                amplitude={10}
                frequency={6}
                roughOptions={{
                    strokeWidth: 2.5,
                    roughness: 1.2,
                }}
            />
        </div>
    )
}