import { HydrateClient } from "@/trpc/server";
import { Navbar } from "./_components/navbar";
import { HeroSection } from "./_components/hero";
import { AboutSection } from "./_components/about";
import { ActivitiesSection } from "./_components/activities";
import { ImpactSection } from "./_components/impact";
import { TestimonialsSection } from "./_components/testimonials";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ActivitiesSection />
        <ImpactSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </HydrateClient>
  );
}
