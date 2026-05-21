import { cn } from "@/lib/utils"

type DoodleGridBackgroundProps = {
    children: React.ReactNode
    className?: string
    density?: "low" | "medium" | "high"
}

const densityOpacity = {
    low: "opacity-20",
    medium: "opacity-30",
    high: "opacity-40",
}

export function DoodleGridBackground({
    children,
    className,
    density = "medium",
}: DoodleGridBackgroundProps) {
    return (
        <div className={cn("relative min-h-screen bg-[#fffbf2]", className)}>
            {/* graph paper grid */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-45"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(59,130,246,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.18) 1px, transparent 1px)
          `,
                    backgroundSize: "34px 34px",
                }}
            />

            {/* bigger grid lines */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(59,130,246,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.35) 1px, transparent 1px)
          `,
                    backgroundSize: "170px 170px",
                }}
            />

            {/* doodle marks */}
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 z-0",
                    densityOpacity[density]
                )}
                style={{
                    backgroundImage: `
            radial-gradient(circle at 12% 18%, rgba(17,17,17,0.45) 1.2px, transparent 1.4px),
            radial-gradient(circle at 82% 22%, rgba(17,17,17,0.35) 1.4px, transparent 1.6px),
            radial-gradient(circle at 30% 76%, rgba(17,17,17,0.35) 1px, transparent 1.2px),
            radial-gradient(circle at 72% 70%, rgba(17,17,17,0.35) 1px, transparent 1.2px)
          `,
                    backgroundSize: "220px 180px, 260px 220px, 190px 240px, 280px 260px",
                }}
            />

            {/* subtle paper grain */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.12]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(17,17,17,0.22) 0.7px, transparent 0.7px)",
                    backgroundSize: "14px 14px",
                }}
            />

            <div className="relative z-10">{children}</div>
        </div>
    )
}