// insert property basic attribute params
export interface IInsertPropertyBasicAttributeParams {
  attributeName: string;
}

// insert property basic attribute values
export interface IInsertBasicAttributeValuesParams {
  attributeId: number;
  value: string;
  propertyId: number;
}

// get attribute params
export interface IGetAttributeParams {
  id?: number;
  attributeName?: string;
}

// insert property content
export interface IInsertPropertyContentParams {
  propertyId: number;
  path: string;
  type?: "Audio" | "Video" | "Photo";
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

export interface IInsertProperty {
  memberId: number;
  title: string;
  shortAddress: string;
  areaId: number;
  summary: string;
  availableFrom: string;
  status?: "Active" | "Expired" | "Draft";
  category: "Sublet" | "Bachelor" | "Family" | "Office" | "Hostel" | "Shop";
  price: number;
  priceFor: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
}
