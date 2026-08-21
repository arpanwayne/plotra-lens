import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/plotra/site-nav";
import { SiteFooter } from "@/components/plotra/site-footer";
import { ShowcaseSection } from "@/components/plotra/sections/showcase-section";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title: "Showcase — Plotra" },
      {
        name: "description",
        content: "Real moments from a Plotra dealer's week, in nine-by-sixteen.",
      },
    ],
  }),
  component: ShowcasePage,
});

function ShowcasePage() {
  return (
    <main className="overflow-x-clip">
      <SiteNav />
      <div className="pt-24 sm:pt-28">
        <ShowcaseSection />
      </div>
      <SiteFooter />
    </main>
  );
}
