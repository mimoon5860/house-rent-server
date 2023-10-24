import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberAuthServices from "../services/member.auth.services";

class MemberAuthController extends AbstractController {
  private services = new MemberAuthServices();
  constructor() {
    super();
  }

  // registration controller
  public registrationController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.registerMember(req);

      if (rest.success) {
        res.status(code).json(rest);
      } else {
        this.error(rest.message, code);
      }
    }
  );

  // login controller
  public loginController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.loginMember(req);
      res.status(code).json(rest);
    }
  );
}

export default MemberAuthController;
