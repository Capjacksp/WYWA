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
      <div className="min-h-[500px] h-full w-full">
        <video width="100%" src="/videos/Wywa.mp4" autoPlay loop poster="/images/video-overlay.png" controls ></video>
      </div>
      <WildfireMapSection />
    </PageLayout>
  );
}
