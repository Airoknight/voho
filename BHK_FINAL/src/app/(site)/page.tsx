import { Header } from "../../components/layout/header";
import { Hero } from "../../components/home/hero";
import { LocationHighlights } from "../../components/home/location-highlights";
import { Accommodation } from "../../components/home/accommodation";
import { Services } from "../../components/home/services";
import { GallerySection } from "../../components/home/gallery-section";

import { ScrollReveal } from "../../components/scroll-animations";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-accent selection:text-white overflow-x-hidden">
      <Header />
      <Hero />

      <ScrollReveal>
        <GallerySection />
      </ScrollReveal>

      <ScrollReveal>
        <Accommodation />
      </ScrollReveal>



      <ScrollReveal>
        <LocationHighlights />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Services />
      </ScrollReveal>

      <div className="pb-12"></div>
    </main>
  );
}
