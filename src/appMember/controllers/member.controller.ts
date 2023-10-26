import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberService from "../services/member.services";

class MemberController extends AbstractController {
  private services = new MemberService();
  constructor() {
    super();
  }

  // get profile
  public getProfile = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.getProfile(req);
      res.status(code).json(rest);
    }
  );
}

export default MemberController;
