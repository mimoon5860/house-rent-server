import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";
import { ICreatePropertyBody } from "../utils/types/member.property.types";
import {
  IInsertBasicAttributeValuesParams,
  IInsertPriceExcludedParams,
  IInsertPriceIncludedParams,
  IInsertPropertyContentParams,
  IUpdateProperty,
} from "../../utils/interfaces/propertyTypes";

class MemberPropertyService extends AbstractServices {
  constructor() {
    super();
  }

  // create property service
  public async createProperty(req: Request) {
    return this.prisma.$transaction(async (tx) => {
      const { basicInfo, priceExcluded, priceIncluded, ...rest } =
        req.body as ICreatePropertyBody;
      const { memberId } = req.user;
      const model = this.Models.propertyModel(tx);

      const newProperty = await model.insertProperty({
        ...rest,
        memberId,
      });

      const attributePayload: IInsertBasicAttributeValuesParams[] =
        basicInfo.map((item) => {
          return {
            propertyId: newProperty.id,
            attributeId: item.attributeId,
            value: item.value,
          };
        });

      await model.insertBasicAttributeValues(attributePayload);

      if (priceIncluded.length) {
        const includePayload: IInsertPriceIncludedParams[] = priceIncluded.map(
          (item) => {
            return {
              name: item,
              propertyId: newProperty.id,
            };
          }
        );
        await model.insertPriceIncluded(includePayload);
      }

      if (priceExcluded.length) {
        const excludePayload: IInsertPriceExcludedParams[] = priceExcluded.map(
          (item) => {
            return {
              name: item.name,
              price: item.price,
              pirceFor: item.priceFor,
              propertyId: newProperty.id,
            };
          }
        );
        await model.insertPriceExcluded(excludePayload);
      }

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
        data: {
          id: newProperty.id,
        },
      };
    });
  }

  // get property of member service
  public async getProperty(req: Request) {}

  //  upload property content service
  public async uploadPropertyContenet(req: Request) {
    const files = (req.files as Express.Multer.File[]) || [];
    if (files.length > 10) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: "File upload limit is 10",
      };
    }
    const { id } = req.params;
    const { memberId } = req.user;
    const model = this.Models.propertyModel();

    const checkProperty = await model.getProperty({
      id: parseInt(id),
      memberId,
      status: "Draft",
    });

    if (!checkProperty.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    const payload: IInsertPropertyContentParams[] = [];

    const videoMimeType: string[] = ["video/mp4", "video/mpeg"];

    files.forEach((item) => {
      if (
        videoMimeType.includes(item.mimetype) &&
        item.fieldname.startsWith("video")
      ) {
        payload.push({
          path: item.filename,
          propertyId: checkProperty[0].id,
          type: "Video",
        });
      } else {
        payload.push({
          path: item.filename,
          propertyId: checkProperty[0].id,
          type: "Photo",
        });
      }
    });

    await model.insertPropertyContent(payload);

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.HTTP_SUCCESSFUL,
    };
  }

  // update property content service
  public async updatePropertyContent(req: Request) {
    const model = this.Models.propertyModel();
  }

  // update property status service
  public async updatePropertyStatus(req: Request) {
    const { id } = req.params;
    const { memberId } = req.user;
    const { status } = req.body;
    const model = this.Models.propertyModel();

    const checkProperty = await model.getProperty({
      id: parseInt(id),
      memberId,
    });

    if (!checkProperty.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }
    const currStatus = checkProperty[0].status;
    if (currStatus === "Expired") {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.HTTP_BAD_REQUEST,
      };
    }

    const updatePayload: IUpdateProperty = { status };

    if (currStatus === "Draft") {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 1);
      currentDate.setDate(1);
      const formattedDate = currentDate.toISOString().slice(0, 10);
      updatePayload.expiryDate = formattedDate;
    }

    await model.updateProperty(updatePayload, parseInt(id));

    return {
      success: true,
      message: this.ResMsg.HTTP_SUCCESSFUL,
      code: this.StatusCode.HTTP_SUCCESSFUL,
    };
  }

  // get single property of member service
  public async getSingleProperty(req: Request) {}

  // update a property service
  public async udpateProperty(req: Request) {}
}

export default MemberPropertyService;
