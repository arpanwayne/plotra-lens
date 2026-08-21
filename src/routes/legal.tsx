import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/plotra/site-nav";
import { SiteFooter } from "@/components/plotra/site-footer";
import { Reveal } from "@/lib/motion";
import { legalSections } from "@/lib/legal-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal — Plotra" },
      {
        name: "description",
        content:
          "Plotra's Terms & Conditions, Privacy Policy, Refund Policy, and other legal information.",
      },
    ],
  }),
  component: LegalPage,
  validateSearch: (search: Record<string, unknown>) => ({
    section: typeof search["section"] === "string" ? (search["section"] as string) : undefined,
  }),
});

function LegalPage() {
  const { section } = Route.useSearch();
  const initialIndex = Math.max(
    0,
    legalSections.findIndex((s) => s.slug === section),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex === -1 ? 0 : initialIndex);
  const active = legalSections[activeIndex]!;

  return (
    <main className="overflow-x-clip">
      <SiteNav />

      <section className="bg-lavender px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="label-eyebrow text-primary">Legal</p>
            <h1 className="text-balance-tight mt-4 max-w-2xl font-display text-4xl font-bold text-ink sm:text-6xl">
              Plotra legal information
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Operated by Wayne E Solutions, Ludhiana, Punjab, India. This page is a draft for legal
              review — highlighted placeholders below still need to be filled in before publishing.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_1fr]">
          {/* Section nav */}
          <nav className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex gap-2 overflow-x-auto pb-3 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
              {legalSections.map((s, i) => (
                <li key={s.slug} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "block w-full whitespace-nowrap rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors duration-300 lg:whitespace-normal lg:rounded-2xl",
                      i === activeIndex
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-lavender hover:text-ink",
                    )}
                  >
                    {i + 1}. {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Active section content */}
          <Reveal key={active.slug} className="min-w-0">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{active.title}</h2>
            <div className="legal-prose mt-2" dangerouslySetInnerHTML={{ __html: active.html }} />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
