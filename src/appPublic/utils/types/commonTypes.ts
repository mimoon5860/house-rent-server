export interface IUser {
  userId: number;
  memberId: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  photo: string | null;
}
export interface IAdmin {
  id: number;
  name: string;
  photo: string;
  type: string;
  status: boolean;
}

export interface IGetPropertyQuery {
  limit?: string;
  skip?: string;
  area?: string;
  thana?: string;
  district?: string;
  division?: string;
  title?: string;
  category?: "Sublet" | "Bachelor" | "Family" | "Office" | "Hostel" | "Shop";
}
