import { Router } from "express";
import AuthRouter from "../appAuth/authRouter";

class RootRouter {
  public v1Router = Router();
  private authRouter = new AuthRouter();

  constructor() {
    this.callV1Router();
  }

  private callV1Router() {
    // auth router for member, admin, trainee
    this.v1Router.use("/auth", this.authRouter.AuthRouter);
  }
}

export default RootRouter;
