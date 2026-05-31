"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock3, FilePlus2, Grid2X2, HeartPulse, ListChecks } from "lucide-react";

import { V2LanguageSwitcher } from "@/components/v2/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "@/i18n/use-translations";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems = [
    {
      href: isHome ? "#how" : "/#how",
      label: t("nav.how"),
      icon: ListChecks,
    },
    {
      href: "/#features",
      label: t("nav.features"),
      icon: FilePlus2,
    },
    {
      href: "/history",
      label: t("nav.history"),
      icon: Clock3,
    },
    {
      href: "/model",
      label: t("nav.model"),
      icon: Grid2X2,
    },
  ];

  return (
    <header className="animate-fade-in mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-2xl border border-border bg-card px-4 py-4 shadow-sm sm:px-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
            <HeartPulse className="size-5" />
          </div>

          <span className="text-lg font-semibold tracking-tight text-foreground">
            BreastCare <span className="text-primary-rose">AI</span>
          </span>
        </Link>

        <span className="hidden rounded-full bg-primary-rose-soft px-3 py-2 text-xs font-semibold text-primary-rose sm:inline-flex">
          {t("nav.educational")}
        </span>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        <nav className="grid grid-cols-2 gap-2 text-xs font-medium text-muted-foreground sm:grid-cols-4 md:flex md:items-center md:gap-5 md:text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 transition hover:border-primary-rose-soft hover:bg-primary-rose-soft/50 hover:text-primary-rose md:h-auto md:justify-start md:border-0 md:bg-transparent md:px-0 md:hover:bg-transparent md:hover:text-foreground"
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <V2LanguageSwitcher />

        <Link
          href="/new-analysis/report"
          className={cn(
            buttonVariants(),
            "h-11 rounded-xl bg-primary-rose px-5 text-white hover:bg-primary-rose-dark"
          )}
        >
          {t("nav.start")}
        </Link>
      </div>
    </header>
  );
}
