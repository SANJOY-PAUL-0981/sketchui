import { DocsSidebar } from "@/components/site/DocsSidebar"
import { MobileDocsNav } from "@/components/site/MobileDocsNav"
import { DoodleGridBackground } from "@/components/ui/DoodleGridBackground"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        default: "Documentation",
        template: "%s | SketchUI Docs",
    },

    verification: {
      google: "kUKSMU6xUgjz5M3Nko0oE7vM13axrASTSIG__iETTko"
    },

    description:
        "Documentation for SketchUI, a hand-drawn React component library.",
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#fffbf2]">
            <DocsSidebar />
            <main className="flex-1 min-w-0 px-40 py-10 max-w-7xl max-xl:px-20 max-lg:px-10 max-md:px-4 max-md:py-6">
                <MobileDocsNav />
                <DoodleGridBackground>
                    {children}
                </DoodleGridBackground>
            </main>
        </div>
    )
}