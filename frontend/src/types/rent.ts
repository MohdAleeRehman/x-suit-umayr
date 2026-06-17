export type RentFormData = {
  rentAnnual: number;
  rentCheques: number;
  rentSewa: number;
  rentFurnished: "furnished" | "unfurnished";
  rcType: "pct" | "fixed";
  rcVal: number;
  rentStartDate: string;
};

export const RENT_DEFAULTS: RentFormData = {
  rentAnnual: 85000,
  rentCheques: 4,
  rentSewa: 4,
  rentFurnished: "unfurnished",
  rcType: "pct",
  rcVal: 5,
  rentStartDate: new Date().toISOString().slice(0, 10),
};
