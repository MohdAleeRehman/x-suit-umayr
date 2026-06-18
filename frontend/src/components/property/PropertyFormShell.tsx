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
    <section className="card shadow-sm">
      <div className="card-header">
        <h3 className="card-title mb-1">Property Details Module</h3>
        <p className="text-muted mb-0" style={{ lineHeight: 1.4 }}>
          Profile-style property factsheet with full configuration and ROI context.
        </p>
      </div>

      <form onSubmit={saveRecord} className="card-body">
        <FormSection title="Identity, Layout Type and Location">
          <div className="row">
            <div className="col-md-6">
              <InputField label="Building" value={form.pBuilding} onChange={(v) => updateField("pBuilding", v)} />
            </div>
            <div className="col-md-6">
              <InputField label="Unit" value={form.pUnit} onChange={(v) => updateField("pUnit", v)} />
            </div>
            <div className="col-md-6">
              <InputField label="Level" value={form.pLevel} onChange={(v) => updateField("pLevel", v)} />
            </div>
            <div className="col-md-6">
              <InputField label="View" value={form.pView} onChange={(v) => updateField("pView", v)} />
            </div>
            <div className="col-md-6">
              <SelectField
                label="Property Layout Archetype"
                value={form.propArchetype}
                onChange={(v) => updateField("propArchetype", v)}
                options={[
                  { label: "Apartment", value: "Apartment" },
                  { label: "Villa / Townhouse / Land", value: "Villa" },
                ]}
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Configuration Dimensions">
          <div className="row">
            <div className="col-md-4">
              <InputField label="Type Designation" value={form.pType} onChange={(v) => updateField("pType", v)} />
            </div>
            <div className="col-md-4">
              <InputField label="Bedrooms" type="number" value={form.pBeds} onChange={(v) => updateField("pBeds", v)} min={0} />
            </div>
            <div className="col-md-4">
              <InputField label="Bathrooms" type="number" value={form.pBaths} onChange={(v) => updateField("pBaths", v)} min={0} />
            </div>
            <div className="col-md-4">
              <InputField label="Living Rooms" type="number" value={form.pLiving} onChange={(v) => updateField("pLiving", v)} min={0} />
            </div>
            <div className="col-md-4">
              <InputField label="Balcony" value={form.pBalcony} onChange={(v) => updateField("pBalcony", v)} />
            </div>
            <div className="col-md-4">
              <InputField label="Parking" value={form.pParking} onChange={(v) => updateField("pParking", v)} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Area Sizing and Financial Metrics">
          <div className="row">
            {form.propArchetype === "Villa" ? (
              <div className="col-md-4">
                <InputField label="Plot Area (sqft)" type="number" value={form.pPlotArea} onChange={(v) => updateField("pPlotArea", v)} min={0} />
              </div>
            ) : null}
            <div className="col-md-4">
              <InputField label="Sale Area (sqft)" type="number" value={form.pSaleArea} onChange={(v) => updateField("pSaleArea", v)} min={0} />
            </div>
            <div className="col-md-4">
              <InputField label="Market Price (AED)" type="number" value={form.pPrice} onChange={(v) => updateField("pPrice", v)} min={0} />
            </div>
            <div className="col-md-4">
              <InputField label="Price per sqft" type="number" value={form.pPriceSqft.toFixed(2)} onChange={() => {}} disabled />
            </div>
            <div className="col-md-4">
              <InputField label="Expected Annual Rent (AED)" type="number" value={form.pExpectRent} onChange={(v) => updateField("pExpectRent", v)} min={0} />
            </div>
            <div className="col-md-4">
              <InputField label="Projected Return (%)" type="number" value={form.pReturn.toFixed(2)} onChange={() => {}} disabled />
            </div>
          </div>
        </FormSection>

        <FormSection title="Status Parameters">
          <div className="row">
            <div className="col-md-4">
              <InputField label="Occupancy Status" value={form.pStatus} onChange={(v) => updateField("pStatus", v)} />
            </div>
            <div className="col-md-4">
              <InputField label="Paid to Owner" value={form.pPaidOwner} onChange={(v) => updateField("pPaidOwner", v)} />
            </div>
            <div className="col-md-4">
              <InputField label="Outstanding Amount" value={form.pLeft} onChange={(v) => updateField("pLeft", v)} />
            </div>
            <div className="col-md-4">
              <SelectField
                label="Handover"
                value={form.propHandoverVal}
                onChange={(v) => updateField("propHandoverVal", v)}
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
              />
            </div>
          </div>
        </FormSection>

        <div className="alert alert-info mt-2">
          <h5>Quick Preview</h5>
          <p className="mb-1">Price/Sqft: AED {quickMetrics.priceSqft.toFixed(2)}</p>
          <p className="mb-0">Expected ROI: {quickMetrics.roi.toFixed(2)}%</p>
        </div>

        {saveState === "saved" ? <p className="alert alert-success">Property record saved successfully.</p> : null}
        {saveState === "error" ? <p className="alert alert-danger">Failed to save property record.</p> : null}

        <div className="d-flex flex-wrap gap-2">
          <Button type="submit" disabled={saveState === "saving"}>{saveState === "saving" ? "Saving..." : "Generate and Save"}</Button>
          <Button type="button" variant="secondary" onClick={reset}>Reset</Button>
        </div>
      </form>
    </section>
  );
}
