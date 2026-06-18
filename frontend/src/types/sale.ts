export type SalePaidType = "pct" | "amt";

export type UtilityPayerMap = {
  Water: "buyer" | "seller";
  Gas: "buyer" | "seller";
  Elec: "buyer" | "seller";
  Fire: "buyer" | "seller";
};

export type SaleFormData = {
  origPrice: number;
  sellPrice: number;
  propStatus: "offplan" | "Ready";
  hasUtil: "yes" | "no";
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
  uWater: number;
  uGas: number;
  uElec: number;
  uFire: number;
  payerMap: UtilityPayerMap;
};

export const SALE_DEFAULTS: SaleFormData = {
  origPrice: 913000,
  sellPrice: 1100000,
  propStatus: "offplan",
  hasUtil: "yes",
  paidType: "pct",
  paidVal: 25,
  devBal: 684750,
  dldPct: 2,
  sldBasePct: 2,
  sldSellPct: 1,
  nocFee: 5250,
  spaFee: 1250,
  titleDeed: 520,
  bcType: "pct",
  bcVal: 2,
  scType: "pct",
  scVal: 2,
  uWater: 0,
  uGas: 0,
  uElec: 0,
  uFire: 0,
  payerMap: {
    Water: "buyer",
    Gas: "buyer",
    Elec: "buyer",
    Fire: "buyer",
  },
};
