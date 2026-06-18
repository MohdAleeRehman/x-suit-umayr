"use client";

import { FormEvent, useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { FormSection } from "@/components/ui/FormSection";
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
      <p className="mt-1 text-sm text-(--ink-soft)">Profile-style property factsheet with full configuration and ROI context.</p>

      <form className="mt-6 space-y-4" onSubmit={saveRecord}>
        <FormSection title="Identity, Layout Type and Location">
          <div className="grid gap-4 md:grid-cols-2">
            <InputField label="Building" value={form.pBuilding} onChange={(v) => updateField("pBuilding", v)} />
            <InputField label="Unit" value={form.pUnit} onChange={(v) => updateField("pUnit", v)} />
            <InputField label="Level" value={form.pLevel} onChange={(v) => updateField("pLevel", v)} />
            <InputField label="View" value={form.pView} onChange={(v) => updateField("pView", v)} />
          </div>
        </FormSection>

        <FormSection title="Configuration Dimensions">
          <div className="grid gap-4 md:grid-cols-3">
            <SelectField
              label="Property Type"
              value={form.pType}
              onChange={(v) => updateField("pType", v)}
              options={[
                { label: "Apartment", value: "Apartment" },
                { label: "Villa", value: "Villa" },
                { label: "Townhouse", value: "Townhouse" },
                { label: "C2", value: "C2" },
              ]}
            />
            <InputField label="Bedrooms" type="number" value={form.pBeds} onChange={(v) => updateField("pBeds", v)} min={0} />
            <InputField label="Bathrooms" type="number" value={form.pBaths} onChange={(v) => updateField("pBaths", v)} min={0} />
            <InputField label="Living Rooms" type="number" value={form.pLiving} onChange={(v) => updateField("pLiving", v)} min={0} />
            <InputField label="Balcony" value={form.pBalcony} onChange={(v) => updateField("pBalcony", v)} />
            <InputField label="Parking" value={form.pParking} onChange={(v) => updateField("pParking", v)} />
          </div>
        </FormSection>

        <FormSection title="Area Sizing and Financial Metrics">
          <div className="grid gap-4 md:grid-cols-3">
            <InputField label="Plot Area (sqft)" type="number" value={form.pPlotArea} onChange={(v) => updateField("pPlotArea", v)} min={0} />
            <InputField label="Sale Area (sqft)" type="number" value={form.pSaleArea} onChange={(v) => updateField("pSaleArea", v)} min={0} />
            <InputField label="Market Price (AED)" type="number" value={form.pPrice} onChange={(v) => updateField("pPrice", v)} min={0} />
            <InputField label="Price per sqft" type="number" value={form.pPriceSqft.toFixed(2)} onChange={() => {}} disabled />
            <InputField label="Expected Annual Rent (AED)" type="number" value={form.pExpectRent} onChange={(v) => updateField("pExpectRent", v)} min={0} />
            <InputField label="Projected Return (%)" type="number" value={form.pReturn.toFixed(2)} onChange={() => {}} disabled />
          </div>
        </FormSection>

        <FormSection title="Status Parameters">
          <div className="grid gap-4 md:grid-cols-3">
            <InputField label="Occupancy Status" value={form.pStatus} onChange={(v) => updateField("pStatus", v)} />
            <InputField label="Paid to Owner" value={form.pPaidOwner} onChange={(v) => updateField("pPaidOwner", v)} />
            <InputField label="Outstanding Amount" value={form.pLeft} onChange={(v) => updateField("pLeft", v)} />
          </div>
        </FormSection>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p className="font-semibold text-foreground">Quick Preview</p>
          <p className="mt-1 text-(--ink-soft)">Price/Sqft: AED {quickMetrics.priceSqft.toFixed(2)}</p>
          <p className="text-(--ink-soft)">Expected ROI: {quickMetrics.roi.toFixed(2)}%</p>
        </div>

        {saveState === "saved" ? <p className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">Property record saved successfully.</p> : null}
        {saveState === "error" ? <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-700">Failed to save property record.</p> : null}

        <div className="flex gap-2">
          <Button type="submit" disabled={saveState === "saving"}>{saveState === "saving" ? "Saving..." : "Generate and Save"}</Button>
          <Button type="button" variant="secondary" onClick={reset}>Reset</Button>
        </div>
      </form>
    </section>
  );
}
