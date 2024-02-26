import { Prisma } from "@prisma/client";
import { TDB } from "../../utils/interfaces/common";
import {
  ICheckProperty,
  IGetProperty,
  IGetSingleProperty,
  IInsertBasicInfoParams,
  IInsertPriceExcludedParams,
  IInsertPriceIncludedParams,
  IInsertProperty,
  IInsertPropertyContact,
  IInsertPropertyContentParams,
  IInsertPropertyFeaturesParams,
  IUpdateBasicInfoParams,
  IUpdatePriceExcludedParams,
  IUpdateProperty,
} from "../../utils/interfaces/propertyTypes";

class PropertyModel {
  private client: TDB;
  constructor(client: TDB) {
    this.client = client;
  }

  // insert property features
  public async insertPropertyFeatures(
    params: IInsertPropertyFeaturesParams | IInsertPropertyFeaturesParams[]
  ) {
    if (Array.isArray(params)) {
      return await this.client.propertyFeatures.createMany({
        data: params,
      });
    } else {
      return await this.client.propertyFeatures.create({
        data: params,
      });
    }
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

  // insert property contact
  public async insertPropertyContact(
    params: IInsertPropertyContact | IInsertPropertyContact[]
  ) {
    if (Array.isArray(params)) {
      return await this.client.propertyContact.createMany({
        data: params,
      });
    } else {
      return await this.client.propertyContact.create({
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
      isDeleted,
      title,
      fromDate,
      toDate,
      limit = 20,
      skip = 0,
      area,
      district,
      division,
      thana,
      ...rest
    } = params;

    const where: Prisma.PropertyWhereInput = { ...rest, isDeleted: false };

    if (isDeleted) {
      where.isDeleted = isDeleted;
    }

    if (title) {
      where.title = {
        contains: title,
      };
    }

    if (area) {
      where.area = { name: area };
    }
    if (thana) {
      where.area = { thana: { name: thana } };
    }
    if (district) {
      where.area = { thana: { district: { name: district } } };
    }

    if (division) {
      where.area = {
        thana: {
          district: {
            division: { name: division },
          },
        },
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
        expiryDate: true,
        status: true,
        category: true,
        rentFor: true,
        contact: {
          select: {
            id: true,
            contact: true,
          },
        },
        basicInfo: {
          select: {
            id: true,
            availableFrom: true,
            balcony: true,
            bathRoom: true,
            bedRoom: true,
            floor: true,
            gender: true,
            parking: true,
            propertyType: true,
            size: true,
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

  // update basic info
  public async updateBasicInfo(payload: IUpdateBasicInfoParams, id: number) {
    return await this.client.propertyBasicInfo.update({
      data: payload,
      where: { id },
    });
  }

  // insert basic info
  public async insertBasicInfo(payload: IInsertBasicInfoParams) {
    return await this.client.propertyBasicInfo.create({
      data: payload,
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

  // delete property features
  public async deletePropertyFeatures(id: number) {
    return await this.client.propertyFeatures.delete({
      where: { id },
    });
  }
}
export default PropertyModel;
