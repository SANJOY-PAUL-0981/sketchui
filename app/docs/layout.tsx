import { DocsSidebar } from "@/components/site/DocsSidebar"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-[260px_1fr]">
            <aside className="hidden md:block">
                <DocsSidebar />
            </aside>

            <section className="min-w-0">{children}</section>
        </main>
    )
}