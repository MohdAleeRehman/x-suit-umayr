export type PropertyFormData = {
  pBuilding: string;
  pUnit: string;
  pLevel: string;
  pView: string;
  pType: "Apartment" | "Villa" | "Townhouse" | "C2";
  pBeds: number;
  pBaths: number;
  pLiving: number;
  pBalcony: string;
  pParking: string;
  pPlotArea: number;
  pSaleArea: number;
  pPrice: number;
  pPriceSqft: number;
  pStatus: string;
  pPaidOwner: string;
  pLeft: string;
  pExpectRent: number;
  pReturn: number;
};

export const PROPERTY_DEFAULTS: PropertyFormData = {
  pBuilding: "Robinia",
  pUnit: "131",
  pLevel: "1",
  pView: "Community",
  pType: "C2",
  pBeds: 3,
  pBaths: 4,
  pLiving: 1,
  pBalcony: "Yes",
  pParking: "2",
  pPlotArea: 1816,
  pSaleArea: 2591,
  pPrice: 2450000,
  pPriceSqft: 946,
  pStatus: "Rented till November 26",
  pPaidOwner: "Fully paid",
  pLeft: "Nill",
  pExpectRent: 140000,
  pReturn: 5.7,
};
