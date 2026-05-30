import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeSelectionCard({
  href,
  title,
  description,
  cta,
  icon: Icon,
  bullets = [],
  recommended = false,
}: {
  href: string;
  title: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  bullets?: string[];
  recommended?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        recommended ? "border-primary-rose" : "border-border"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-xl",
            recommended
              ? "bg-primary-rose-soft text-primary-rose"
              : "bg-accent-blue-soft text-accent-blue"
          )}
        >
          <Icon className="size-6" />
        </div>

        {recommended ? (
          <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
            Recomendado
          </Badge>
        ) : null}
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {bullets.length > 0 ? (
        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary-teal-dark" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: recommended ? "default" : "outline" }),
          "mt-auto h-12 w-full rounded-xl px-5 text-sm font-semibold",
          recommended
            ? "bg-primary-rose text-white hover:bg-primary-rose-dark"
            : "border-border bg-white text-foreground hover:bg-muted"
        )}
      >
        {cta}
        <ArrowRight className="ml-2 size-4" />
      </Link>
    </article>
  );
}
