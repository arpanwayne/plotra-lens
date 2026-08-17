import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlotraLogo } from "@/components/plotra/logo";
import { SiteFooter } from "@/components/plotra/site-footer";
import { MetaPill, PopImage } from "@/components/plotra/media";
import { Reveal } from "@/lib/motion";
import { listings, media, nearby } from "@/lib/plotra-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/property/$id")({
  loader: ({ params }) => {
    const listing = listings.find((l) => l.id === params.id);
    if (!listing) throw notFound();
    return listing;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${listing_title(loaderData.title)} — ${loaderData.price} | Plotra` },
          { name: "description", content: loaderData.description.slice(0, 155) },
          { property: "og:title", content: `${loaderData.title} — ${loaderData.price}` },
          { property: "og:description", content: loaderData.description.slice(0, 155) },
        ]
      : [],
  }),
  component: PropertyPage,
});

function listing_title(t: string) {
  return t.length > 44 ? `${t.slice(0, 44)}…` : t;
}

function PropertyPage() {
  const listing = Route.useLoaderData();
  const gallery = [listing.image, media.satellitePlot, media.streetView, media.houseExterior];
  const [view, setView] = useState<"satellite" | "street">("satellite");
  const [active, setActive] = useState(0);
  const [boundaryOn, setBoundaryOn] = useState(false);

  return (
    <main className="bg-background pb-24 sm:pb-0">
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2 text-ink-foreground">
            <ArrowLeft className="size-4" />
            <PlotraLogo tone="light" />
          </Link>
          <span className="text-xs font-medium text-ink-foreground/70">{listing.dealer}</span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[74svh] overflow-hidden">
        <img
          src={view === "satellite" ? listing.satellite : media.streetView}
          alt={listing.title}
          className="absolute inset-0 size-full scale-110 object-cover kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/50" />

        {listing.boundary && view === "satellite" ? (
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
            <polygon
              points="32,34 68,36 67,68 33,70"
              onClick={() => setBoundaryOn((v) => !v)}
              className="cursor-pointer transition-all duration-700"
              fill={boundaryOn ? "oklch(0.7 0.184 33.5 / 0.22)" : "oklch(0.78 0.128 178.5 / 0.1)"}
              stroke={boundaryOn ? "oklch(0.7 0.184 33.5)" : "oklch(0.78 0.128 178.5)"}
              strokeWidth="0.6"
            />
          </svg>
        ) : null}

        <div className="absolute right-4 top-20 flex gap-2">
          {(["satellite", "street"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-all duration-500",
                view === v ? "bg-primary text-primary-foreground" : "glass text-ink-foreground",
              )}
            >
              {v} view
            </button>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-10 sm:px-8">
          <Reveal>
            <MetaPill className="text-accent">
              <span className="size-1.5 rounded-full bg-accent pulse-soft" /> {listing.type}
            </MetaPill>
            <h1 className="text-balance-tight mt-4 max-w-2xl font-display text-4xl font-bold text-ink-foreground sm:text-6xl">
              {listing.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-foreground/80">
              <span className="font-display text-3xl font-bold text-primary">{listing.price}</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-accent" /> {listing.city}
              </span>
              <span>{listing.area}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* DETAILS + GALLERY */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <p className="label-eyebrow text-primary">About this property</p>
            <p className="mt-4 text-lg leading-relaxed text-foreground">{listing.description}</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Type", listing.type],
              ["Plot area", listing.area],
              ["City", listing.city.split(",")[0] ?? listing.city],
              ["Status", listing.status],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border bg-card p-4">
                <p className="label-eyebrow text-muted-foreground">{k}</p>
                <p className="mt-1.5 text-sm font-semibold text-ink">{v}</p>
              </div>
            ))}
          </div>

          {/* gallery */}
          <div className="mt-12">
            <PopImage
              src={gallery[active] ?? listing.image}
              alt={`${listing.title} photo ${active + 1}`}
              ratio="aspect-[16/10]"
            />
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "media-zoom size-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-500",
                    active === i ? "border-primary" : "border-transparent opacity-70",
                  )}
                >
                  <img src={g} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-center gap-1.5">
              {gallery.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    active === i ? "w-6 bg-primary" : "w-1.5 bg-border",
                  )}
                />
              ))}
            </div>
          </div>

          {/* nearby */}
          <div className="mt-14">
            <p className="label-eyebrow text-primary">Nearby</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {nearby.map((n) => (
                <div
                  key={n.name}
                  className="lift rounded-2xl border border-border bg-card p-4"
                >
                  <p className="text-sm font-semibold text-ink">{n.name}</p>
                  <p className="label-eyebrow mt-1 text-accent">{n.kind}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {n.distance} · {n.walk} · {n.drive}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-[var(--shadow-lift)]">
            <p className="label-eyebrow text-muted-foreground">Listed by</p>
            <p className="mt-1.5 font-display text-xl font-bold text-ink">{listing.dealer}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {listing.visits.toLocaleString("en-IN")} buyer visits on this page
            </p>

            <Button variant="hero" size="lg" className="mt-6 w-full">
              <MessageCircle /> Chat on WhatsApp
            </Button>

            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <p className="text-sm font-semibold text-ink">Share your number for a callback</p>
              <input
                type="tel"
                placeholder="+91 98140 00000"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[var(--shadow-glow)]"
              />
              <Button type="submit" variant="outline" size="lg" className="w-full">
                <Phone /> Request callback
              </Button>
              <p className="text-[11px] text-muted-foreground">
                We share your number only with {listing.dealer}.
              </p>
            </form>
          </div>
        </aside>
      </section>

      {/* sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur sm:hidden">
        <Button variant="hero" size="lg" className="w-full">
          <span className="relative mr-1 flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-accent pulse-soft" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Chat on WhatsApp
        </Button>
      </div>

      <SiteFooter />
    </main>
  );
}
