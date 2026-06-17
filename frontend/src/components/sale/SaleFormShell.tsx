"use client";

import { FormEvent, useState } from "react";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
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
        dataset: {
          ...form,
          hasUtil: false,
          payerMap: {
            Water: "buyer",
            Gas: "buyer",
            Elec: "buyer",
            Fire: "buyer",
          },
        },
      });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  return (
    <section className="mx-auto mt-6 w-full max-w-5xl rounded-2xl border border-white/60 bg-(--panel) p-6 shadow-[0_18px_50px_rgba(28,36,48,0.12)]">
      <h2 className="text-xl font-bold text-foreground">Sale Calculator (Week 5 Shell)</h2>
      <p className="mt-1 text-sm text-(--ink-soft)">
        Componentized form foundation is ready. Full parity formulas will be finalized in Week 6.
      </p>

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={saveRecord}>
        <InputField
          label="Original Buying Price"
          type="number"
          value={form.origPrice}
          onChange={(v) => updateField("origPrice", v)}
          min={0}
        />
        <InputField
          label="Selling Price"
          type="number"
          value={form.sellPrice}
          onChange={(v) => updateField("sellPrice", v)}
          min={0}
        />
        <InputField
          label="Paid Type (1=pct, 2=fixed)"
          type="number"
          value={form.paidType === "pct" ? 1 : 2}
          onChange={(v) => updateField("paidType", Number(v) === 2 ? "fixed" : "pct")}
          min={1}
          step={1}
        />
        <InputField
          label="Paid Value"
          type="number"
          value={form.paidVal}
          onChange={(v) => updateField("paidVal", v)}
          min={0}
        />
        <InputField
          label="Developer Balance"
          type="number"
          value={Math.round(form.devBal)}
          onChange={() => {}}
          disabled
        />
        <InputField
          label="DLD %"
          type="number"
          value={form.dldPct}
          onChange={(v) => updateField("dldPct", v)}
          min={0}
          step={0.1}
        />

        <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p className="font-semibold text-foreground">Quick Preview</p>
          <p className="mt-1 text-(--ink-soft)">Gross Gain: AED {quickMetrics.grossGain.toLocaleString("en-US")}</p>
          <p className="text-(--ink-soft)">ROI: {quickMetrics.roi.toFixed(2)}%</p>
        </div>

        {saveState === "error" ? (
          <p className="md:col-span-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-700">
            Failed to save record. Please re-login and try again.
          </p>
        ) : null}

        {saveState === "saved" ? (
          <p className="md:col-span-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            Sale record saved successfully.
          </p>
        ) : null}

        <div className="md:col-span-2 flex flex-wrap gap-2">
          <Button type="submit" disabled={saveState === "saving"}>
            {saveState === "saving" ? "Saving..." : "Save Sale Record"}
          </Button>
          <Button type="button" variant="secondary" onClick={reset}>
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
}
