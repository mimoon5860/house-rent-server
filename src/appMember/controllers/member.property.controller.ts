import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberPropertyService from "../services/member.property.services";
import MemberPropertyValidator from "../utils/validator/member.property.validator";

class MemberPropertyController extends AbstractController {
  private services = new MemberPropertyService();
  private validator = new MemberPropertyValidator();
  constructor() {
    super();
  }

  // create property controller
  public createProperty = this.asyncWrapper.wrap(
    { bodySchema: this.validator.createPropertySchema },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.createProperty(req);
      res.status(code).json(rest);
    }
  );

  // get property controller
  public getProperty = this.asyncWrapper.wrap(
    { querySchema: this.validator.getPropertyQueryValidatorSchema },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.getProperty(req);
      res.status(code).json(rest);
    }
  );

  // upload property content controller
  public uploadPropertyContent = this.asyncWrapper.wrap(
    { parmSchema: this.validator.paramsIdValidatorSchema },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.uploadPropertyContenet(req);

      if (rest.success) {
        res.status(code).json(rest);
      } else {
        this.error(rest.message, code);
      }
    }
  );

  //update property content controller
  public updatePropertyContent = this.asyncWrapper.wrap(
    { parmSchema: this.validator.paramsIdValidatorSchema },
    async (req: Request, res: Response) => {}
  );

  // update property status controller
  public updatePropertyStatus = this.asyncWrapper.wrap(
    {
      bodySchema: this.validator.updatePropertyStatusSchmea,
      parmSchema: this.validator.paramsIdValidatorSchema,
    },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.updatePropertyStatus(req);
      res.status(code).json(rest);
    }
  );

  // update property controller
  public updateProperty = this.asyncWrapper.wrap(
    {
      bodySchema: this.validator.updatePropertySchema,
      parmSchema: this.validator.paramsIdValidatorSchema,
    },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.updateProperty(req);
      res.status(code).json(rest);
    }
  );

  // get single property controller
  public getSingleProperty = this.asyncWrapper.wrap(
    { parmSchema: this.validator.paramsIdValidatorSchema },
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.services.getSingleProperty(req);
      res.status(code).json(rest);
    }
  );
}
export default MemberPropertyController;
