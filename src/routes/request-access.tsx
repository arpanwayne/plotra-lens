import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlotraLogo } from "@/components/plotra/logo";
import { media } from "@/lib/plotra-data";
import { Reveal, useParallax } from "@/lib/motion";

export const Route = createFileRoute("/request-access")({
  head: () => ({
    meta: [
      { title: "Request access — Plotra for dealers" },
      {
        name: "description",
        content: "Tell us about your property business and we'll set up your Plotra dealer account.",
      },
      { property: "og:title", content: "Request access — Plotra" },
      { property: "og:description", content: "Invite-only onboarding for Punjab property dealers." },
    ],
  }),
  component: RequestAccessPage,
});

function RequestAccessPage() {
  const [sent, setSent] = useState(false);
  const bgRef = useParallax<HTMLImageElement>(0.1);

  return (
    <main className="grid min-h-[100svh] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img
          ref={bgRef}
          src={media.plotAerial}
          alt="Aerial view of plots along a Punjab highway"
          className="absolute inset-0 size-full scale-125 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-sm">
          <p className="label-eyebrow text-accent">Onboarding</p>
          <p className="mt-3 font-display text-3xl font-bold leading-tight text-ink-foreground">
            We onboard dealers city by city, with a real setup call.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-5 py-16 sm:px-10">
        <Reveal className="w-full max-w-md">
          <Link to="/">
            <PlotraLogo />
          </Link>

          {sent ? (
            <div className="mt-10">
              <span className="grid size-12 place-items-center rounded-full bg-accent/20 text-accent">
                <Check className="size-6" />
              </span>
              <h1 className="mt-6 font-display text-3xl font-bold text-ink">Request submitted</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Your request has been submitted. Our team reviews new dealer accounts within one
                working day and will contact you on the number you shared.
              </p>
              <Button asChild variant="ink" size="lg" className="mt-8">
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          ) : (
            <>
              <h1 className="mt-8 font-display text-4xl font-bold text-ink">Request access</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Accounts are invite and admin-approval only.
              </p>
              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Field label="Business name" required placeholder="Sandhu Property Consultants" />
                <Field label="Contact name" required placeholder="Jaskaran Sandhu" />
                <Field label="Email" type="email" required placeholder="you@business.in" />
                <Field label="Phone" type="tel" required placeholder="+91 98140 00000" />
                <label className="block">
                  <span className="label-eyebrow text-muted-foreground">Message (optional)</span>
                  <textarea
                    rows={3}
                    placeholder="Cities you work in, roughly how many listings you handle…"
                    className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[var(--shadow-glow)]"
                  />
                </label>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Submit Request <ArrowRight />
                </Button>
              </form>
            </>
          )}
        </Reveal>
      </div>
    </main>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="label-eyebrow text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all duration-500 focus:border-primary focus:shadow-[var(--shadow-glow)]"
      />
    </label>
  );
}
