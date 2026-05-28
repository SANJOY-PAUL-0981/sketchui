import { codeToHtml } from "shiki"
import { CodeBlock } from "./CodeBlock"

const languageMap: Record<string, string> = {
    ts: "ts",
    tsx: "tsx",
    js: "js",
    jsx: "jsx",
    css: "css",
    html: "html",
    json: "json",
    txt: "text",

    npm: "bash",
    bun: "bash",
    pnpm: "bash",

    "bun&pnpm": "bash",
    "npm&pnpm": "bash",
    "bun&npm": "bash",
}

export async function Pre({
    code,
    language,
}: {
    code: string
    language: string
}) {
    const shikiLanguage =
        languageMap[language] ?? "text"

    const html = await codeToHtml(code, {
        lang: shikiLanguage as any,
        theme: "github-light",
    })

    return (
        <CodeBlock
            code={code}
            html={html}
            language={language}
            collapsible={code.split("\n").length > 35}
        />
    )
}