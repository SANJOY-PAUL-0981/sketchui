import { NotebookBackground } from "@/components/ui/NotebookBackground"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Paper } from "@/components/ui/Paper"

export function DemoNotebookBackground() {
    return (
        <div className="w-full overflow-hidden rounded-xl border-2 border-black">
            <NotebookBackground className="min-h-[320px]">
                <div className="flex h-[320px] flex-col items-center justify-center gap-6 px-8">
                    <SectionTitle
                        variant="yellow"
                        width={240}
                        height={56}
                    >
                        Notebook Theme
                    </SectionTitle>

                    <Paper
                        width={280}
                        height={120}
                        variant="cream"
                        edgeStyle="folded-corner"
                    >
                        <div className="flex h-full items-center justify-center text-center font-semibold">
                            Perfect for notes, journals,
                            documentation and educational
                            interfaces.
                        </div>
                    </Paper>
                </div>
            </NotebookBackground>
        </div>
    )
}