"use client";

import { useMemo, useState } from "react";
import { SALE_DEFAULTS, SaleFormData } from "@/types/sale";

const toNumber = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export function useSaleForm() {
  const [form, setForm] = useState<SaleFormData>(SALE_DEFAULTS);

  const updateField = <K extends keyof SaleFormData>(key: K, raw: string) => {
    setForm((prev) => {
      const next = {
        ...prev,
        [key]:
          key === "propStatus" || key === "paidType" || key === "bcType" || key === "scType"
            ? raw
            : toNumber(raw),
      } as SaleFormData;

      if (key === "paidVal" || key === "paidType" || key === "origPrice") {
        next.devBal =
          next.paidType === "pct"
            ? next.origPrice - next.origPrice * (next.paidVal / 100)
            : Math.max(0, next.origPrice - next.paidVal);
      }

      return next;
    });
  };

  const quickMetrics = useMemo(() => {
    const grossGain = form.sellPrice - form.origPrice;
    const roi = form.origPrice > 0 ? (grossGain / form.origPrice) * 100 : 0;
    return {
      grossGain,
      roi,
    };
  }, [form.origPrice, form.sellPrice]);

  const reset = () => setForm(SALE_DEFAULTS);

  return { form, updateField, reset, quickMetrics };
}
