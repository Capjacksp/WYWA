import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/common/Section";
import { Button } from "@/components/common/Button";
import { LoadTextLines } from "@/components/ui/scroll-text-lines";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <PageLayout headerClassName="header-dark">
      <Section className="py-24 text-center">
        <LoadTextLines
          as="h1"
          className="text-display font-bold"
          lines={["404"]}
        />
        <LoadTextLines
          as="p"
          className="text-body-lg text-muted-foreground mt-4 mb-8"
          delay={0.1}
          lines={["Page not found"]}
        />
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </Section>
    </PageLayout>
  );
}
