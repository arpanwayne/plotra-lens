import plotraIcon from "@/assets/plotra-icon.png";
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
      <img src={plotraIcon} alt="" aria-hidden className="size-8 shrink-0 object-contain" />
      Plotra
    </span>
  );
}
