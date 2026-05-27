import Image from "next/image";
import { DoodleGridBackground } from "@/components/ui/DoodleGridBackground";
import { DemoSketchBorder } from "@/components/examples/SketchBorder-demo";

import pf from "@/public/pf.png"

export default function Home() {

  return (
    <main>
      <DoodleGridBackground className="font-family-gaegu text-lg">
        <DemoSketchBorder />
      </DoodleGridBackground>
    </main>
  );
}
