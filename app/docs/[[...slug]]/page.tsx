import { notFound, redirect } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx/mdx-components"
import { getAllDocs, getDocBySlug } from "@/lib/docs"
import remarkGfm from "remark-gfm"

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
        <article className="max-w-5xl">
            <div className="mb-8">
                <p className="text-lg font-black uppercase tracking-wide font-family-gaegu text-black/50">
                    {doc.frontmatter.category}
                </p>

                <h1 className="mt-2 text-4xl font-black font-family-hand">{doc.frontmatter.title}</h1>

                <p className="mt-3 text-xl font-semibold text-black/70 font-family-gaegu">
                    {doc.frontmatter.description}
                </p>
            </div>

            <div className="prose prose-neutral max-w-none font-family-gaegu text-lg">
                <MDXRemote
                    source={doc.content}
                    components={mdxComponents}
                    options={{
                        parseFrontmatter: true,
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                        },
                    }}
                />
            </div>
        </article>
    )
}