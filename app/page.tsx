import Image from "next/image";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Features } from "@/components/site/Feature";
import { Feedback } from "@/components/site/Feedback";
import { Footer } from "@/components/site/Footer";
import { DemoComboBox } from "@/components/examples/ComboBox-demo";

export default function Home() {

  return (
    <main className="bg-[#fffbf2]">
      {/*<Navbar />
      <Hero />
      <About />
      <Features />
      <Feedback />
      <Footer />*/}
      <DemoComboBox />
    </main>
  );
}
