export interface IInsertOtp {
  email: string;
  hashedOtp: string;
  type: "Reset_Member" | "Reset_Admin" | "Verify_Member" | "Verify_Admin";
  matched: boolean;
  tried: number;
}

export interface IUpdateOtp {
  matched?: boolean;
  tried: number;
}
