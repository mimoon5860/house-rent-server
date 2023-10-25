import { Router } from "express";
import MemberRootRouter from "../appMember/memberRoot.router";
import AuthRootRouter from "../appAuth/authRoot.router";
import AuthChecker from "../middleware/authChecker/authChecker";

class RootRouter {
  public v1Router = Router();
  private authRouter = new AuthRootRouter();
  private memberRouter = new MemberRootRouter();
  private authChecker = new AuthChecker();

  constructor() {
    this.callV1Router();
  }

  private callV1Router() {
    // auth router for member, admin, trainee
    this.v1Router.use("/auth", this.authRouter.router);

    // member router
    this.v1Router.use(
      "/member",
      this.authChecker.memberAuthChecker,
      this.memberRouter.router
    );
  }
}

export default RootRouter;
