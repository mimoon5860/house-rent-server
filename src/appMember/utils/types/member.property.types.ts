interface ICreateBasicInfoBody {
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
export interface ICreatePropertyBody {
  title: string;
  shortAddress: string;
  summary: string;
  areaId: number;
  availableFrom: string;
  price: number;
  priceFor: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
  category: "Sublet" | "Bachelor" | "Family" | "Office" | "Hostel" | "Shop";
  mobileNumber: string;
  alternativeMobileNumber: string;
  priceIncluded: string[];
  basicInfo: ICreateBasicInfoBody;
  priceExcluded: {
    name: string;
    price: number;
    priceFor: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
  }[];
}

export interface IUpdatePropertyBody {
  title?: string;
  shortAddress?: string;
  summary?: string;
  areaId?: number;
  availableFrom?: string;
  price?: number;
  category?: "Sublet" | "Bachelor" | "Family" | "Office" | "Hostel" | "Shop";
  priceFor?: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
  priceIncluded?: { added: string[]; deleted: number[] };
  priceExluded?: {
    added?: {
      name: string;
      price: number;
      priceFor: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
    }[];
    deleted?: number[];
    updated?: {
      id: number;
      name: string;
      price: number;
      priceFor: "Daily" | "Weekly" | "Monthly" | "Half_Yearly" | "Yearly";
    }[];
  };
  basicInfo?: {
    added?: { attributeId: number; value: string }[];
    deleted?: number[];
    updated?: { id: number; value: string }[];
  };
}

export interface IGetPropertyQuery {
  status?: "Active" | "Expired" | "Draft" | "Inactive";
  category?: "Sublet" | "Bachelor" | "Family" | "Office" | "Hostel" | "Shop";
  isDeleted?: boolean;
  title?: string;
  fromDate?: string;
  toDate?: string;
  limit?: string;
  skip?: string;
}
