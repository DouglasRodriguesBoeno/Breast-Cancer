import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function BentoCard({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"section">) {
  return (
    <section
      {...props}
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </section>
  );
}
