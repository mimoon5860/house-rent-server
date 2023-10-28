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

  // get allproperty basic attribute
  public async getPBasicAttribute(req: Request) {
    const model = this.Models.propertyModel();
    const attributes = await model.getBasicAttribute({});

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
      data: attributes,
    };
  }
}
export default AdminPropertyService;
