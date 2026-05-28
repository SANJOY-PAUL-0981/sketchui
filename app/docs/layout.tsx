import { DocsSidebar } from "@/components/site/DocsSidebar"
import { MobileDocsNav } from "@/components/site/MobileDocsNav"
import { DoodleGridBackground } from "@/components/ui/DoodleGridBackground"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#fffbf2]">
            <DocsSidebar />
            <main className="flex-1 min-w-0 px-40 py-10 max-w-7xl">
                <MobileDocsNav />
                <DoodleGridBackground>
                    {children}
                </DoodleGridBackground>
            </main>
        </div>
    )
}