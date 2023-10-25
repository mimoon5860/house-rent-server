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
