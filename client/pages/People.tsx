import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/common/Section";

export default function People() {
  return (
    <PageLayout>
      <Section className="py-24">
        <h1 className="text-display font-bold">People</h1>
        <p className="text-body-lg text-muted-foreground mt-4">
          Team members go here.
        </p>
      </Section>
    </PageLayout>
  );
}
