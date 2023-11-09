import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";

class PublicOtpServices extends AbstractServices {
  constructor() {
    super();
  }

  // send otp service
  public async sendEmailOtp(req: Request) {
    const { email, type } = req.body;

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.OTP_SENT,
      data: {
        email,
      },
    };
  }
  // match otp services

  public async matchEmailOtp(req: Request) {
    const { email, type } = req.body;
  }
}
export default PublicOtpServices;
