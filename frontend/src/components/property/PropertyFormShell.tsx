"use client";

import { FormEvent, useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { api } from "@/lib/api";

export function PropertyFormShell() {
  const { form, updateField, quickMetrics, reset } = usePropertyForm();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const saveRecord = async (event: FormEvent) => {
    event.preventDefault();
    setSaveState("saving");

    try {
      await api.createRecord({ type: "property", dataset: form });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  return (
    <section className="mx-auto mt-6 w-full max-w-5xl rounded-2xl border border-white/60 bg-(--panel) p-6 shadow-[0_18px_50px_rgba(28,36,48,0.12)]">
      <h2 className="text-xl font-bold text-foreground">Property Details Module</h2>
      <p className="mt-1 text-sm text-(--ink-soft)">API-integrated Property module save flow.</p>

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={saveRecord}>
        <InputField label="Building" value={form.pBuilding} onChange={(v) => updateField("pBuilding", v)} />
        <InputField label="Unit" value={form.pUnit} onChange={(v) => updateField("pUnit", v)} />
        <SelectField
          label="Property Type"
          value={form.pType}
          onChange={(v) => updateField("pType", v)}
          options={[
            { label: "Apartment", value: "Apartment" },
            { label: "Villa", value: "Villa" },
          ]}
        />
        <InputField label="Beds" type="number" value={form.pBeds} onChange={(v) => updateField("pBeds", v)} min={0} />
        <InputField label="Baths" type="number" value={form.pBaths} onChange={(v) => updateField("pBaths", v)} min={0} />
        <InputField label="Sale Area (sqft)" type="number" value={form.pSaleArea} onChange={(v) => updateField("pSaleArea", v)} min={0} />
        <InputField label="Sale Price" type="number" value={form.pPrice} onChange={(v) => updateField("pPrice", v)} min={0} />
        <InputField label="Expected Rent" type="number" value={form.pExpectRent} onChange={(v) => updateField("pExpectRent", v)} min={0} />

        <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p className="font-semibold text-foreground">Quick Preview</p>
          <p className="mt-1 text-(--ink-soft)">Price/Sqft: AED {quickMetrics.priceSqft.toFixed(2)}</p>
          <p className="text-(--ink-soft)">Expected ROI: {quickMetrics.roi.toFixed(2)}%</p>
        </div>

        {saveState === "saved" ? <p className="md:col-span-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">Property record saved successfully.</p> : null}
        {saveState === "error" ? <p className="md:col-span-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-700">Failed to save property record.</p> : null}

        <div className="md:col-span-2 flex gap-2">
          <Button type="submit" disabled={saveState === "saving"}>{saveState === "saving" ? "Saving..." : "Save Property Record"}</Button>
          <Button type="button" variant="secondary" onClick={reset}>Reset</Button>
        </div>
      </form>
    </section>
  );
}
