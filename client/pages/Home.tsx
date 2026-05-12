import PageLayout from "@/components/layout/PageLayout";
import Hero from "@/components/ui/home-hero";
import {
  FusionSection,
  WildfireMapSection,
} from "@/components/ui/home-sections";

export default function Home() {
  return (
    <PageLayout>
      {/* ===== HERO SECTION ===== */}
      <Hero />

      {/* ===== NEW SECTIONS ===== */}
      <FusionSection />
      <WildfireMapSection />
    </PageLayout>
  );
}
