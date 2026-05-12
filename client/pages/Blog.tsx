import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/common/Section";

export default function Blog() {
  return (
    <PageLayout>
      <Section className="py-24">
        <h1 className="text-display font-bold">Blog</h1>
        <p className="text-body-lg text-muted-foreground mt-4">
          Static blog posts go here.
        </p>
      </Section>
    </PageLayout>
  );
}
