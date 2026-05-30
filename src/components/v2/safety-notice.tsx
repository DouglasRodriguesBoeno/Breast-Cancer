import { ShieldCheck } from "lucide-react";

export function SafetyNotice() {
  return (
    <aside className="rounded-2xl border border-primary-rose-soft bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
          <ShieldCheck className="size-5" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">
            Educational only - not a medical diagnosis.
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            BreastCare AI does not provide medical diagnosis and does not
            replace professional medical evaluation.
          </p>
        </div>
      </div>
    </aside>
  );
}
