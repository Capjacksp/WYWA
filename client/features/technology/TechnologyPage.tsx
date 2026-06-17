import PageLayout from "@/components/layout/PageLayout";
import {
  MultimodalFusion,
  WildfireDetectionShowcase,
} from "@/features/technology/components/TechnologySections";
import { TechnologyHero } from "@/features/technology/components/TechnologyHero";
import { HowItWorks } from "@/features/technology/components/how-it-works/HowItWorks";

export default function TechnologyPage() {
  return (
    <PageLayout>
      <TechnologyHero />
      <section className="relative bg-bg-light">
        <HowItWorks />
        <div className="relative z-20 -mt-[100vh] max-md:mt-0">
          <MultimodalFusion />
          <div className="relative z-30">
            <WildfireDetectionShowcase />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
