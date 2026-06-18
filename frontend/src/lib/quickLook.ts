import { SavedRecord } from "@/types/records";

const toNum = (value: unknown): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const money = (value: number): string => `AED ${Math.round(value).toLocaleString("en-AE")}`;
const pct = (value: number): string => `${value.toFixed(1)}%`;

type Metric = { label: string; value: string };

export function buildQuickLook(record: SavedRecord): {
  primary: Metric[];
  breakdown: Metric[];
} {
  const d = record.dataset || {};

  if (record.type === "sale") {
    const orig = toNum(d.origPrice);
    const sell = toNum(d.sellPrice);
    const propStatus = String(d.propStatus || "offplan");
    const paidType = String(d.paidType || "pct");
    const paidVal = toNum(d.paidVal);
    const devBal = propStatus === "offplan"
      ? paidType === "pct"
        ? Math.max(0, orig - orig * (paidVal / 100))
        : Math.max(0, orig - paidVal)
      : 0;
    const equityToSeller = sell - devBal;
    const dldFee = sell * (toNum(d.dldPct) / 100);
    const sldBase = sell * (toNum(d.sldBasePct) / 100);
    const sldSell = sell * (toNum(d.sldSellPct) / 100);
    const noc = toNum(d.nocFee);
    const spa = toNum(d.spaFee);
    const title = toNum(d.titleDeed);
    const bcType = String(d.bcType || "pct");
    const bcVal = toNum(d.bcVal);
    const scType = String(d.scType || "pct");
    const scVal = toNum(d.scVal);
    const bComm = (bcType === "pct" ? sell * (bcVal / 100) : bcVal) * 1.05;
    const sComm = (scType === "pct" ? sell * (scVal / 100) : scVal) * 1.05;
    const hasUtil = String(d.hasUtil || "yes") === "yes";
    const payerMap = (d.payerMap || {}) as Record<string, string>;
    const util = {
      Water: toNum(d.uWater),
      Gas: toNum(d.uGas),
      Elec: toNum(d.uElec),
      Fire: toNum(d.uFire),
    };
    let buyerUtil = 0;
    let sellerUtil = 0;
    if (hasUtil) {
      Object.entries(util).forEach(([k, v]) => {
        if ((payerMap[k] || "buyer") === "seller") sellerUtil += v;
        else buyerUtil += v;
      });
    }

    const buyerTotal = equityToSeller + devBal + dldFee + title + spa + bComm + buyerUtil;
    const sellerCosts = sldBase + sldSell + noc + sComm + sellerUtil;
    const sellerNet = equityToSeller - sellerCosts;
    const grossGain = sell - orig;

    return {
      primary: [
        { label: "Buyer Total", value: money(buyerTotal) },
        { label: "Seller Net", value: money(sellerNet) },
        { label: "Gross Gain", value: money(grossGain) },
      ],
      breakdown: [
        { label: "Selling Price", value: money(sell) },
        { label: "Developer Balance", value: money(devBal) },
        { label: "SLD (Base + Resale)", value: money(sldBase + sldSell) },
        { label: "Buyer Commission (+VAT)", value: money(bComm) },
        { label: "Seller Commission (+VAT)", value: money(sComm) },
        { label: "Utility Split (B/S)", value: `${money(buyerUtil)} / ${money(sellerUtil)}` },
      ],
    };
  }

  if (record.type === "rent") {
    const annual = toNum(d.rentAnnual);
    const cheques = Math.max(1, toNum(d.rentCheques));
    const sewa = toNum(d.rentSewa);
    const furnished = String(d.rentFurnished || "unfurnished");
    const rcType = String(d.rcType || "pct");
    const rcVal = toNum(d.rcVal);
    const attestation = annual * 0.04;
    const securityPct = furnished === "furnished" ? 0.1 : 0.05;
    const security = annual * securityPct;
    const baseComm = rcType === "pct" ? annual * (rcVal / 100) : rcVal;
    const commVat = baseComm * 1.05;
    const firstCheque = annual / cheques;
    const immediate = firstCheque + attestation + sewa + security + commVat;
    const annualTotal = annual + attestation + sewa + security + commVat;

    return {
      primary: [
        { label: "Immediate Move-In", value: money(immediate) },
        { label: "Annual Total", value: money(annualTotal) },
        { label: "First Cheque", value: money(firstCheque) },
      ],
      breakdown: [
        { label: "Annual Contract Rent", value: money(annual) },
        { label: "Municipality Attestation", value: money(attestation) },
        { label: "SEWA Deposit", value: money(sewa) },
        { label: "Security Deposit", value: `${money(security)} (${pct(securityPct * 100)})` },
        { label: "Commission (+VAT)", value: money(commVat) },
        { label: "Cheques", value: String(cheques) },
      ],
    };
  }

  const price = toNum(d.pPrice);
  const saleArea = toNum(d.pSaleArea);
  const priceSqft = saleArea > 0 ? price / saleArea : toNum(d.pPriceSqft);
  const expectedRent = toNum(d.pExpectRent);
  const roi = price > 0 ? (expectedRent / price) * 100 : toNum(d.pReturn);

  return {
    primary: [
      { label: "Market Price", value: money(price) },
      { label: "Price / SQFT", value: money(priceSqft) },
      { label: "Projected ROI", value: pct(roi) },
    ],
    breakdown: [
      { label: "Building", value: String(d.pBuilding || "-") },
      { label: "Unit", value: String(d.pUnit || "-") },
      { label: "Type", value: String(d.pType || "-") },
      { label: "Beds / Baths", value: `${String(d.pBeds || "-")} / ${String(d.pBaths || "-")}` },
      { label: "Saleable Area", value: `${Math.round(saleArea).toLocaleString("en-AE")} SQ FT` },
      { label: "Expected Rent", value: money(expectedRent) },
    ],
  };
}
