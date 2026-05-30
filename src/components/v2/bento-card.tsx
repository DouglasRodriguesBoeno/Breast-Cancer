import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function BentoCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </section>
  );
}
