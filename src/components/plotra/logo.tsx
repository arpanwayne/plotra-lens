import { cn } from "@/lib/utils";

export function PlotraLogo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-center gap-2 text-lg font-bold tracking-tight",
        tone === "light" ? "text-ink-foreground" : "text-ink",
        className,
      )}
    >
      <span className="relative inline-flex size-7 items-center justify-center rounded-[9px] bg-primary">
        <span className="size-2.5 rounded-[3px] bg-primary-foreground" />
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent" />
      </span>
      Plotra
    </span>
  );
}
