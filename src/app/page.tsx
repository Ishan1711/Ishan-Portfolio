import { Hero } from "@/sections/Hero";
import { BackgroundEnvironment } from "@/components/BackgroundEnvironment";
import { CenterpieceSphere } from "@/components/CenterpieceSphere";
import { About } from "@/sections/About";
import { Capabilities } from "@/sections/Capabilities";
import { Projects } from "@/sections/Projects";
import { Credentials } from "@/sections/Credentials";
import { Education } from "@/sections/Education";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505] relative isolate">
      <BackgroundEnvironment />
      <CenterpieceSphere />
      <Hero />
      <About />
      <Capabilities />
      <Projects />
      <Credentials />
      <Education />
      <Contact />
    </main>
  );
}
