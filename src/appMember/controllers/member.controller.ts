import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberService from "../services/member.services";
import MemberValidator from "../utils/validator/member.validator";

class MemberController extends AbstractController {
  private services = new MemberService();
  private validator = new MemberValidator();
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

  // change passoward controller
  public changePassword = this.asyncWrapper.wrap(
    { bodySchema: this.validator.changePassword },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.changePassword(req);

      res.status(code).json(rest);
    }
  );

  // update profile controller
  public updateProfile = this.asyncWrapper.wrap(
    { bodySchema: this.validator.updateProfile },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.updateProfile(req);

      res.status(code).json(rest);
    }
  );

  public deleteProfile = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.deleteProfile(req);

      res.status(code).json(rest);
    }
  );
}

export default MemberController;
