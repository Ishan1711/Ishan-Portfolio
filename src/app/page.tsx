import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Capabilities } from "@/sections/Capabilities";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505]">
      <Hero />
      <About />
      <Capabilities />
    </main>
  );
}
