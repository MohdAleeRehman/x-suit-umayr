"use client";

import { useMemo, useState } from "react";
import { PROPERTY_DEFAULTS, PropertyFormData } from "@/types/property";

const toNumber = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export function usePropertyForm() {
  const [form, setForm] = useState<PropertyFormData>(PROPERTY_DEFAULTS);

  const updateField = <K extends keyof PropertyFormData>(key: K, raw: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: key === "pBuilding" || key === "pUnit" || key === "pType" ? raw : toNumber(raw),
    } as PropertyFormData));
  };

  const quickMetrics = useMemo(() => {
    const priceSqft = form.pSaleArea > 0 ? form.pPrice / form.pSaleArea : 0;
    const roi = form.pPrice > 0 ? (form.pExpectRent / form.pPrice) * 100 : 0;

    return { priceSqft, roi };
  }, [form]);

  const reset = () => setForm(PROPERTY_DEFAULTS);

  return { form, updateField, quickMetrics, reset };
}
