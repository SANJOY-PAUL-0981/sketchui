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
        },
        {
            label: "Vue",
            value: "vue",
        },
        {
            label: "Svelte",
            value: "svelte",
        },
        {
            label: "Angular",
            value: "angular",
        },
    ]
    return (

        < div className="flex flex-col gap-8" >
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