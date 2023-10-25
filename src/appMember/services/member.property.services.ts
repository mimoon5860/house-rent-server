import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";

class MemberPropertyService extends AbstractServices {
  constructor() {
    super();
  }

  // create property service
  public async createProperty(req: Request) {}

  // get property of member service
  public async getProperty(req: Request) {}

  // get single property of member service
  public async getSingleProperty(req: Request) {}
}

export default MemberPropertyService;
