import { cn } from "@/lib/utils"

type NotebookBackgroundProps = {
    children: React.ReactNode
    className?: string
    showMarginLine?: boolean
}

export function NotebookBackground({
    children,
    className,
    showMarginLine = true,
}: NotebookBackgroundProps) {
    return (
        <div
            className={cn(
                "relative min-h-screen bg-[#fffbf2]",
                className
            )}
        >
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-70"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(59, 130, 246, 0.22) 32px, transparent 33px)",
                }}
            />

            {showMarginLine && (
                <div className="pointer-events-none absolute left-[72px] top-0 z-0 h-full w-[2px] bg-red-300/50" />
            )}

            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(17,17,17,0.18) 0.7px, transparent 0.7px)",
                    backgroundSize: "18px 18px",
                }}
            />

            <div className="relative z-10">{children}</div>
        </div>
    )
}