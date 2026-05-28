import { Toast } from "@/components/ui/Toast"

export function DemoToast() {
    return (
        <div className="flex gap-2">
            <Toast variant="cloud"
                color="blue"
                pointer="bottom-left"
                dottedShadow={false}
                height={200}
                width={300}
                contentClassName="text-center mt-5"
            >
                <h3 className="text-lg font-semibold">Cloud Toast</h3>
                <p className="text-sm">
                    A cloud shape for messages.
                </p>
            </Toast>

            <Toast variant="thought"
                color="purple"
                pointer="bottom-right"
                dottedShadow={false}
                height={150}
                width={300}
                contentClassName="text-center mt-2"

            >
                <h3 className="text-lg font-semibold">Thought Toast</h3>
                <p className="text-sm">
                    A thought bubble style for hints or tips.
                </p>
            </Toast>

            <Toast
                variant="rounded"
                color="paper"
                pointer="left"
                width={300}
                dottedShadow={false}
            >
                <h3 className="text-lg font-semibold">Side Pointer</h3>
                <p className="mt-2 text-sm">
                    Use left or right pointers for anchored UI.
                </p>
            </Toast>
        </div>
    )
}