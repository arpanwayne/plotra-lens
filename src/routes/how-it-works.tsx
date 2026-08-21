import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/plotra/site-nav";
import { SiteFooter } from "@/components/plotra/site-footer";
import { HowItWorksSection } from "@/components/plotra/sections/how-it-works-section";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — Plotra" },
      {
        name: "description",
        content:
          "See how a WhatsApp message becomes a live, shareable Plotra property listing in four steps.",
      },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <main className="overflow-x-clip">
      <SiteNav />
      <div className="pt-24 sm:pt-28">
        <HowItWorksSection />
      </div>
      <SiteFooter />
    </main>
  );
}
