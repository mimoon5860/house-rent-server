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

  //  upload property content service
  public async uploadPropertyContenet(req: Request) {}

  // update property content service
  public async updatePropertyContent(req: Request) {}

  // update property status service
  public async updatePropertyStatus(req: Request) {}

  // get single property of member service
  public async getSingleProperty(req: Request) {}

  // update a property service
  public async udpateProperty(req: Request) {}
}

export default MemberPropertyService;
