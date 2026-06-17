export type PropertyFormData = {
  pBuilding: string;
  pUnit: string;
  pType: "Apartment" | "Villa";
  pBeds: number;
  pBaths: number;
  pSaleArea: number;
  pPrice: number;
  pExpectRent: number;
};

export const PROPERTY_DEFAULTS: PropertyFormData = {
  pBuilding: "",
  pUnit: "",
  pType: "Apartment",
  pBeds: 1,
  pBaths: 2,
  pSaleArea: 1000,
  pPrice: 900000,
  pExpectRent: 70000,
};
