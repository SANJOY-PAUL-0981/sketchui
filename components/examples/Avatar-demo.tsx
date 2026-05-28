import Image from "next/image"
import { Avatar } from "@/components/ui/Avatar"
import pf from "@/public/pf.png"

export function DemoAvatar() {
    return (
        <div className="flex flex-wrap items-center gap-6">
            <Avatar
                size="md"
                variant="yellow"
                hoverWiggle
                roughOptions={{
                    roughness: 1,
                    strokeWidth: 2,
                    fillStyle: "solid",
                }}
            />

            <Avatar
                name="Sanjoy Paul"
                showInitials
                variant="purple"
                size="lg"
                rotate={-3}
                roughOptions={{
                    roughness: 0.75,
                    strokeWidth: 2,
                    fillStyle: "solid",
                }}
            />

            <Avatar
                src={pf}
                alt="Profile"
                variant="blue"
                size="xl"
                roughOptions={{
                    roughness: 0.8,
                    strokeWidth: 6,
                    fillStyle: "solid",
                }}
            />

            <Avatar
                name="Online User"
                showInitials
                initials="ON"
                variant="green"
                size="lg"
                showStatus
                status="online"
                hoverWiggle
                roughOptions={{
                    roughness: 1,
                    strokeWidth: 2,
                    fillStyle: "solid",
                }}
            />
        </div>
    )
}