import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";
import { IGetProperty } from "../../utils/interfaces/propertyTypes";
import { IGetPropertyQuery } from "../utils/types/commonTypes";

class PublicPropertyServices extends AbstractServices {
  constructor() {
    super();
  }

  // get property
  public async getProperty(req: Request) {
    const model = this.Models.propertyModel();
    const { limit, skip, ...rest } = req.query as IGetPropertyQuery;

    const filter: IGetProperty = {
      isDeleted: false,
      status: "Active",
      ...rest,
    };

    if (limit) {
      filter.limit = Number(limit);
    }

    if (skip) {
      filter.skip = Number(skip);
    }

    const propertyData = await model.getProperty(filter);

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
      total: propertyData.total,
      data: propertyData.property,
    };
  }

  // get single property
  public async getSingleProperty(req: Request) {
    // insert per view with filter by ip to track every view and make popularity
    // const { memberId } = req.query;
    const { id } = req.params;
    const model = this.Models.propertyModel();

    const property = await model.getSingleProperty({
      id: parseInt(id),
      status: "Active",
      isDeleted: false,
    });

    if (property) {
      return {
        success: true,
        data: property,
        code: this.StatusCode.HTTP_OK,
        message: this.ResMsg.HTTP_OK,
      };
    } else {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }
  }
}
export default PublicPropertyServices;
