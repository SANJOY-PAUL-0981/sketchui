import { SectionTitle } from "@/components/ui/SectionTitle"

export function DemoSectionTitle() {
    return (
        <div className="flex flex-col items-center gap-8">
            <SectionTitle>
                Components
            </SectionTitle>

            <SectionTitle
                variant="purple"
                subtitle="Build playful interfaces with hand-drawn components."
                rotate={1}
                roughOptions={{
                    fillStyle: "solid",
                    roughness: 1,
                    strokeWidth: 2,
                }}
            >
                SketchUi
            </SectionTitle>

            <SectionTitle
                variant="green"
                icon={<span>✨</span>}
                width={320}
                subtitle="Custom icons, subtitles and rough styling."
                roughOptions={{
                    fillStyle: "dots",
                    hachureGap: 4,
                    roughness: 1.5,
                    strokeWidth: 2,
                }}
            >
                Getting Started
            </SectionTitle>
        </div>
    )
}