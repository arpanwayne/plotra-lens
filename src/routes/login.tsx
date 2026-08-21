import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthField, AuthShell } from "@/components/plotra/auth-shell";
import { ApiError, login, saveSession } from "@/lib/api";

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
  const navigate = useNavigate();

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
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const email = String(form.get("email") ?? "");
          const password = String(form.get("password") ?? "");

          setLoading(true);
          try {
            const { token, dealer } = await login(email, password);
            saveSession(token, dealer);
            toast.success("Signed in", {
              description: `Welcome back, ${dealer.businessName}.`,
            });
            navigate({ to: "/" });
          } catch (err) {
            const message =
              err instanceof ApiError ? err.message : "Could not reach Plotra. Try again.";
            toast.error("Sign in failed", { description: message });
          } finally {
            setLoading(false);
          }
        }}
      >
        <AuthField name="email" label="Email" type="email" required placeholder="you@business.in" />
        <AuthField
          name="password"
          label="Password"
          type="password"
          required
          placeholder="••••••••"
        />
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"} <ArrowRight />
        </Button>
        <div className="text-center">
          <Link
            to="/forgot-password"
            search={{ token: undefined }}
            className="text-xs font-medium text-ink-foreground/60 transition-colors hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
