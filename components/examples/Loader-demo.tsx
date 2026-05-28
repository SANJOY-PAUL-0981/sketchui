import { Loader } from "@/components/ui/Loader"

export function DemoLoader() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-40">
            <Loader
                type="dots"
                color="purple"
                size="md"
                motion="normal"
            />

            <Loader
                type="spinner"
                color="green"
                size="lg"
                motion="slow"
            />
        </div>
    )
}