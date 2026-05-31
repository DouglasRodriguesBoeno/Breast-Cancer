"use client";

import Link from "next/link";
import { Clock3, FilePlus2, Grid2X2, HeartPulse } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { V2LanguageSwitcher } from "@/components/v2/language-switcher";
import { useTranslations } from "@/i18n/use-translations";

export function AppHeader() {
  const { t } = useTranslations();

  const navItems = [
    {
      href: "/new-analysis",
      label: t("nav.new"),
      desktopLabel: t("nav.new"),
      icon: FilePlus2,
    },
    {
      href: "/history",
      label: t("nav.history"),
      desktopLabel: t("nav.history"),
      icon: Clock3,
    },
    {
      href: "/model",
      label: t("nav.model"),
      desktopLabel: t("nav.model"),
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

        <Badge className="rounded-full bg-primary-rose-soft px-3 py-2 text-xs text-primary-rose hover:bg-primary-rose-soft sm:px-4 sm:text-sm">
          <span>{t("nav.educational")}</span>
        </Badge>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        <nav className="grid grid-cols-3 gap-2 text-xs font-medium text-muted-foreground md:flex md:items-center md:gap-6 md:text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 transition hover:border-primary-rose-soft hover:bg-primary-rose-soft/50 hover:text-primary-rose md:h-auto md:justify-start md:border-0 md:bg-transparent md:px-0 md:hover:bg-transparent md:hover:text-foreground"
              >
                <Icon className="size-4" />
                <span className="md:hidden">{item.label}</span>
                <span className="hidden md:inline">{item.desktopLabel}</span>
              </Link>
            );
          })}
        </nav>

        <V2LanguageSwitcher />
      </div>
    </header>
  );
}
