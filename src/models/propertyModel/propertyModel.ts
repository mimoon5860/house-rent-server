import { Prisma } from "@prisma/client";
import { TDB } from "../../utils/interfaces/common";
import {
  ICheckProperty,
  IGetAttributeParams,
  IGetProperty,
  IGetSingleProperty,
  IInsertBasicAttributeValuesParams,
  IInsertPriceExcludedParams,
  IInsertPriceIncludedParams,
  IInsertProperty,
  IInsertPropertyBasicAttributeParams,
  IInsertPropertyContentParams,
  IUpdateBasicAttributeValuesParams,
  IUpdatePriceExcludedParams,
  IUpdateProperty,
} from "../../utils/interfaces/propertyTypes";

class PropertyModel {
  private client: TDB;
  constructor(client: TDB) {
    this.client = client;
  }

  // insert property basic attribute
  public async insertBasicAttribute(
    params:
      | IInsertPropertyBasicAttributeParams
      | IInsertPropertyBasicAttributeParams[]
  ) {
    if (Array.isArray(params)) {
      return await this.client.propertyBasicAttribute.createMany({
        data: params,
      });
    } else {
      return await this.client.propertyBasicAttribute.create({
        data: params,
      });
    }
  }

  // get property basic attributes
  public async getBasicAttribute(params: IGetAttributeParams) {
    return await this.client.propertyBasicAttribute.findMany({
      where: params,
    });
  }

  // insert price included
  public async insertPriceIncluded(
    params: IInsertPriceIncludedParams | IInsertPriceIncludedParams[]
  ) {
    if (Array.isArray(params)) {
      return await this.client.priceIncluded.createMany({
        data: params,
      });
    } else {
      return await this.client.priceIncluded.create({
        data: params,
      });
    }
  }

  // insert price excluded
  public async insertPriceExcluded(
    params: IInsertPriceExcludedParams | IInsertPriceExcludedParams[]
  ) {
    if (Array.isArray(params)) {
      return await this.client.priceExcluded.createMany({
        data: params,
      });
    } else {
      return await this.client.priceExcluded.create({
        data: params,
      });
    }
  }

  // insert basic attribute values
  public async insertBasicAttributeValues(
    params:
      | IInsertBasicAttributeValuesParams
      | IInsertBasicAttributeValuesParams[]
  ) {
    if (Array.isArray(params)) {
      return await this.client.propertyBasicAttributeValue.createMany({
        data: params,
      });
    } else {
      return await this.client.propertyBasicAttributeValue.create({
        data: params,
      });
    }
  }

  // insert property content
  public async insertPropertyContent(
    params: IInsertPropertyContentParams | IInsertPropertyContentParams[]
  ) {
    if (Array.isArray(params)) {
      return await this.client.propertyContent.createMany({
        data: params,
      });
    } else {
      return await this.client.propertyContent.create({
        data: params,
      });
    }
  }

  // insert property
  public async insertProperty(params: IInsertProperty) {
    return await this.client.property.create({
      data: params,
    });
  }

  // get property
  public async getProperty(params: IGetProperty) {
    const {
      deleted,
      title,
      fromDate,
      toDate,
      limit = 100,
      skip = 0,
      ...rest
    } = params;

    const where: Prisma.PropertyWhereInput = { ...rest, isDeleted: false };

    if (deleted) {
      where.isDeleted = deleted;
    }

    if (title) {
      where.title = {
        contains: title,
      };
    }

    if (fromDate && toDate) {
      const newToDate = new Date(toDate);
      newToDate.setDate(newToDate.getDate() + 1);
      where.createDate = {
        gte: new Date(fromDate),
        lte: newToDate,
      };
    }

    const property = await this.client.property.findMany({
      select: {
        id: true,
        title: true,
        memberId: true,
        status: true,
        category: true,
        availableFrom: true,
        shortAddress: true,
        contents: {
          select: {
            id: true,
            path: true,
            type: true,
          },
        },
        area: {
          select: {
            id: true,
            name: true,
            thana: {
              select: {
                id: true,
                name: true,
                district: {
                  select: {
                    id: true,
                    name: true,
                    division: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        createDate: true,
      },
      where,
      take: limit,
      skip,
      orderBy: {
        createDate: "desc",
      },
    });

    const total = await this.client.property.count({ where });

    return { property, total };
  }

  // check property
  public async checkProperty(params: ICheckProperty) {
    return await this.client.property.findMany({
      select: {
        id: true,
        title: true,
        memberId: true,
        status: true,
        category: true,
        availableFrom: true,
        shortAddress: true,
        contents: {
          select: {
            id: true,
            path: true,
            type: true,
          },
        },
      },
      where: params,
    });
  }

  // get single property
  public async getSingleProperty(params: IGetSingleProperty) {
    return await this.client.property.findUnique({
      select: {
        id: true,
        memberId: true,
        title: true,
        summary: true,
        availableFrom: true,
        expiryDate: true,
        status: true,
        category: true,
        price: true,
        basicInfo: {
          select: {
            id: true,
            value: true,
            attribute: {
              select: {
                attributeName: true,
              },
            },
          },
        },
        includedPrice: {
          select: {
            id: true,
            name: true,
          },
        },
        excludedPrice: {
          select: {
            id: true,
            name: true,
            price: true,
            pirceFor: true,
          },
        },
        contents: {
          select: {
            id: true,
            path: true,
            type: true,
          },
        },
        shortAddress: true,
        area: {
          select: {
            id: true,
            name: true,
            thana: {
              select: {
                id: true,
                name: true,
                district: {
                  select: {
                    id: true,
                    name: true,
                    division: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        createDate: true,
      },
      where: params,
    });
  }

  // update property
  public async updateProperty(payload: IUpdateProperty, id: number) {
    return await this.client.property.update({
      data: payload,
      where: {
        id,
      },
    });
  }

  // update basic attribute value
  public async updateBasicAttributeValue(
    payload: IUpdateBasicAttributeValuesParams,
    id: number
  ) {
    return await this.client.propertyBasicAttributeValue.update({
      data: payload,
      where: { id },
    });
  }

  // delete basic attribute vlaue
  public async deleteBasicAttributeValue(id: number) {
    return await this.client.propertyBasicAttributeValue.deleteMany({
      where: { id },
    });
  }

  // update price excluded value
  public async updatePriceExclue(
    payload: IUpdatePriceExcludedParams,
    id: number
  ) {
    return await this.client.priceExcluded.update({
      data: payload,
      where: { id },
    });
  }

  // delete price excluded value
  public async deletePriceExclue(id: number) {
    return await this.client.priceExcluded.delete({
      where: { id },
    });
  }

  // delete price included
  public async deletePriceIncluded(id: number) {
    return await this.client.priceIncluded.delete({
      where: { id },
    });
  }
}
export default PropertyModel;
