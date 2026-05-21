import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Paper } from "@/components/ui/Paper";
import { SketchBorder } from "@/components/ui/SketchBorder";
import { Tape } from "@/components/ui/Tape";
import { Toast } from "@/components/ui/Toast";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DoodleGridBackground } from "@/components/ui/DoodleGridBackground";
import { Loader } from "@/components/ui/Loader";
import { Avatar } from "@/components/ui/Avatar";
import { Seperator } from "@/components/ui/Separator";
import { Toggle } from "@/components/ui/Toggle";

import pf from "@/public/pf.png"
import { NotebookBackground } from "@/components/ui/NotebookBackground";

export default function Home() {
  return (
    <main>
      <DoodleGridBackground className="font-family-gaegu text-lg">
        <h1>hi sketchui
          TEST THE COMPONENTS FRIST BEFORE ADDING NEW ONES...
        </h1>
        <div className="flex flex-wrap">
          <Badge
            variant="sky"
            shape="rounded-rectangle"
            width={70}
            borderColor="blue"
            height={25}
            fontSize={14}
            paddingX={12}
            radius={17}
            roughOptions={{
              roughness: 0.75,
              bowing: 0.6,
              strokeWidth: 2,
              fillStyle: "solid",
            }}
          >Badge</Badge>

          <Button
            hoverTranslateY={-8}
            hoverTranslateX={2}
            hoverRotate={-2}
            external
            variant="purple"
            width={190}
            height={52}
            hoverSketch={true}
            roughOptions={{
              seed: 67,
              hoverHachureGap: 0.5,
              hoverRoughness: 0.5,
            }}>
            Button
          </Button>

          <Card
            variant="pink"
            borderStyle="project-corner"
            foldSide="top-left"
            foldSize={24}
            height={250}
            width={250}
            padding={22}
            roughOptions={{
              seed: 100,
              roughness: 1.2,
              bowing: 0.7,
              strokeWidth: 1.6,
              fillStyle: "hachure",
              hachureGap: 8,
              hachureAngle: -12,
            }}
          >
            Card
          </Card>

          <Paper variant="cream"
            edgeStyle="folded-corner"
            foldSide="bottom-left"
            height={130}
            width={130}
            padding={24}
            rotate={-1}
            borderColor="#111">
            Paper
          </Paper>

          <SectionTitle
            variant="green"
            width={180}
            height={54}
            rotate={-5}
            roughOptions={{
              hachureGap: 0.5,
            }}
            titleClassName="text-xl max-md:text-3xl"
          >
            Section Title
          </SectionTitle>

          <SketchBorder shape="rounded-rectangle"
            radius={20}
            fillColor="#fffbf2"
            transparent={false}
            borderStyle="dashed"
            minHeight={280}
            padding={26}
            width="25%"
            roughOptions={{
              seed: 10,
              roughness: 0.75,
              bowing: 0.7,
              strokeWidth: 2,
            }}
            contentClassName="pl-10 max-md:pl-5 max-md:pr-5 max-md:py-5">
            Sketch Border
          </SketchBorder>

          <Tape
            variant="pink"
            tapeStyle="side-torn"
            width={95}
            height={50}
            rotate={-45}
            className="absolute left-290 z-20 max-md:scale-90"
          />


          <Avatar size="lg" />
          <Avatar
            src={pf}
            name="Sanjoy Paul"
            size={90}
            variant="paper"
          />

          <Avatar
            name="Sanjoy Paul"
            showInitials
            size="xl"
            variant="yellow"
            showStatus
            status="online"
            hoverWiggle
            roughOptions={{
              roughness: 0.5
            }}
          />

          <Toast
            dottedShadow={false}
            variant="bubble"
            pointer="bottom-right"
            color="paper"
            width="20%"
            height={150}
            padding={40}
            rotate={-1}
            contentClassName="items-center justify-center text-center flex"
          >
            <p className="font-black -left-10 leading-snug text-xl max-md:text-sm max-sm:text-[16px]">
              Hii its a toast!
            </p>
          </Toast>

          <Loader />
          <Loader type="spinner" motion="slower" />
          <Loader type="dots" size="sm" color="black" motion="normal" />

          <Toggle shape="round" roughness={0.5} />
          <Toggle shape="rounded" roughness={0.5} />
          <Toggle
            roughness={0.5}
            trackShape="rounded"
            sliderShape="rounded"
            sliderColor="#fde047"
            borderColor="#111"
          />

          <Seperator
            orientation="vertical"
            length={160}
            variant="wavy"
            color="green"
            opacity={0.7}
          />
          <Seperator
            roughOptions={{
              roughness: 0.5
            }}
          />
          <Seperator variant="straight" roughOptions={{
            roughness: 1.25
          }} />
          <Seperator variant="dashed" opacity={0.5} roughOptions={{
            roughness: 0.5
          }} />
          <Seperator variant="curly" color="purple" amplitude={10} frequency={26} roughOptions={{
            roughness: 0.5
          }} />
          <Seperator variant="wavy" color="black" opacity={0.35} roughOptions={{
            roughness: 0.5
          }} />
        </div>
      </DoodleGridBackground>
    </main>
  );
}
