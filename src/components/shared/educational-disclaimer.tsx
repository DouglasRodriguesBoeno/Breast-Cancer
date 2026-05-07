import { ShieldCheck } from "lucide-react";

export function EducationalDisclaimer() {
  return (
    <div className="rounded-3xl border border-primary-rose-soft bg-white/75 p-6 shadow-sm">
      <div className="flex gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
          <ShieldCheck className="size-5" />
        </div>

        <div>
          <h3 className="font-semibold text-foreground">
            Educational only — not a medical diagnosis.
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            BreastCare AI provides model predictions for educational purposes
            only. Always consult qualified healthcare professionals for medical
            evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}
