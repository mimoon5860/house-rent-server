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
    this.router.route("/profile").get(this.controller.getProfile);
  }
}
export default MemberRouter;
