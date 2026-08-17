import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField, AuthShell } from "@/components/plotra/auth-shell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Plotra" },
      { name: "description", content: "Request a password reset link for your Plotra dealer account." },
      { property: "og:title", content: "Reset your password — Plotra" },
      { property: "og:description", content: "Two-step password recovery for Plotra dealers." },
    ],
  }),
  component: ForgotPasswordPage,
});

type Stage = "request" | "sent" | "reset" | "done";

function ForgotPasswordPage() {
  const [stage, setStage] = useState<Stage>("request");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  return (
    <AuthShell
      title={stage === "reset" ? "Choose a new password" : "Password recovery"}
      subtitle={
        stage === "reset"
          ? "Minimum 8 characters. Use something you don't reuse elsewhere."
          : "We'll email you a secure reset link."
      }
      footer={
        <Link to="/login" className="text-xs font-semibold text-primary">
          ← Back to login
        </Link>
      }
    >
      {stage === "request" ? (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setStage("sent");
          }}
        >
          <AuthField label="Email" type="email" required placeholder="you@business.in" />
          <Button type="submit" variant="hero" size="lg" className="w-full">
            Send reset link <ArrowRight />
          </Button>
        </form>
      ) : null}

      {stage === "sent" ? (
        <div className="space-y-5">
          <p className="rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-ink-foreground/85">
            If an account exists, a password reset link has been sent.
          </p>
          <Button variant="glass" size="lg" className="w-full" onClick={() => setStage("reset")}>
            I have the link — continue
          </Button>
        </div>
      ) : null}

      {stage === "reset" ? (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (password.length < 8) return setError("Password must be at least 8 characters.");
            if (password !== confirm) return setError("Passwords do not match.");
            setError("");
            setStage("done");
          }}
        >
          <AuthField
            label="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <AuthField
            label="Confirm password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
          <Button type="submit" variant="hero" size="lg" className="w-full">
            Update password <ArrowRight />
          </Button>
        </form>
      ) : null}

      {stage === "done" ? (
        <div className="space-y-5 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent/20 text-accent">
            <Check className="size-6" />
          </span>
          <p className="text-sm text-ink-foreground/80">
            Your password has been updated. You can sign in now.
          </p>
          <Button asChild variant="hero" size="lg" className="w-full">
            <Link to="/login">Back to login</Link>
          </Button>
        </div>
      ) : null}
    </AuthShell>
  );
}
