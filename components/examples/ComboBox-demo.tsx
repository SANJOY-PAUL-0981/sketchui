import { Combobox } from "../ui/ComboBox"

export function DemoComboBox() {
    const frameworks = [
        {
            label: "React",
            value: "react",
        },
        {
            label: "Next.js",
            value: "next",
        }
    ]
    return (

        <div className="flex flex-col" >
            <div className="flex flex-wrap items-center gap-6">
                <Combobox
                    items={frameworks}
                    placeholder="Select Framework"
                    variant="green"
                    roughOptions={{
                        roughness: 1.25,
                        fillStyle: "zigzag",
                        hachureGap: 3.5
                    }}
                />
            </div>
        </div>
    )
}