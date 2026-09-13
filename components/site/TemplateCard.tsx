"use client"

import Link from "next/link"
import { Card } from "@/components/ui/Card"

type TemplateCardProps = {
    title: string
    description: string
    href: string
    image?: string
    variant?: "yellow" | "purple" | "green" | "pink" | "blue" | "gray" | "paper"
}

export function TemplateCard({
    title,
    description,
    href,
    image,
    variant = "paper",
}: TemplateCardProps) {
    return (
        <Link href={href} className="block group">
            <Card
                variant={variant}
                borderStyle="rough"
                width="100%"
                height={420}
                padding={20}
                roughOptions={{
                    hachureGap: 2.5
                }}
                className="transition-transform duration-200 group-hover:-translate-y-1"
            >
                {image && (
                    <div className="mb-4 overflow-hidden rounded-lg border-2 border-black/20">
                        <img
                            src={image}
                            alt={title}
                            className="aspect-video w-full object-cover"
                        />
                    </div>
                )}

                <h3 className="font-family-hand text-2xl font-bold">
                    {title}
                </h3>

                <p className="mt-2 font-family-gaegu text-lg opacity-70">
                    {description}
                </p>

                <div className="mt-4 font-family-hand font-bold">
                    View template →
                </div>
            </Card>
        </Link>
    )
}