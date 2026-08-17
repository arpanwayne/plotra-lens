import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  MessageCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/plotra/site-nav";
import { SiteFooter } from "@/components/plotra/site-footer";
import { PhoneMockup } from "@/components/plotra/phone-mockup";
import { PropertyCard } from "@/components/plotra/property-card";
import { ReelStrip } from "@/components/plotra/reel-strip";
import { FloatingMedia, MetaPill, PopImage } from "@/components/plotra/media";
import { Reveal, useCountUp, useMagnetic, useParallax } from "@/lib/motion";
import { listings, media, plans } from "@/lib/plotra-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plotra — List property by sending a WhatsApp message" },
      {
        name: "description",
        content:
          "Plotra turns a simple WhatsApp message into a professional, shareable property listing. The WhatsApp-native CRM for Punjab property dealers.",
      },
      { property: "og:title", content: "Plotra — WhatsApp-native real estate CRM" },
      {
        property: "og:description",
        content:
          "Send property details on WhatsApp. Plotra extracts, builds and publishes a live listing page.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="overflow-x-clip">
      <SiteNav />
      <Hero />
      <Bridge />
      <HowItWorks />
      <Showcase />
      <FeaturedListings />
      <SatelliteStory />
      <Trust />
      <Pricing />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

/* ---------------------------------- HERO ---------------------------------- */

function Hero() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.22);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      {/* cinematic background media */}
      <img
        src={media.heroAerial}
        alt="Aerial view of a developing residential neighbourhood in Punjab at golden hour"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full scale-110 object-cover kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/35 to-ink/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,transparent,oklch(0.219_0.032_264.2/0.55))]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pb-28 pt-32 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-36">
        <div>
          <Reveal>
            <MetaPill className="text-accent">
              <span className="size-1.5 rounded-full bg-accent pulse-soft" /> WhatsApp-native
              property CRM · Punjab
            </MetaPill>
          </Reveal>

          <h1 className="text-balance-tight mt-7 font-display text-[13vw] font-bold text-ink-foreground sm:text-6xl lg:text-[5.2rem]">
            {["List a property", "by simply sending", "a WhatsApp message."].map((line, i) => (
              <Reveal key={line} delay={i * 140} className="block">
                <span className={cn(i === 2 && "text-primary")}>{line}</span>
              </Reveal>
            ))}
          </h1>

          <Reveal delay={420}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
              Plotra turns a simple WhatsApp message into a professional, shareable property
              listing — with satellite imagery, plot boundary and a live page buyers can open
              instantly.
            </p>
          </Reveal>

          <Reveal delay={560}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link ref={ctaRef} to="/request-access" className="inline-block">
                <Button variant="hero" size="xl" asChild>
                  <span>
                    Request Access <ArrowRight />
                  </span>
                </Button>
              </Link>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-foreground/80 transition-colors hover:text-ink-foreground"
              >
                See how Plotra works
                <span className="transition-transform duration-500 group-hover:translate-y-1">
                  ↓
                </span>
              </a>
            </div>
          </Reveal>

          {/* floating hero property card */}
          <Reveal variant="pop" delay={700} className="mt-12 max-w-sm lg:absolute lg:bottom-24 lg:mt-0">
            <div className="glass float-slow rounded-3xl p-3">
              <div className="media-zoom overflow-hidden rounded-2xl">
                <img
                  src={media.plotAerial}
                  alt="Residential plot in Ludhiana"
                  loading="lazy"
                  className="h-32 w-full object-cover"
                />
              </div>
              <div className="flex items-end justify-between px-1.5 pb-1 pt-3">
                <div>
                  <p className="label-eyebrow text-accent">Residential Plot</p>
                  <p className="font-display text-2xl font-bold text-ink-foreground">₹1.25 Cr</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-foreground/70">
                    <MapPin className="size-3.5 text-primary pulse-soft" /> Ludhiana, Punjab ·
                    2,000 sq.ft
                  </p>
                </div>
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold text-accent">
                  Live
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <PhoneMockup />
          <MetaPill className="float-slower absolute -left-2 top-6 text-accent sm:left-2">
            <Sparkles className="size-3.5" /> AI Listing Created ✓
          </MetaPill>
          <MetaPill className="float-slow absolute -right-1 bottom-24 sm:right-4">
            <MessageCircle className="size-3.5 text-accent" /> New buyer message
          </MetaPill>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-ink-foreground/70">
        <span className="label-eyebrow">Scroll to explore</span>
        <span className="scroll-cue text-sm">↓</span>
      </div>
    </section>
  );
}

/* --------------------------------- BRIDGE --------------------------------- */

function Bridge() {
  const items = [
    "AI extraction in Punjabi, Hindi & English",
    "Satellite plot boundary",
    "Live shareable listing link",
    "Lead scoring built in",
    "No app for your buyers",
  ];
  return (
    <section className="-mt-8 rounded-t-[2.5rem] bg-lavender py-6">
      <div className="flex overflow-hidden">
        <div className="marquee-x flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-sm font-medium text-indigo-deep/80"
            >
              <Zap className="size-3.5 text-primary" /> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ HOW IT WORKS ------------------------------ */

const steps = [
  {
    n: "01",
    title: "Send the Property",
    body: "Text plot size, location and price to your Plotra WhatsApp number — the way you already message your buyers.",
    src: media.streetView,
  },
  {
    n: "02",
    title: "Plotra Understands It",
    body: "AI extracts location, price, plot size and property type, then pulls satellite imagery for the parcel.",
    src: media.satellitePlot,
  },
  {
    n: "03",
    title: "Listing Goes Live",
    body: "A professional property page is generated with photos, boundary, nearby landmarks and your business name.",
    src: media.houseExterior,
  },
  {
    n: "04",
    title: "Share With Buyers",
    body: "Forward one link. Every open, enquiry and callback request lands in your Plotra lead inbox.",
    src: media.plotAerial,
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-lavender px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="label-eyebrow text-primary">How it works</p>
          <h2 className="text-balance-tight mt-4 max-w-2xl font-display text-4xl font-bold text-ink sm:text-6xl">
            One message in. A live listing out.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 120} className="relative">
              {i < steps.length - 1 ? (
                <span className="absolute -right-4 top-[28%] hidden h-px w-8 bg-gradient-to-r from-primary to-accent lg:block" />
              ) : null}
              <div className="group">
                <div className="media-zoom relative aspect-[9/16] overflow-hidden rounded-3xl shadow-[var(--shadow-lift)] lg:aspect-[3/4]">
                  <img src={step.src} alt={step.title} loading="lazy" className="size-full object-cover" />
                  <span className="veil absolute inset-0" />
                  <span className="font-display absolute left-4 top-4 text-3xl font-bold text-ink-foreground/85">
                    {step.n}
                  </span>
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-accent/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                    Step live
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- SHOWCASE -------------------------------- */

function Showcase() {
  return (
    <section id="showcase" className="surface-ink overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-eyebrow text-accent">Showcase reel</p>
            <h2 className="text-balance-tight mt-4 max-w-xl font-display text-4xl font-bold text-ink-foreground sm:text-6xl">
              Everything a dealer does in a day, in nine-by-sixteen.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink-foreground/60">
            Drag sideways. Each reel is a real moment from a Plotra dealer's week.
          </p>
        </Reveal>
      </div>
      <div className="mt-14">
        <ReelStrip />
      </div>
    </section>
  );
}

/* ---------------------------- FEATURED LISTINGS --------------------------- */

function FeaturedListings() {
  const feature = listings[0];
  return (
    <section id="listings" className="bg-background px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="label-eyebrow text-primary">Featured listings</p>
          <h2 className="text-balance-tight mt-4 max-w-2xl font-display text-4xl font-bold text-ink sm:text-6xl">
            Pages buyers actually finish reading.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-6">
          <div className="md:col-span-4">
            <PropertyCard listing={feature} ratio="aspect-[16/10]" />
          </div>
          <div className="md:col-span-2">
            <PropertyCard listing={listings[1]} ratio="aspect-[4/5]" />
          </div>
          <div className="md:col-span-2">
            <PropertyCard listing={listings[2]} ratio="aspect-[4/5]" />
          </div>
          <div className="md:col-span-2">
            <PropertyCard listing={listings[3]} ratio="aspect-[4/5]" />
          </div>
          <div className="md:col-span-2">
            <PropertyCard listing={listings[5]} ratio="aspect-[4/5]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- SATELLITE STORY ----------------------------- */

function SatelliteStory() {
  return (
    <section className="relative overflow-hidden bg-lavender px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <PopImage
            src={media.satellitePlot}
            alt="Satellite view of a plot with traced boundary"
            ratio="aspect-square"
            parallax={0.06}
            className="shadow-[var(--shadow-float)]"
            overlay={
              <>
                <svg
                  viewBox="0 0 100 100"
                  className="pointer-events-none absolute inset-0 size-full"
                  aria-hidden
                >
                  <polygon
                    points="30,32 70,34 69,70 31,72"
                    fill="oklch(0.7 0.184 33.5 / 0.12)"
                    stroke="oklch(0.7 0.184 33.5)"
                    strokeWidth="0.7"
                    strokeDasharray="160"
                    className="[stroke-dashoffset:0]"
                  />
                  {[
                    [30, 32],
                    [70, 34],
                    [69, 70],
                    [31, 72],
                  ].map(([x, y]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" fill="oklch(0.78 0.128 178.5)" />
                  ))}
                </svg>
                <MetaPill className="absolute left-4 top-4 text-accent">
                  <Check className="size-3.5" /> Boundary verified
                </MetaPill>
              </>
            }
          />
          <FloatingMedia
            src={media.houseExterior}
            alt="House exterior at dusk"
            caption="Ludhiana · 2,000 sq.ft"
            price="₹1.25 Cr"
            className="absolute -bottom-10 -right-4 w-44 sm:w-60"
            rotate="2deg"
          />
        </div>

        <Reveal>
          <p className="label-eyebrow text-primary">Satellite to street</p>
          <h2 className="text-balance-tight mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
            Buyers trust what they can see from above.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Every Plotra listing pairs satellite imagery with a traced plot boundary and real
            photography — so a buyer three cities away understands the parcel before they call.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Trace the exact polygon on the satellite map",
              "Coral for active boundary, mint once verified",
              "Street view, aerial and walkthrough in one page",
              "WhatsApp link preview with a strong hero image",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                  <Check className="size-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Button asChild variant="ink" size="lg" className="mt-9">
            <Link to="/property/$id" params={{ id: listings[0].id }}>
              See a live listing <ArrowUpRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- TRUST --------------------------------- */

const stats = [
  { value: 2500, suffix: "+", label: "Properties Listed" },
  { value: 450, suffix: "+", label: "Dealers" },
  { value: 12, suffix: "K+", label: "Buyer Conversations" },
  { value: 8000, suffix: "+", label: "Links Shared" },
];

function Trust() {
  const parallaxRef = useParallax<HTMLImageElement>(0.08);

  return (
    <section className="surface-ink overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <p className="label-eyebrow text-accent">Trusted across Punjab</p>
            <h2 className="text-balance-tight mt-4 max-w-lg font-display text-4xl font-bold text-ink-foreground sm:text-5xl">
              Numbers that come from real dealer activity.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
            {stats.map((s, i) => (
              <Stat key={s.label} {...s} delay={i * 100} />
            ))}
          </div>
        </div>

        <Reveal variant="pop" className="media-zoom relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <img
            ref={parallaxRef}
            src={media.nightNeighborhood}
            alt="Aerial night view of an Indian neighbourhood"
            loading="lazy"
            className="size-full scale-110 object-cover"
          />
          <span className="veil absolute inset-0 opacity-70" />
          <MetaPill className="absolute bottom-5 left-5 text-accent">
            <span className="size-1.5 rounded-full bg-accent pulse-soft" /> 41 listings live tonight
          </MetaPill>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, display } = useCountUp(value);
  return (
    <Reveal delay={delay}>
      <p className="font-display text-5xl font-bold tracking-tight text-ink-foreground sm:text-6xl">
        <span ref={ref}>{display.toLocaleString("en-IN")}</span>
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-ink-foreground/60">{label}</p>
    </Reveal>
  );
}

/* --------------------------------- PRICING -------------------------------- */

function Pricing() {
  return (
    <section id="pricing" className="bg-background px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="label-eyebrow text-primary">Pricing</p>
          <h2 className="text-balance-tight mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
            Straightforward plans. No lock-in.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 110}>
              <div
                className={cn(
                  "group lift relative flex h-full flex-col rounded-[1.75rem] border bg-card p-7",
                  plan.recommended
                    ? "border-primary/40 shadow-[var(--shadow-glow)]"
                    : "border-border hover:border-primary/30",
                )}
              >
                {plan.recommended ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    Recommended
                  </span>
                ) : null}
                <h3 className="font-display text-2xl font-bold text-ink">{plan.name}</h3>
                <p className="mt-4 font-display text-4xl font-bold text-ink">
                  {plan.price}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">
                    {plan.period}
                  </span>
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {plan.limit}
                </p>
                <ul className="mt-7 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-foreground opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={plan.recommended ? "hero" : "outline"}
                  size="lg"
                  className="mt-8 w-full"
                >
                  <Link to="/request-access">
                    Request Access <ArrowRight />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FINAL CTA ------------------------------- */

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="media-zoom relative min-h-[70vh]">
        <img
          src={media.nightNeighborhood}
          alt="Neighbourhood at twilight"
          loading="lazy"
          className="absolute inset-0 size-full scale-105 object-cover kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
        {[
          { top: "28%", left: "18%" },
          { top: "44%", left: "62%" },
          { top: "60%", left: "38%" },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute size-2 rounded-full bg-accent pulse-soft"
            style={{ ...pos, animationDelay: `${i * 700}ms` }}
          />
        ))}

        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
          <Reveal>
            <h2 className="text-balance-tight font-display text-4xl font-bold text-ink-foreground sm:text-6xl">
              Turn WhatsApp messages into professional property listings.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base text-ink-foreground/70">
              Plotra is invite-only while we onboard dealers city by city. Tell us about your
              business and we'll set you up.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <Button asChild variant="hero" size="xl" className="mt-9">
              <Link to="/request-access">
                Request Access <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
