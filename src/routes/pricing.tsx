import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/plotra/site-nav";
import { SiteFooter } from "@/components/plotra/site-footer";
import { PricingSection } from "@/components/plotra/sections/pricing-section";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Plotra" },
      {
        name: "description",
        content: "Straightforward Plotra subscription plans. No lock-in.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <main className="overflow-x-clip">
      <SiteNav />
      <div className="pt-24 sm:pt-28">
        <PricingSection />
      </div>
      <SiteFooter />
    </main>
  );
}
