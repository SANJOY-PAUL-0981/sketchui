"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import rough from "roughjs"
import { Menu, X } from "lucide-react"

import { Tape } from "@/components/ui/Tape"

const NAV_BOTTOM_LINE_STYLE = "wavy"

const navItems = [
    { label: "Docs", href: "/docs/getting-started/introduction" },
    { label: "Components", href: "/docs/components/button" },
]

function getWavyPath(width: number, y: number) {
    return `
    M 0 ${y}
    C ${width * 0.12} ${y - 8}, ${width * 0.22} ${y + 8}, ${width * 0.35} ${y}
    C ${width * 0.48} ${y - 8}, ${width * 0.62} ${y + 8}, ${width * 0.75} ${y}
    C ${width * 0.86} ${y - 7}, ${width * 0.94} ${y + 7}, ${width} ${y}
  `
}

export function Navbar() {
    const headerRef = useRef<HTMLElement | null>(null)
    const bottomSvgRef = useRef<SVGSVGElement | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const header = headerRef.current
        const svg = bottomSvgRef.current
        if (!header || !svg) return

        const draw = () => {
            const rect = header.getBoundingClientRect()
            const width = rect.width
            const height = 18

            svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
            svg.replaceChildren()

            const rc = rough.svg(svg)

            const node =
                NAV_BOTTOM_LINE_STYLE === "wavy"
                    ? rc.path(getWavyPath(width, 9), {
                        seed: 333,
                        stroke: "#111",
                        strokeWidth: 2.2,
                        roughness: 0.5,
                        bowing: 0.9,
                    })
                    : rc.line(0, 9, width, 9, {
                        seed: 333,
                        stroke: "#111",
                        strokeWidth: 2.5,
                        roughness: 0.5,
                        bowing: 0.9,
                    })

            svg.appendChild(node)
        }

        draw()
        window.addEventListener("resize", draw)
        return () => window.removeEventListener("resize", draw)
    }, [])

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 bg-[#fffbf2] px-44 py-5 max-xl:px-20 max-lg:px-8 max-md:px-4 max-md:py-3 font-family-hand"
        >
            <nav className="mx-auto flex items-center justify-between">
                <Link href="/" className="font-family-hand text-xl font-bold mb-7 inline-flex items-center gap-1">
                    <span className="relative inline-block -rotate-1">
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none">
                            <Tape
                                width={72}
                                height={50}
                                variant="yellow"
                                tapeStyle="side-torn"
                                roughOptions={{
                                    fillStyle: "solid",
                                    hachureGap: 4,
                                    roughness: 1.8,
                                }}
                            />
                        </span>
                        <span className="relative z-0 px-2 py-0.5 font-bold">
                            Sketch
                        </span>
                    </span>
                    UI
                </Link>

                <div className="hidden items-center gap-8 md:flex max-lg:gap-5">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="font-bold text-black transition-transform hover:-rotate-2 hover:scale-105 max-lg:text-sm"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <Link
                        href="https://github.com/SANJOY-PAUL-0981/sketchui"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border-2 border-black bg-yellow-300 px-5 py-2 font-black text-black shadow-[3px_3px_0_#111] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                        GitHub ★
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="hidden rounded-xl border-2 border-black bg-white/70 p-2 text-black shadow-[3px_3px_0_#111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none max-md:inline-flex"
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {isOpen && (
                <div className="mt-4 hidden rounded-2xl border-2 border-black bg-[#fffbf2] p-4 shadow-[5px_5px_0_#111] max-md:block">
                    <div className="grid gap-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-xl border-2 border-black bg-white px-4 py-3 text-center font-black text-black transition-transform active:scale-95"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            href="https://github.com/SANJOY-PAUL-0981/sketchui"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="rounded-xl border-2 border-black bg-yellow-300 px-4 py-3 text-center font-black text-black shadow-[3px_3px_0_#111] transition-transform active:scale-95"
                        >
                            GitHub ★
                        </Link>
                    </div>
                </div>
            )}

            <svg
                ref={bottomSvgRef}
                className="pointer-events-none absolute bottom-0 left-0 h-[18px] w-full translate-y-1/2"
                aria-hidden="true"
            />
        </header>
    )
}