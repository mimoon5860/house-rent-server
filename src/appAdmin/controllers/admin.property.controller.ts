import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import PropertyValidator from "../utils/validator/property.validator";
import AdminPropertyService from "../services/admin.property.services";

class AdminPropertyController extends AbstractController {
  private validator = new PropertyValidator();
  private service = new AdminPropertyService();
  constructor() {
    super();
  }

  // create property basic attribute controller
  public createBasicAttribute = this.asyncWrapper.wrap(
    this.validator.createPropertyAttribute,
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.service.createBasicAttribute(req);
      res.status(code).json(rest);
    }
  );
}
export default AdminPropertyController;
