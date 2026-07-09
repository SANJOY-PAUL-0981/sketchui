import Image from "next/image";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Features } from "@/components/site/Feature";
import { Feedback } from "@/components/site/Feedback";
import { Footer } from "@/components/site/Footer";
import { Checkbox } from "@/components/ui/Checkbox";

export default function Home() {

  return (
    <main className="bg-[#fffbf2]">
      {/*<Navbar />
      <Hero />
      <About />
      <Features />
      <Feedback />
      <Footer />*/}
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-6">
          <Checkbox
            label="Accept Terms"
            defaultChecked
          />

          <Checkbox
            label="Rounded"
            shape="rounded"
            variant="yellow"
            defaultChecked
            rotate={-2}
            roughOptions={{
              roughness: 1
            }}
          />

          <Checkbox
            label="Circle"
            shape="circle"
            variant="green"
            checkStyle="dot"
            defaultChecked
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Checkbox
            label="Paper"
            variant="paper"
            checkStyle="scribble"
            defaultChecked
          />

          <Checkbox
            label="Cross"
            variant="pink"
            checkStyle="cross"
            defaultChecked
            roughOptions={{
              fillStyle: "solid",
            }}
          />

          <Checkbox
            label="Plus"
            variant="blue"
            checkStyle="plus"
            defaultChecked
            roughOptions={{
              roughness: 0.5,
              bowing: 1.5,
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Checkbox
            label="Small"
            size="sm"
            defaultChecked
          />

          <Checkbox
            label="Large"
            size="lg"
            variant="orange"
            defaultChecked
          />

          <Checkbox
            label="Custom"
            size={42}
            variant="purple"
            checkStyle="scribble"
            defaultChecked
          />
        </div>
      </div>
    </main>
  );
}
