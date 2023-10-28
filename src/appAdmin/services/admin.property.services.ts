import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";

class AdminPropertyService extends AbstractServices {
  constructor() {
    super();
  }

  // create property basic attribute
  public async createBasicAttribute(req: Request) {
    const { attributeName } = req.body;
    const model = this.Models.propertyModel();
    const checkAttribute = await model.getBasicAttribute({ attributeName });

    if (checkAttribute.length) {
      return {
        success: true,
        code: this.StatusCode.HTTP_CONFLICT,
        message: this.ResMsg.HTTP_CONFLICT,
      };
    }
    const attribute = await model.insertBasicAttribute({ attributeName });

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.HTTP_SUCCESSFUL,
      data: attribute,
    };
  }
}
export default AdminPropertyService;
