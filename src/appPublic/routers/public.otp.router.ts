import AbstractRouter from "../../abstract/abstract.router";

class PubliOTPRouter extends AbstractRouter {
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // send otp
    this.router.route("/send");

    // match otp
    this.router.route("/match");
  }
}
export default PubliOTPRouter;
