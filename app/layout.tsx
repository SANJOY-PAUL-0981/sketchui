import type { Metadata } from "next"
import { Nunito, Patrick_Hand, Gaegu, Geist_Mono, Lacquer, Indie_Flower, Shantell_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const lacquer = Lacquer({
  variable: "--font-lacquer",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const patrickHand = Patrick_Hand({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const shantellSans = Shantell_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-shantell-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://sketchui.sanjoydev.com"),

  icons: {
    icon: "/favicon.ico",
  },

  title: {
    default: "SketchUI",
    template: "%s | SketchUI",
  },

  description:
    "SketchUI is an open source React component library featuring hand-drawn sketch themed UI components powered by Rough.js. What makes it different? Its hand drawn, imperfectionism theme with flexible customisation ability of the components makes it different.",

  keywords: [
    "Sketch UI",
    "SketchUi",
    "Sketchui",
    "sketchUi",
    "React UI Library",
    "Hand Drawn Components",
    "Doodle components",
    "Hand Drawn Components for react",
    "Doodle components for react",
    "React Hand Drawn Components",
    "React Doodle components",
    "Rough.js",
    "Next.js Components",
    "React Components",
    "Open Source UI Library",
  ],

  authors: [
    {
      name: "Sanjoy Paul",
    },
  ],

  creator: "Sanjoy Paul",

  openGraph: {
    title: "SketchUi",
    description:
      "Hand-drawn React component library powered by Rough.js.",
    url: "https://sketchui.sanjoydev.com",
    siteName: "SketchUI",
    type: "website",
    images: ["/og.png"]
  },

  twitter: {
    card: "summary_large_image",
    title: "SketchUi",
    description:
      "Hand-drawn React component library powered by Rough.js.",
  },

  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sketchui.sanjoydev.com",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${patrickHand.variable} ${gaegu.variable} ${geistMono.variable} ${lacquer.variable} ${indieFlower.variable} ${shantellSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "SketchUi",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              url: "https://sketchui.sanjoydev.com",
            }),
          }}
        />
      </body>
    </html>
  );
}
