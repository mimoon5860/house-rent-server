export interface IInsertUserParams {
  userName: string;
  email: string;
  mobileNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  photo?: string | null;
}

export interface IInsertMember {
  userId: number;
}

export interface IGetUserMemberParams {
  email?: string;
  userName?: string;
  mobileNumber?: string;
  userId?: number;
  memberId?: number;
  status?: "Active" | "Inactive";
}

export interface IGetUserMemberWhere {
  id?: number;
  user: {
    id?: number;
    email?: string;
    mobileNumber?: string;
    status?: "Active" | "Inactive";
    userName?: string;
    type: {
      some: { userType: "MEMBER" };
    };
  };
}
