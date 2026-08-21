import plotraLogoFull from "@/assets/plotra-logo-full.png";
import { cn } from "@/lib/utils";

export function PlotraLogo({
  className,
  tone: _tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <img
      src={plotraLogoFull}
      alt="Plotra"
      className={cn("h-10 w-auto shrink-0 object-contain", className)}
    />
  );
}
