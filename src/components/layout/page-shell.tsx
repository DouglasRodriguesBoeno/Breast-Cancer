import { AppHeader } from "@/components/layout/app-header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-background px-5 py-6 text-foreground">
      <AppHeader />
      {children}
    </main>
  );
}
