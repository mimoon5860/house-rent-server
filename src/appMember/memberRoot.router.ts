import { Router } from "express";
import MemberRouter from "./routers/member.router";

class MemberRootRouter {
  public router = Router();
  private memberRouter = new MemberRouter();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    this.router.use("/", this.memberRouter.router);
  }
}
export default MemberRootRouter;
