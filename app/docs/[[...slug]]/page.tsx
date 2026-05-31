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

export const dynamicParams = true

export function generateStaticParams() {
    const docs = getAllDocs()
    console.log("generateStaticParams →", docs.map(d => d.slug))
    return docs.map((doc) => ({
        slug: doc.slug,
    }))
}

export async function generateMetadata({
    params,
}: DocsPageProps) {
    const { slug } = await params

    if (!slug) {
        return {
            title: "Docs | SketchUi",
            description:
                "SketchUi documentation.",
        }
    }

    const doc = getDocBySlug(slug)

    if (!doc) {
        return {}
    }

    return {
        title: `${doc.frontmatter.title} | SketchUi`,
        description: doc.frontmatter.description,

        alternates: {
            canonical: `https://sketchui.dev/docs/${slug.join("/")}`,
        },

        openGraph: {
            title: `${doc.frontmatter.title} | SketchUi`,
            description:
                doc.frontmatter.description,
            url: `https://sketchui.dev/docs/${slug.join("/")}`,
            type: "article",
        },

        twitter: {
            card: "summary_large_image",
            title: `${doc.frontmatter.title} | SketchUi`,
            description:
                doc.frontmatter.description,
        },
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
                <p className="text-lg font-black uppercase tracking-wide font-family-gaegu text-black/50 max-md:text-base">
                    {doc.frontmatter.category}
                </p>

                <h1 className="mt-2 text-4xl font-black font-family-hand max-md:text-3xl max-sm:text-2xl">
                    {doc.frontmatter.title}
                </h1>

                <p className="mt-3 text-xl font-semibold text-black/70 font-family-gaegu max-md:text-lg max-sm:text-base">
                    {doc.frontmatter.description}
                </p>
            </div>

            <div className="prose prose-neutral max-w-none font-family-gaegu text-lg max-md:text-base">
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