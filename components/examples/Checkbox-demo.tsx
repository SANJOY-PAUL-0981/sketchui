import { Checkbox } from "../ui/Checkbox";

export function DemoCheckbox() {
    return (
        <div className="flex flex-wrap items-center gap-6">
            <Checkbox
                label="Rounded"
                shape="rounded"
                variant="yellow"
                defaultChecked
                rotate={-2}
                roughOptions={{
                    roughness: 1
                }}
            />

            <Checkbox
                label="Circle"
                shape="circle"
                variant="green"
                checkStyle="dot"
                defaultChecked
            />
            <Checkbox
                label="Paper"
                variant="paper"
                checkStyle="scribble"
                defaultChecked
            />

            <Checkbox
                label="Cross"
                variant="pink"
                checkStyle="cross"
                defaultChecked
                roughOptions={{
                    fillStyle: "solid",
                }}
            />

            <Checkbox
                label="Plus"
                variant="blue"
                checkStyle="plus"
                defaultChecked
                roughOptions={{
                    roughness: 0.5,
                    bowing: 1.5,
                }}
            />
        </div>
    )
}