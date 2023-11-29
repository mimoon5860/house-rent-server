// insert property basic info params
export interface IInsertBasicInfoParams {
  propertyId: number;
  availableFrom: string;
  propertyType: "Room" | "Flat" | "Seat" | "House" | "Apartment" | "Floor";
  bedRoom?: number;
  bathRoom?: number;
  balcony?: number;
  floor?: number;
  gender?: "Male" | "Female" | "Anyone";
  size?: number;
  parking?: number;
}

// update property basic info params
export interface IUpdateBasicInfoParams {
  availableFrom?: string;
  propertyType?: "Room" | "Flat" | "Seat" | "House" | "Apartment" | "Floor";
  bedRoom?: number;
  bathRoom?: number;
  balcony?: number;
  floor?: number;
  gender?: "Male" | "Female" | "Anyone";
  size?: number;
  parking?: number;
}

// insert property content
export interface IInsertPropertyContentParams {
  propertyId: number;
  path: string;
  type?: "Audio" | "Video" | "Photo";
}

// insert property contact
export interface IInsertPropertyContact {
  contact: string;
  propertyId: number;
}

// insert price included params
export interface IInsertPriceIncludedParams {
  propertyId: number;
  name: string;
}

// insert price excluded params
export interface IInsertPriceExcludedParams {
  propertyId: number;
  name: string;
  price: number;
  pirceFor: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
}

// update price excluded params
export interface IUpdatePriceExcludedParams {
  name?: string;
  price?: number;
  pirceFor?: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
}

export interface IInsertProperty {
  memberId: number;
  title: string;
  shortAddress: string;
  areaId: number;
  summary: string;
  availableFrom: string;
  status?: "Active" | "Expired" | "Draft" | "Inactive";
  category: "Sublet" | "Bachelor" | "Family" | "Office" | "Hostel" | "Shop";
  price: number;
  priceFor: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
}

export interface IUpdateProperty {
  title?: string;
  shortAddress?: string;
  areaId?: number;
  summary?: string;
  availableFrom?: string;
  expiryDate?: string;
  status?: "Active" | "Expired" | "Draft" | "Inactive";
  price?: number;
  priceFor?: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
}

export interface IGetProperty {
  memberId?: number;
  status?: "Active" | "Expired" | "Draft" | "Inactive";
  category?: "Sublet" | "Bachelor" | "Family" | "Office" | "Hostel" | "Shop";
  isDeleted?: boolean;
  title?: string;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  skip?: number;
  area?: string;
  thana?: string;
  district?: string;
  division?: string;
}

export interface ICheckProperty {
  id?: number;
  memberId?: number;
  status?: "Active" | "Expired" | "Draft" | "Inactive";
  category?: "Sublet" | "Bachelor" | "Family" | "Office" | "Hostel" | "Shop";
  isDeleted?: boolean;
}

export interface IGetSingleProperty {
  id: number;
  isDeleted?: boolean;
  memberId?: number;
  status?: "Active" | "Expired" | "Draft" | "Inactive";
}
