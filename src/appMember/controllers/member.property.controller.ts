import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberPropertyService from "../services/member.property.services";

class MemberPropertyController extends AbstractController {
  private services = new MemberPropertyService();
  constructor() {
    super();
  }

  // create property controller
  public createProperty = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {}
  );

  // get property controller
  public getProperty = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {}
  );

  // upload property content controller
  public uploadPropertyContent = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {}
  );

  //update property content controller
  public updatePropertyContent = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {}
  );

  // update property status controller
  public updatePropertyStatus = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {}
  );

  // get single property controller
  public getSingleProperty = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {}
  );

  // update property controller
  public updateProperty = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {}
  );
}
export default MemberPropertyController;
