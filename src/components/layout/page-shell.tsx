import { AppHeader } from "@/components/layout/app-header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_80%_15%,#ffe4e6_0,transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-5 py-6 text-foreground">
      <AppHeader />
      {children}
    </main>
  );
}
