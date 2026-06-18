"use client";

import { FormEvent, useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { FormSection } from "@/components/ui/FormSection";
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
    <section className="card shadow-sm">
      <div className="card-header">
        <h3 className="card-title mb-1">Rent Calculator</h3>
        <p className="text-muted mb-0" style={{ lineHeight: 1.4 }}>
          Sharjah rental cash outflow and compliance summary flow.
        </p>
      </div>

      <form onSubmit={saveRecord} className="card-body">
        <FormSection title="Rental Value Parameters">
          <div className="row">
            <div className="col-md-4">
              <InputField label="Annual Contract Rent (AED)" type="number" value={form.rentAnnual} onChange={(v) => updateField("rentAnnual", v)} min={0} />
            </div>
            <div className="col-md-4">
              <InputField label="Number of Cheques" type="number" value={form.rentCheques} onChange={(v) => updateField("rentCheques", v)} min={1} />
            </div>
            <div className="col-md-4">
              <InputField label="Contract Start Date" type="date" value={form.rentStartDate} onChange={(v) => updateField("rentStartDate", v)} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Deposits and Regulations">
          <div className="row">
            <div className="col-md-6">
              <InputField label="SEWA / Municipal Fee (%)" type="number" value={form.rentSewa} onChange={(v) => updateField("rentSewa", v)} min={0} step={0.1} />
            </div>
            <div className="col-md-6">
              <InputField label="Municipality Attestation (4% of rent)" type="number" value={quickMetrics.attestationFee.toFixed(2)} onChange={() => {}} disabled />
            </div>
            <div className="col-md-6">
              <InputField label="Security Deposit (5% of rent)" type="number" value={quickMetrics.securityDeposit.toFixed(2)} onChange={() => {}} disabled />
            </div>
            <div className="col-md-6">
              <SelectField
                label="Unit Furnishing"
                value={form.rentFurnished}
                onChange={(v) => updateField("rentFurnished", v)}
                options={[
                  { label: "Unfurnished", value: "unfurnished" },
                  { label: "Furnished", value: "furnished" },
                ]}
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Brokerage Commissions">
          <div className="row">
            <div className="col-md-6">
              <SelectField
                label="Agency Commission Base"
                value={form.rcType}
                onChange={(v) => updateField("rcType", v)}
                options={[
                  { label: "Percent", value: "pct" },
                  { label: "Fixed Amount", value: "fixed" },
                ]}
              />
            </div>
            <div className="col-md-6">
              <InputField label="Agency Commission Value" type="number" value={form.rcVal} onChange={(v) => updateField("rcVal", v)} min={0} step={0.1} />
            </div>
          </div>
        </FormSection>

        <div className="alert alert-info mt-2">
          <h5>Quick Preview</h5>
          <p className="mb-1">Sewa Fee: AED {quickMetrics.sewaFee.toFixed(2)}</p>
          <p className="mb-1">Commission: AED {quickMetrics.commission.toFixed(2)}</p>
          <p className="mb-0">1st Cheque: AED {quickMetrics.firstCheque.toFixed(2)}</p>
        </div>

        {saveState === "saved" ? <p className="alert alert-success">Rent record saved successfully.</p> : null}
        {saveState === "error" ? <p className="alert alert-danger">Failed to save rent record.</p> : null}

        <div className="d-flex flex-wrap gap-2">
          <Button type="submit" disabled={saveState === "saving"}>{saveState === "saving" ? "Saving..." : "Calculate and Save"}</Button>
          <Button type="button" variant="secondary" onClick={reset}>Reset</Button>
        </div>
      </form>
    </section>
  );
}
