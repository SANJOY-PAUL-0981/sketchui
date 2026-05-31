import { Button } from "@/components/ui/Button"
import { SketchBorder } from "@/components/ui/SketchBorder"
import { Tape } from "@/components/ui/Tape"

function LostDoodle() {
    return (
        <svg
            viewBox="0 0 260 180"
            className="h-auto w-full max-w-[260px]"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M55 151 C82 166, 180 166, 209 151"
                stroke="#111"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="5 8"
                opacity="0.25"
            />

            <circle
                cx="130"
                cy="83"
                r="48"
                fill="#fffbf2"
                stroke="#111"
                strokeWidth="4"
            />

            <path
                d="M91 58 C78 45, 75 33, 84 27 C96 33, 101 45, 103 55"
                fill="#fde047"
                stroke="#111"
                strokeWidth="4"
                strokeLinejoin="round"
            />
            <path
                d="M169 58 C182 45, 185 33, 176 27 C164 33, 159 45, 157 55"
                fill="#fde047"
                stroke="#111"
                strokeWidth="4"
                strokeLinejoin="round"
            />

            <path
                d="M111 76 C116 71, 122 71, 127 76"
                stroke="#111"
                strokeWidth="4"
                strokeLinecap="round"
            />
            <path
                d="M149 76 C154 71, 160 71, 165 76"
                stroke="#111"
                strokeWidth="4"
                strokeLinecap="round"
            />

            <path
                d="M118 103 C128 94, 142 94, 152 103"
                stroke="#111"
                strokeWidth="4"
                strokeLinecap="round"
            />

            <path
                d="M197 40 C207 30, 225 33, 226 48 C227 61, 214 63, 211 73"
                stroke="#c084fc"
                strokeWidth="5"
                strokeLinecap="round"
            />
            <path
                d="M210 91 L210.5 91"
                stroke="#c084fc"
                strokeWidth="7"
                strokeLinecap="round"
            />

            <path
                d="M45 62 L50 72 L61 75 L51 80 L47 91 L42 80 L31 76 L42 71 Z"
                fill="#86efac"
                stroke="#111"
                strokeWidth="3"
                strokeLinejoin="round"
            />
            <path
                d="M206 121 L210 129 L219 132 L211 136 L208 145 L204 136 L195 133 L203 129 Z"
                fill="#f9a8d4"
                stroke="#111"
                strokeWidth="3"
                strokeLinejoin="round"
            />

            <path
                d="M34 120 C45 111, 53 131, 64 121 C73 113, 78 124, 84 119"
                stroke="#111"
                strokeWidth="3"
                strokeLinecap="round"
            />
            <path
                d="M177 151 C187 141, 197 160, 207 150 C216 142, 223 154, 229 148"
                stroke="#111"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    )
}

export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-5 py-12">
            <section className="relative w-full max-w-4xl">
                <Tape
                    variant="purple"
                    tapeStyle="side-torn"
                    width={150}
                    height={54}
                    rotate={-7}
                    className="absolute -top-7 left-8 z-20 max-sm:left-1/2 max-sm:-translate-x-1/2"
                />

                <Tape
                    variant="yellow"
                    tapeStyle="side-torn"
                    width={120}
                    height={46}
                    rotate={8}
                    className="absolute -right-12 top-10 z-20 max-md:hidden"
                />

                <SketchBorder
                    transparent={false}
                    fillColor="#fffbf2"
                    borderColor="#111"
                    minHeight={430}
                    padding={34}
                    rotate={-1}
                    roughOptions={{
                        seed: 404,
                        roughness: 1.5,
                        bowing: 0.8,
                        strokeWidth: 2,
                        fillStyle: "hachure",
                        hachureGap: 9,
                        hachureAngle: -12,
                    }}
                    className="shadow-[8px_8px_0_#111]"
                >
                    <div className="grid min-h-[350px] items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
                        <div className="mx-auto flex justify-center">
                            <LostDoodle />
                        </div>

                        <div className="text-center md:text-left font-family-lacquer">
                            <p className="text-7xl font-black leading-none text-purple-600 max-sm:text-6xl font-family-lacquer">
                                404
                            </p>

                            <h1 className="mt-3 text-4xl font-black leading-tight text-black max-sm:text-3xl">
                                Oops! This page got lost in the sketchbook.
                            </h1>

                            <p className="mt-4 max-w-xl text-lg font-semibold font-family-gaegu leading-relaxed text-black/70 max-sm:text-base">
                                The page you are looking for either moved, vanished, or was never drawn properly.
                            </p>

                            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                                <Button
                                    href="/"
                                    variant="purple"
                                    width={170}
                                    height={52}
                                    fontSize={17}
                                    roughOptions={{
                                        seed: 44,
                                        hoverHachureGap: 0.5,
                                        hoverRoughness: 0.6,
                                    }}
                                >
                                    Back Home
                                </Button>

                                <Button
                                    href="/docs/getting-started/introduction"
                                    variant="yellow"
                                    width={190}
                                    height={52}
                                    fontSize={17}
                                    roughOptions={{
                                        seed: 45,
                                        hoverHachureGap: 0.5,
                                        hoverRoughness: 0.6,
                                    }}
                                >
                                    Go To Docs
                                </Button>
                            </div>
                        </div>
                    </div>
                </SketchBorder>

                <div className="pointer-events-none font-family-lacquer absolute -bottom-8 left-10 rotate-[-3deg] rounded-full border-2 border-black bg-green-200 px-5 py-2 text-sm font-black shadow-[4px_4px_0_#111] max-sm:left-1/2 max-sm:-translate-x-1/2">
                    maybe the URL typo monster ate it :P
                </div>
            </section>
        </main>
    )
}