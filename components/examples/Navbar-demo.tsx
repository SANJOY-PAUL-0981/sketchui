import { BookOpen, Home, Layers, Mail, Star } from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Navbar, type NavbarItem } from "@/components/ui/Navbar"

const links: NavbarItem[] = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs/getting-started/introduction" },
    { label: "Components", href: "/docs/components/button" },
]

const iconLinks: NavbarItem[] = [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    {
        label: "Docs",
        href: "/docs/getting-started/introduction",
        icon: <BookOpen size={18} />,
    },
    {
        label: "Components",
        href: "/docs/components/button",
        icon: <Layers size={18} />,
    },
    {
        label: "Contact",
        href: "mailto:hello@example.com",
        icon: <Mail size={18} />,
        external: true,
    },
]

export function DemoNavbar() {
    return (
        <div className="flex w-full flex-col gap-12">
            <div>
                <p className="mb-3 pl-5 font-family-hand text-lg font-bold">
                    Classic paper
                </p>
                <Navbar
                    items={links}
                    variant="paper"
                    sticky={false}
                    logo={
                        <span className="font-family-hand text-xl font-black">
                            SketchUI
                        </span>
                    }
                    action={
                        <Button
                            variant="pink"
                            width={140}
                            height={44}
                            fontSize={15}
                            shape="rounded-rectangle"
                        >
                            Get started
                        </Button>
                    }
                />
            </div>

            <div>
                <p className="mb-3 font-family-hand text-lg font-bold">
                    Yellow with icons
                </p>
                <Navbar
                    items={iconLinks}
                    variant="yellow"
                    sticky={false}
                    logo={
                        <span className="font-family-hand text-xl font-black">
                            Doodles
                        </span>
                    }
                    action={
                        <Badge variant="purple" width={120} height={32}>
                            <Star size={14} className="mr-1" /> Star us
                        </Badge>
                    }
                    roughOptions={{ roughness: 0.8, strokeWidth: 1.6 }}
                />
            </div>

            <div>
                <p className="mb-3 font-family-hand text-lg font-bold">
                    Green, no underline
                </p>
                <Navbar
                    items={links.slice(0, 2)}
                    variant="green"
                    sticky={false}
                    showBottomLine={false}
                    logo={
                        <span className="font-family-hand text-xl font-black">
                            Notebook
                        </span>
                    }
                />
            </div>
        </div>
    )
}
