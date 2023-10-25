import { NextFunction, Request, Response } from "express";
import AbstractRouter from "../../abstract/abstract.router";
import MemberController from "../controllers/member.controller";

class MemberRouter extends AbstractRouter {
  private controller = new MemberController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get profile route
    this.router
      .route("/profile")
      .get((req: Request, res: Response, next: NextFunction) => {
        console.log(req.user);
        next();
      }, this.controller.getProfile);
  }
}
export default MemberRouter;
