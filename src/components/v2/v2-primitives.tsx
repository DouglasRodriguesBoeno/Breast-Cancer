import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function V2IconBubble({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-2xl",
        className
      )}
    >
      <Icon className="size-5" />
    </div>
  );
}

export function V2SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-rose">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function V2FeatureCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <article
      style={style}
      className={cn(
        "card-hover-lift animate-slide-up rounded-2xl border border-border bg-white p-5 shadow-sm",
        className
      )}
    >
      {children}
    </article>
  );
}
