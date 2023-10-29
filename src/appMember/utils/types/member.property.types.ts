export interface ICreatePropertyBody {
  title: string;
  shortAddress: string;
  summary: string;
  areaId: number;
  availableFrom: string;
  price: number;
  priceFor: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
  category: "Sublet" | "Bachelor" | "Family" | "Office" | "Hostel" | "Shop";
  priceIncluded: string[];
  basicInfo: {
    attributeId: number;
    value: string;
  }[];
  priceExcluded: {
    name: string;
    price: number;
    priceFor: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
  }[];
}
