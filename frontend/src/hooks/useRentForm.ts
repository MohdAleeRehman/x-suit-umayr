"use client";

import { useMemo, useState } from "react";
import { RENT_DEFAULTS, RentFormData } from "@/types/rent";

const toNumber = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export function useRentForm() {
  const [form, setForm] = useState<RentFormData>(RENT_DEFAULTS);

  const updateField = <K extends keyof RentFormData>(key: K, raw: string) => {
    setForm((prev) => ({
      ...prev,
      [key]:
        key === "rentFurnished" || key === "rcType" || key === "rentStartDate"
          ? raw
          : toNumber(raw),
    } as RentFormData));
  };

  const quickMetrics = useMemo(() => {
    const sewaFee = form.rentAnnual * (form.rentSewa / 100);
    const commission =
      form.rcType === "pct" ? form.rentAnnual * (form.rcVal / 100) : form.rcVal;
    const firstCheque = form.rentCheques > 0 ? form.rentAnnual / form.rentCheques : 0;

    return {
      sewaFee,
      commission,
      firstCheque,
    };
  }, [form]);

  const reset = () => setForm(RENT_DEFAULTS);

  return { form, updateField, quickMetrics, reset };
}
