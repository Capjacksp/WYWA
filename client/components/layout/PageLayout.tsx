import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ConnectPopup from "@/components/common/ConnectPopup";

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * Top-level page wrapper.
 * Every page should be wrapped in <PageLayout> to get:
 * - Sticky Header with nav
 * - Connect popup (controlled from here)
 * - Footer
 */
export default function PageLayout({ children }: PageLayoutProps) {
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onConnectClick={() => setConnectOpen(true)} />

      <main className="flex-1 p-0 m-0">{children}</main>

      <Footer />

      <ConnectPopup open={connectOpen} onOpenChange={setConnectOpen} />
    </div>
  );
}
