import { Toggle } from "@/components/ui/Toggle"

export function DemoToggle() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-8">
            <Toggle />

            <Toggle
                defaultChecked
                checkedColor="#c084fc"
                checkedIcon={<span>✓</span>}
                uncheckedIcon={<span>✕</span>}
            />

            <Toggle
                size="lg"
                shape="rounded"
                checkedColor="#fde047"
                uncheckedColor="#fce7f3"
                sliderShape="rounded"
                checkedIcon={<span>🌞</span>}
                uncheckedIcon={<span>🌙</span>}
            />
        </div>
    )
}