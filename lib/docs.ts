import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const DOCS_PATH = path.join(process.cwd(), "content/docs")

export type DocStatus = "ready" | "planned" | "experimental"

export type DocFrontmatter = {
    title: string
    description: string
    category: "Getting Started" | "Components"
    status?: DocStatus
    order: number
}

export type Doc = {
    slug: string[]
    href: string
    content: string
    frontmatter: DocFrontmatter
}

function getMdxFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) {
        return []
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true })

    return entries.flatMap((entry) => {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
            return getMdxFiles(fullPath)
        }

        if (entry.name.endsWith(".mdx")) {
            return [fullPath]
        }

        return []
    })
}

export function getAllDocs(): Doc[] {
    const files = getMdxFiles(DOCS_PATH)

    return files
        .map((filePath) => {
            const raw = fs.readFileSync(filePath, "utf8")
            const { data, content } = matter(raw)

            const relativePath = path.relative(DOCS_PATH, filePath)
            const slug = relativePath.replace(/\.mdx$/, "").split(path.sep)

            return {
                slug,
                href: `/docs/${slug.join("/")}`,
                content,
                frontmatter: data as DocFrontmatter,
            }
        })
        .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}

export function getDocBySlug(slug: string[]) {
    return getAllDocs().find((doc) => doc.slug.join("/") === slug.join("/"))
}