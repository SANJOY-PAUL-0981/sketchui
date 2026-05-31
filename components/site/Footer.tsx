"use client"

import Link from "next/link"
import Image from "next/image"

import { FaXTwitter } from "react-icons/fa6"
import { FaGithub } from "react-icons/fa"

import { Card } from "@/components/ui/Card"
import { Paper } from "../ui/Paper"
import { Tape } from "@/components/ui/Tape"

import pinkLove from "@/public/doodles/pink-love.png"

export function Footer() {
    return (
        <footer className="bg-[#fffbf2]">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_220px]">
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center gap-3 lg:justify-start">
                            <div className="rotate-[-6deg]">
                                <Card
                                    width={42}
                                    height={42}
                                    variant="yellow"
                                    shape="rectangle"
                                    padding={0}
                                    contentClassName="flex items-center justify-center"
                                    roughOptions={{
                                        fillStyle: "solid",
                                    }}
                                >
                                    <div className="pt-2 pl-1 font-family-hand text-xl font-black">
                                        S
                                    </div>
                                </Card>
                            </div>

                            <h3 className="font-family-hand text-3xl font-black">
                                SketchUi
                            </h3>
                        </div>

                        <p className="mx-auto mt-6 max-w-xs font-family-gaegu text-xl text-black/75 lg:mx-0">
                            Hand-drawn React components
                            for playful and creative UIs.
                        </p>

                        <div className="mt-8 flex items-center justify-center gap-5 lg:justify-start">
                            <Link
                                href="https://github.com/SANJOY-PAUL-0981/sketchui"
                                target="_blank"
                            >
                                <FaGithub size={28} />
                            </Link>

                            <Link
                                href="https://x.com/Sanj0yX"
                                target="_blank"
                            >
                                <FaXTwitter size={28} />
                            </Link>
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <h4 className="font-family-hand text-lg font-black uppercase">
                            Product
                        </h4>

                        <div className="mt-5 flex flex-col gap-3 font-family-gaegu text-lg">
                            <Link href="/docs">
                                Docs
                            </Link>

                            <Link href="/docs/components/button">
                                Components
                            </Link>
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <h4 className="font-family-hand text-lg font-black uppercase">
                            Community
                        </h4>

                        <div className="mt-5 flex flex-col gap-3 font-family-gaegu text-lg">
                            <Link href="https://github.com/SANJOY-PAUL-0981/sketchui">
                                GitHub
                            </Link>

                            <Link href="/">
                                Contribution
                            </Link>

                            <Link href="https://x.com/Sanj0yX">
                                Twitter
                            </Link>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center lg:mt-0 lg:justify-end">
                        <div className="relative">
                            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rotate-[-18deg]">
                                <Tape
                                    variant="purple"
                                    tapeStyle="side-torn"
                                    width={60}
                                    height={35}
                                    rotate={-50}
                                />
                            </div>

                            <div className="rotate-[4deg] pt-4">
                                <Paper
                                    width={150}
                                    height={125}
                                    variant="green"
                                    padding={18}
                                    contentClassName="flex items-center justify-center text-center"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="mt-2 font-family-hand text-xl font-black">
                                            Made with
                                        </p>

                                        <Image
                                            src={pinkLove}
                                            alt=""
                                            width={42}
                                            height={42}
                                        />

                                        <p className="font-family-hand text-xl font-black">
                                            by SketchUi
                                        </p>
                                    </div>
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-10 h-px w-full max-md:w-90 bg-black/15" />

                <div className="flex flex-col items-center gap-4 text-center font-family-gaegu text-lg md:flex-row md:justify-between md:text-left">
                    <p>
                        © 2026 SketchUi. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="https://github.com/SANJOY-PAUL-0981/sketchui/blob/main/LICENSE">
                            MIT License
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}