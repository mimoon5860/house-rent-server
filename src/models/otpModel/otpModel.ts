import { TDB } from "../../utils/interfaces/common";
import { IInsertOtp } from "../../utils/interfaces/otpTypes";

class OtpModel {
  private client: TDB;
  constructor(client: TDB) {
    this.client = client;
  }

  // insert email otp
  public async insertOtp(params: IInsertOtp) {
    return await this.client.emailOTP.create({
      data: params,
    });
  }
  // get email otp
}

export default OtpModel;
