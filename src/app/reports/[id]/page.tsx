import { PageShell } from "@/components/layout/page-shell";
import { ReportResultView } from "@/components/v2/report-result-view";

export default async function ReportResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
        <ReportResultView id={id} />
      </section>
    </PageShell>
  );
}
