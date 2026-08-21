import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/plotra/site-nav";
import { SiteFooter } from "@/components/plotra/site-footer";
import { ListingsSection } from "@/components/plotra/sections/listings-section";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "Listings — Plotra" },
      {
        name: "description",
        content: "Browse live property listings published through Plotra.",
      },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  return (
    <main className="overflow-x-clip">
      <SiteNav />
      <div className="pt-24 sm:pt-28">
        <ListingsSection showAll />
      </div>
      <SiteFooter />
    </main>
  );
}
