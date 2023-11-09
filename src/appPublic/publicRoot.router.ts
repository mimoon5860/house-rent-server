import { Router } from "express";
import PublicPropertyRouter from "./routers/public.property.router";
import PubliOTPRouter from "./routers/public.otp.router";

class PublicRouter {
  public router = Router();
  private propertyRouter = new PublicPropertyRouter();
  private otpRouter = new PubliOTPRouter();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    // OTP router
    this.router.use("/otp", this.otpRouter.router);

    // property router
    this.router.use("/property", this.propertyRouter.router);
  }
}
export default PublicRouter;
