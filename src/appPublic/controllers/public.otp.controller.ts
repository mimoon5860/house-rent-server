import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import PublicOtpServices from "../services/public.otp.services";
import PublicOtpValidator from "../utils/validator/public.otp.validator";

class PublicOtpController extends AbstractController {
  private services = new PublicOtpServices();
  private validator = new PublicOtpValidator();
  constructor() {
    super();
  }

  // send email otp
  public sendEmailOtpController = this.asyncWrapper.wrap(
    { bodySchema: this.validator.sendOtpSchema },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.sendEmailOtp(req);
      res.status(code).json(rest);
    }
  );
  // match email otp
  public matchEmailOtpController = this.asyncWrapper.wrap(
    { bodySchema: this.validator.matchOtpSchema },
    async (req: Request, res: Response) => {
      //   const { code, ...rest } = await this.services.matchEmailOtp(req);
      //   res.status(code).json(rest);
    }
  );
}
export default PublicOtpController;
