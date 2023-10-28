import { Router } from "express";
import MemberRouter from "./routers/member.router";
import MemberPropertyRouter from "./routers/member.property.router";

class MemberRootRouter {
  public router = Router();
  private memberRouter = new MemberRouter();
  private propertyRouter = new MemberPropertyRouter();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    // member routes
    this.router.use("/", this.memberRouter.router);

    // property routes
    this.router.use("/property", this.propertyRouter.router);
  }
}
export default MemberRootRouter;
