import { HydrateClient } from "@/trpc/server";
import { Navbar } from "./_components/navbar";
import { HeroSection } from "./_components/hero";
import { AboutSection } from "./_components/about";
import { ActivitiesSection } from "./_components/activities";
import { ImpactSection } from "./_components/impact";
import { CancerRunSection } from "./_components/cancer-run";
import { VolunteerSection } from "./_components/volunteer-section";
import { TestimonialsSection } from "./_components/testimonials";
import { ContactSection } from "./_components/contact";
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
        <CancerRunSection />
        <TestimonialsSection />
        <VolunteerSection />
        <ContactSection />
        <Footer />
      </main>
    </HydrateClient>
  );
}
