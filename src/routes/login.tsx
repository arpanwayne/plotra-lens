import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthField, AuthShell } from "@/components/plotra/auth-shell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Dealer sign in — Plotra" },
      { name: "description", content: "Sign in to your Plotra dealer dashboard." },
      { property: "og:title", content: "Dealer sign in — Plotra" },
      { property: "og:description", content: "Access your Plotra listings, leads and billing." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your listings, leads and team."
      footer={
        <p className="text-xs">
          Plotra accounts are invite and admin-approval only.{" "}
          <Link to="/request-access" className="font-semibold text-primary">
            Request access
          </Link>
        </p>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            toast.success("Signed in", { description: "Opening your dashboard." });
          }, 700);
        }}
      >
        <AuthField label="Email" type="email" required placeholder="you@business.in" />
        <AuthField label="Password" type="password" required placeholder="••••••••" />
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"} <ArrowRight />
        </Button>
        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-ink-foreground/60 transition-colors hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
