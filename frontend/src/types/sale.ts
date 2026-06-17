export type SalePaidType = "pct" | "fixed";

export type SaleFormData = {
  origPrice: number;
  sellPrice: number;
  propStatus: "offplan" | "Ready";
  paidType: SalePaidType;
  paidVal: number;
  devBal: number;
  dldPct: number;
  sldBasePct: number;
  sldSellPct: number;
  nocFee: number;
  spaFee: number;
  titleDeed: number;
  bcType: SalePaidType;
  bcVal: number;
  scType: SalePaidType;
  scVal: number;
};

export const SALE_DEFAULTS: SaleFormData = {
  origPrice: 913000,
  sellPrice: 1100000,
  propStatus: "offplan",
  paidType: "pct",
  paidVal: 25,
  devBal: 684750,
  dldPct: 4.5,
  sldBasePct: 2,
  sldSellPct: 2,
  nocFee: 100,
  spaFee: 4000,
  titleDeed: 500,
  bcType: "pct",
  bcVal: 2,
  scType: "pct",
  scVal: 2,
};
