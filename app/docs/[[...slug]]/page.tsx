import { notFound, redirect } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx/mdx-components"
import { getAllDocs, getDocBySlug } from "@/lib/docs"

type DocsPageProps = {
    params: Promise<{
        slug?: string[]
    }>
}

export function generateStaticParams() {
    return getAllDocs().map((doc) => ({
        slug: doc.slug,
    }))
}

export async function generateMetadata({ params }: DocsPageProps) {
    const { slug } = await params

    if (!slug) {
        return {
            title: "Docs",
            description: "SketchUi documentation.",
        }
    }

    const doc = getDocBySlug(slug)

    if (!doc) {
        return {}
    }

    return {
        title: doc.frontmatter.title,
        description: doc.frontmatter.description,
    }
}

export default async function DocsPage({ params }: DocsPageProps) {
    const { slug } = await params

    if (!slug) {
        redirect("/docs/getting-started/introduction")
    }

    const doc = getDocBySlug(slug)

    if (!doc) {
        notFound()
    }

    return (
        <article className="max-w-3xl">
            <div className="mb-8">
                <p className="text-sm font-black uppercase tracking-wide text-black/50">
                    {doc.frontmatter.category}
                </p>

                <h1 className="mt-2 text-4xl font-black">{doc.frontmatter.title}</h1>

                <p className="mt-3 text-lg font-semibold text-black/70">
                    {doc.frontmatter.description}
                </p>
            </div>

            <div className="prose prose-neutral max-w-none">
                <MDXRemote source={doc.content} components={mdxComponents} />
            </div>
        </article>
    )
}