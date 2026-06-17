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
      <HowItWorks />
      <MultimodalFusion />
      <WildfireDetectionShowcase />
    </PageLayout>
  );
}
