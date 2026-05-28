import { DoodleGridBackground } from "@/components/ui/DoodleGridBackground"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Card } from "@/components/ui/Card"

export function DemoDoodleGridBackground() {
    return (
        <div className="w-full overflow-hidden rounded-xl border-2 border-black">
            <DoodleGridBackground
                density="medium"
                className="min-h-[320px]"
            >
                <div className="flex h-[320px] flex-col items-center justify-center gap-6 p-6">
                    <SectionTitle
                        variant="yellow"
                        width={220}
                        height={56}
                    >
                        SketchUi
                    </SectionTitle>

                    <Card
                        width={260}
                        height={120}
                        variant="paper"
                    >
                        <div className="flex h-full items-center justify-center text-center font-semibold">
                            Doodle Grid Background
                        </div>
                    </Card>
                </div>
            </DoodleGridBackground>
        </div>
    )
}