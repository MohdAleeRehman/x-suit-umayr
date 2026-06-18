"use client";

import { FormEvent, useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { useRentForm } from "@/hooks/useRentForm";
import { api } from "@/lib/api";

export function RentFormShell() {
  const { form, updateField, quickMetrics, reset } = useRentForm();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const saveRecord = async (event: FormEvent) => {
    event.preventDefault();
    setSaveState("saving");

    try {
      await api.createRecord({ type: "rent", dataset: form });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  return (
    <section className="mx-auto mt-6 w-full max-w-5xl rounded-2xl border border-white/60 bg-(--panel) p-6 shadow-[0_18px_50px_rgba(28,36,48,0.12)]">
      <h2 className="text-xl font-bold text-foreground">Rent Calculator</h2>
      <p className="mt-1 text-sm text-(--ink-soft)">API-integrated Rent module save flow.</p>

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={saveRecord}>
        <InputField label="Start Date" type="date" value={form.rentStartDate} onChange={(v) => updateField("rentStartDate", v)} />
        <InputField label="Annual Rent" type="number" value={form.rentAnnual} onChange={(v) => updateField("rentAnnual", v)} min={0} />
        <InputField label="Cheques" type="number" value={form.rentCheques} onChange={(v) => updateField("rentCheques", v)} min={1} />
        <SelectField
          label="Furnished"
          value={form.rentFurnished}
          onChange={(v) => updateField("rentFurnished", v)}
          options={[
            { label: "Unfurnished", value: "unfurnished" },
            { label: "Furnished", value: "furnished" },
          ]}
        />
        <InputField label="Sewa %" type="number" value={form.rentSewa} onChange={(v) => updateField("rentSewa", v)} min={0} step={0.1} />
        <SelectField
          label="Commission Type"
          value={form.rcType}
          onChange={(v) => updateField("rcType", v)}
          options={[
            { label: "Percent", value: "pct" },
            { label: "Fixed Amount", value: "fixed" },
          ]}
        />
        <InputField label="Commission Value" type="number" value={form.rcVal} onChange={(v) => updateField("rcVal", v)} min={0} step={0.1} />

        <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p className="font-semibold text-foreground">Quick Preview</p>
          <p className="mt-1 text-(--ink-soft)">Sewa Fee: AED {quickMetrics.sewaFee.toFixed(2)}</p>
          <p className="text-(--ink-soft)">Commission: AED {quickMetrics.commission.toFixed(2)}</p>
          <p className="text-(--ink-soft)">1st Cheque: AED {quickMetrics.firstCheque.toFixed(2)}</p>
        </div>

        {saveState === "saved" ? <p className="md:col-span-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">Rent record saved successfully.</p> : null}
        {saveState === "error" ? <p className="md:col-span-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-700">Failed to save rent record.</p> : null}

        <div className="md:col-span-2 flex gap-2">
          <Button type="submit" disabled={saveState === "saving"}>{saveState === "saving" ? "Saving..." : "Save Rent Record"}</Button>
          <Button type="button" variant="secondary" onClick={reset}>Reset</Button>
        </div>
      </form>
    </section>
  );
}
