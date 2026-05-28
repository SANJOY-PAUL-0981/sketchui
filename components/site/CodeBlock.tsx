"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type CodeBlockProps = {
    code?: string
    html: string
    language?: string
    className?: string

    collapsible?: boolean
    collapsedLines?: number
}

export function CodeBlock({
    code = "",
    html,
    language = "tsx",
    className,

    collapsible = true,
    collapsedLines = 25,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const lineCount = useMemo(
        () => code.split("\n").length,
        [code]
    )

    const shouldCollapse =
        collapsible &&
        lineCount > collapsedLines

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(code)

            setCopied(true)

            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch {
            console.error("Failed to copy")
        }
    }

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-b-xl rounded-tr-xl my-5",
                "border-2 border-[#111]",
                "bg-amber-50",
                "shadow-[4px_4px_0_#111]",
                className
            )}
        >
            <div className="flex items-center justify-between border-b border-black/10 bg-amber-100 px-4 py-2">
                <span className="font-family-gaegu text-[11px] font-bold uppercase tracking-widest text-black">
                    {language}
                </span>

                <div className="flex items-center gap-2">
                    {shouldCollapse && (
                        <span className="font-family-gaegu text-xs text-black/50">
                            {lineCount} lines
                        </span>
                    )}

                    <button
                        onClick={handleCopy}
                        className={cn(
                            "font-family-hand rounded-md border px-3 py-1 text-[12px] transition-all duration-150",
                            copied
                                ? "border-green-400 font-bold text-green-600"
                                : "border-black bg-transparent text-black hover:border-black/50 hover:text-black/50"
                        )}
                    >
                        {copied ? "✓ Copied!" : "Copy"}
                    </button>
                </div>
            </div>

            <div className="relative">
                <div
                    className={cn(
                        "transition-all duration-300",
                        shouldCollapse &&
                        !expanded &&
                        "max-h-[650px] overflow-hidden"
                    )}
                >
                    <pre className="overflow-x-auto p-5 text-[13px] leading-[1.75]">
                        <div
                            className="text-sm"
                            dangerouslySetInnerHTML={{
                                __html: html,
                            }}
                        />
                    </pre>
                </div>

                {shouldCollapse && !expanded && (
                    <div
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50 via-amber-50/95 to-transparent"
                    />
                )}
            </div>

            {shouldCollapse && (
                <div className="border-t border-black/10">
                    <button
                        onClick={() =>
                            setExpanded(!expanded)
                        }
                        className="w-full py-3 font-family-hand text-sm font-bold transition-colors hover:bg-black/5"
                    >
                        {expanded
                            ? "▲ Collapse Source"
                            : "▼ Show Full Source"}
                    </button>
                </div>
            )}
        </div>
    )
}