import { Calender } from "@/components/ui/Calender"

export function DemoCalender() {
    return (
        <div className="flex flex-wrap items-start justify-center gap-16">
            <Calender
                width={300}
                variant="paper"
                borderStyle="dashed"
                showShadow
            />

            <Calender
                width={300}
                variant="yellow"
                shape="rectangle"
                borderStyle="solid"
                selectedColor="#86efac"
                weekStartsOn={1}
                pageAnimation="flip"
                roughOptions={{
                    fillStyle: "solid",
                    roughness: 0.9,
                    strokeWidth: 2,
                }}
            />
        </div>
    )
}