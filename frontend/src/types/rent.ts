export type RentFormData = {
  rentAnnual: number;
  rentCheques: number;
  rentSewa: number;
  rentFurnished: "furnished" | "unfurnished";
  rcType: "pct" | "amt";
  rcVal: number;
  rentStartDate: string;
};

export const RENT_DEFAULTS: RentFormData = {
  rentAnnual: 65000,
  rentCheques: 4,
  rentSewa: 2000,
  rentFurnished: "unfurnished",
  rcType: "pct",
  rcVal: 5,
  rentStartDate: new Date().toISOString().slice(0, 10),
};
