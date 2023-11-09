import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import PublicPropertyServices from "../services/public.property.service";
import PublicPropertyValidator from "../utils/validator/public.property.validator";

class PublicPropertyController extends AbstractController {
  private services = new PublicPropertyServices();
  private validator = new PublicPropertyValidator();
  constructor() {
    super();
  }

  // get property controller
  public getProperty = this.asyncWrapper.wrap(
    { querySchema: this.validator.getPropertyQueryValidatorSchema },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.getProperty(req);
      res.status(code).json(rest);
    }
  );

  // get singel property controller
  public getSingleProperty = this.asyncWrapper.wrap(
    {
      querySchema: this.validator.getSinglePropertyQuerySchema,
      parmSchema: this.validator.paramsIdValidatorSchema,
    },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.getSingleProperty(req);
      res.status(code).json(rest);
    }
  );
}
export default PublicPropertyController;
