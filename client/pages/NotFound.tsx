import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/common/Section";
import { Button } from "@/components/common/Button";

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
        <h1 className="text-display font-bold">404</h1>
        <p className="text-body-lg text-muted-foreground mt-4 mb-8">
          Page not found
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </Section>
    </PageLayout>
  );
}
