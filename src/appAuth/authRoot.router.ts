import MemberAuthRouter from "./routers/member.auth.router";
import { Router } from "express";

class AuthRootRouter {
  public router = Router();
  private memberAuthRouter = new MemberAuthRouter();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    this.router.use("/member", this.memberAuthRouter.router);
  }
}

export default AuthRootRouter;
