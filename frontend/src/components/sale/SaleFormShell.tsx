"use client";

import { FormEvent, useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { FormSection } from "@/components/ui/FormSection";
import { useSaleForm } from "@/hooks/useSaleForm";
import { api } from "@/lib/api";

export function SaleFormShell() {
  const { form, updateField, reset, quickMetrics } = useSaleForm();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const saveRecord = async (event: FormEvent) => {
    event.preventDefault();
    setSaveState("saving");

    try {
      await api.createRecord({
        type: "sale",
        dataset: { ...form },
      });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  return (
    <section className="card shadow-sm">
      <div className="card-header">
        <h3 className="card-title mb-1">Sale Calculator</h3>
        <p className="text-muted mb-0" style={{ lineHeight: 1.4 }}>
          Sharjah secondary market flow with full pricing, fees, commissions, and deposit inputs.
        </p>
      </div>

      <form onSubmit={saveRecord} className="card-body">
        <FormSection title="Property Prices" subtitle="Contract values and current asset status">
          <div className="row">
            <div className="col-md-6">
              <InputField
                label="Original Buying Price (AED)"
                type="number"
                value={form.origPrice}
                onChange={(v) => updateField("origPrice", v)}
                min={0}
              />
            </div>
            <div className="col-md-6">
              <InputField
                label="New Resale Price (AED)"
                type="number"
                value={form.sellPrice}
                onChange={(v) => updateField("sellPrice", v)}
                min={0}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                label="Property Status"
                value={form.propStatus}
                onChange={(v) => updateField("propStatus", v)}
                options={[
                  { label: "Off-plan", value: "offplan" },
                  { label: "Ready", value: "Ready" },
                ]}
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Payments Paid So Far" subtitle="Developer settlement and paid contribution">
          <div className="row">
            <div className="col-md-6">
              <SelectField
                label="Amount Paid Type"
                value={form.paidType}
                onChange={(v) => updateField("paidType", v)}
                options={[
                  { label: "Percent", value: "pct" },
                  { label: "Fixed Amount", value: "fixed" },
                ]}
              />
            </div>
            <div className="col-md-6">
              <InputField
                label="Amount Paid Value"
                type="number"
                value={form.paidVal}
                onChange={(v) => updateField("paidVal", v)}
                min={0}
              />
            </div>
            <div className="col-md-6">
              <InputField
                label="Remaining Developer Balance (AED)"
                type="number"
                value={Math.round(form.devBal)}
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Land Department Fees (SRERD)" subtitle="Government fee split and resale transfer">
          <div className="row">
            <div className="col-md-4">
              <InputField label="Buyer Share (%)" type="number" value={form.dldPct} onChange={(v) => updateField("dldPct", v)} min={0} step={0.1} />
            </div>
            <div className="col-md-4">
              <InputField label="Seller Share (%)" type="number" value={form.sldBasePct} onChange={(v) => updateField("sldBasePct", v)} min={0} step={0.1} />
            </div>
            <div className="col-md-4">
              <InputField label="Resale Transfer Fee (%)" type="number" value={form.sldSellPct} onChange={(v) => updateField("sldSellPct", v)} min={0} step={0.1} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Developer and Paperwork Fees">
          <div className="row">
            <div className="col-md-4">
              <InputField label="Developer NOC Fee (AED)" type="number" value={form.nocFee} onChange={(v) => updateField("nocFee", v)} min={0} />
            </div>
            <div className="col-md-4">
              <InputField label="Sale Purchase Agreement (AED)" type="number" value={form.spaFee} onChange={(v) => updateField("spaFee", v)} min={0} />
            </div>
            <div className="col-md-4">
              <InputField label="Title Deed / Reg Fee (AED)" type="number" value={form.titleDeed} onChange={(v) => updateField("titleDeed", v)} min={0} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Agent Commission (+5% VAT)">
          <div className="row">
            <div className="col-md-6">
              <SelectField
                label="Buyer Agent Commission Type"
                value={form.bcType}
                onChange={(v) => updateField("bcType", v)}
                options={[
                  { label: "Percent", value: "pct" },
                  { label: "Fixed Amount", value: "fixed" },
                ]}
              />
            </div>
            <div className="col-md-6">
              <InputField label="Buyer Agent Commission Value" type="number" value={form.bcVal} onChange={(v) => updateField("bcVal", v)} min={0} />
            </div>
            <div className="col-md-6">
              <SelectField
                label="Seller Agent Commission Type"
                value={form.scType}
                onChange={(v) => updateField("scType", v)}
                options={[
                  { label: "Percent", value: "pct" },
                  { label: "Fixed Amount", value: "fixed" },
                ]}
              />
            </div>
            <div className="col-md-6">
              <InputField label="Seller Agent Commission Value" type="number" value={form.scVal} onChange={(v) => updateField("scVal", v)} min={0} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Utility and Handover Deposits">
          <div className="row">
            <div className="col-md-6">
              <SelectField
                label="Include Utility Fees"
                value={form.hasUtil}
                onChange={(v) => updateField("hasUtil", v)}
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
              />
            </div>
            <div className="col-md-6">
              <InputField label="Water Meter (AED)" type="number" value={form.uWater} onChange={(v) => updateField("uWater", v)} min={0} disabled={form.hasUtil === "no"} />
            </div>
            <div className="col-md-6">
              <InputField label="Gas Meter (AED)" type="number" value={form.uGas} onChange={(v) => updateField("uGas", v)} min={0} disabled={form.hasUtil === "no"} />
            </div>
            <div className="col-md-6">
              <InputField label="Electric Meter (AED)" type="number" value={form.uElec} onChange={(v) => updateField("uElec", v)} min={0} disabled={form.hasUtil === "no"} />
            </div>
            <div className="col-md-6">
              <InputField label="Fire Alarm (AED)" type="number" value={form.uFire} onChange={(v) => updateField("uFire", v)} min={0} disabled={form.hasUtil === "no"} />
            </div>
          </div>
        </FormSection>

        <div className="alert alert-info mt-2">
          <h5>Quick Preview</h5>
          <p className="mb-1">Gross Gain: AED {quickMetrics.grossGain.toLocaleString("en-US")}</p>
          <p className="mb-0">ROI: {quickMetrics.roi.toFixed(2)}%</p>
        </div>

        {saveState === "error" ? (
          <p className="alert alert-danger">
            Failed to save record. Please re-login and try again.
          </p>
        ) : null}

        {saveState === "saved" ? (
          <p className="alert alert-success">
            Sale record saved successfully.
          </p>
        ) : null}

        <div className="d-flex flex-wrap gap-2">
          <Button type="submit" disabled={saveState === "saving"}>
            {saveState === "saving" ? "Saving..." : "Calculate and Save"}
          </Button>
          <Button type="button" variant="secondary" onClick={reset}>
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
}
