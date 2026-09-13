"use client"

import { useState } from "react"
import { Alert } from "@/components/ui/Alert"
import { Button } from "../ui/Button"

type AlertItem = {
    id: number
    variant: "info" | "success" | "warning" | "error"
    title: string
    message: string
}

export function DemoAlert() {
    const [alerts, setAlerts] = useState<AlertItem[]>([])

    const showAlert = (
        variant: AlertItem["variant"],
        title: string,
        message: string
    ) => {
        const id = Date.now()

        setAlerts((prev) => [...prev, { id, variant, title, message }])

        setTimeout(() => {
            setAlerts((prev) => prev.filter((alert) => alert.id !== id))
        }, 5000)
    }

    const dismissAlert = (id: number) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id))
    }

    return (
        <>
            <div className="flex flex-wrap items-center gap-3">
                <Button
                    onClick={() =>
                        showAlert(
                            "info",
                            "Information",
                            "Here is some useful information."
                        )
                    }
                    type="submit"
                    variant="#C9E0F9"
                    width={120}
                    height={36}
                    shape="rounded-rectangle"
                    className="font-family-hand cursor-pointer"
                    roughOptions={{
                        roughness: 0.5,
                        strokeWidth: 2,
                        hachureGap: 3
                    }}
                >
                    Info
                </Button>

                <Button
                    onClick={() =>
                        showAlert(
                            "success",
                            "Success!",
                            "Your changes have been saved."
                        )
                    }
                    type="submit"
                    variant="green"
                    width={120}
                    height={36}
                    shape="rounded-rectangle"
                    className="font-family-hand cursor-pointer"
                    roughOptions={{
                        roughness: 0.5,
                        strokeWidth: 2,
                        hachureGap: 3
                    }}
                >
                    Success
                </Button>

                <Button
                    onClick={() =>
                        showAlert(
                            "warning",
                            "Careful",
                            "This action cannot be undone."
                        )
                    }
                    type="submit"
                    variant="yellow"
                    width={120}
                    height={36}
                    shape="rounded-rectangle"
                    className="font-family-hand cursor-pointer"
                    roughOptions={{
                        roughness: 0.5,
                        strokeWidth: 2,
                        hachureGap: 3
                    }}
                >
                    Warning
                </Button>

                <Button
                    onClick={() =>
                        showAlert(
                            "error",
                            "Something went wrong",
                            "Please try again later."
                        )
                    }
                    type="submit"
                    variant="#F77A7D"
                    width={120}
                    height={36}
                    shape="rounded-rectangle"
                    className="font-family-hand cursor-pointer"
                    roughOptions={{
                        roughness: 0.5,
                        strokeWidth: 2,
                        hachureGap: 3
                    }}
                >
                    Error
                </Button>
            </div>

            <div className="fixed bottom-6 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col gap-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="animate-in slide-in-from-right-5 duration-300 drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)]"
                    >
                        <Alert
                            variant={alert.variant}
                            title={alert.title}
                            dismissible
                            onDismiss={() => dismissAlert(alert.id)}
                            className="font-family-hand"
                        >
                            {alert.message}
                        </Alert>
                    </div>
                ))}
            </div>
        </>
    )
}