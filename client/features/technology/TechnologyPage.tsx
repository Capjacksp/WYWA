import PageLayout from "@/components/layout/PageLayout";
import {
  MultimodalFusion,
  WildfireDetectionShowcase,
} from "@/features/technology/components/TechnologySections";
import { TechnologyHero } from "@/features/technology/components/TechnologyHero";
import { TechnologySectionTransition } from "@/features/technology/components/TechnologySectionTransition";
import { HowItWorks } from "@/features/technology/components/how-it-works/HowItWorks";

export default function TechnologyPage() {
  return (
    <PageLayout>
      <TechnologyHero />
      <TechnologySectionTransition />
      <HowItWorks />
      <MultimodalFusion />
      <WildfireDetectionShowcase />
    </PageLayout>
  );
}
