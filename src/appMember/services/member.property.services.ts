import { Request } from "express";
import AbstractServices from "../../abstract/abstract.service";
import {
  ICreatePropertyBody,
  IUpdatePropertyBody,
} from "../utils/types/member.property.types";
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
    const files = (req.files as Express.Multer.File[]) || [];

    const { id } = req.params as { id: string };
    const { memberId } = req.user as { memberId: number };
    const model = this.Models.propertyModel();
    if (files.length > 10) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: "File upload limit is 10",
      };
    }

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
  public async updateProperty(req: Request) {
    const { id } = req.params as { id: string };

    const { priceIncluded, priceExluded, basicInfo, ...rest } =
      req.body as IUpdatePropertyBody;

    return await this.prisma.$transaction(async (tx) => {
      const model = this.Models.propertyModel(tx);

      await model.updateProperty(rest, +id);

      // balic info
      if (basicInfo?.added?.length) {
        const attributePayload: IInsertBasicAttributeValuesParams[] =
          basicInfo.added.map((item) => {
            return {
              propertyId: parseInt(id),
              attributeId: item.attributeId,
              value: item.value,
            };
          });

        await model.insertBasicAttributeValues(attributePayload);
      }

      if (basicInfo?.updated?.length) {
        basicInfo.updated.map(async (item) => {
          await model.updateBasicAttributeValue(
            { value: item.value as string },
            item.id
          );
        });
      }

      if (basicInfo?.deleted?.length) {
        basicInfo.deleted.map(
          async (id) => await model.deleteBasicAttributeValue(id)
        );
      }

      // Price Exluded
      if (priceExluded?.added?.length) {
        const excludePayload: IInsertPriceExcludedParams[] =
          priceExluded?.added.map((item) => {
            return {
              name: item.name,
              price: item.price,
              pirceFor: item.priceFor,
              propertyId: parseInt(id),
            };
          });
        await model.insertPriceExcluded(excludePayload);
      }

      if (priceExluded?.updated?.length) {
        priceExluded.updated?.map(async (item) => {
          await model.updatePriceExclue(
            { name: item?.name, price: item?.price, pirceFor: item?.priceFor },
            item.id
          );
        });
      }

      if (priceExluded?.deleted?.length) {
        priceExluded?.deleted?.map(
          async (id) => await model.deletePriceExclue(id)
        );
      }

      // Price Included
      if (priceIncluded?.added?.length) {
        const includePayload: IInsertPriceIncludedParams[] =
          priceIncluded?.added.map((item) => {
            return {
              name: item,
              propertyId: parseInt(id),
            };
          });
        await model.insertPriceIncluded(includePayload);
      }

      if (priceIncluded?.deleted?.length) {
        priceIncluded.deleted.map(
          async (id) => await model.deletePriceIncluded(id)
        );
      }

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
      };
    });
  }
}

export default MemberPropertyService;
