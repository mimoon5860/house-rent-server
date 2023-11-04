import { TDB } from "../../utils/interfaces/common";
import {
  IGetAttributeParams,
  IGetProperty,
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
    return await this.client.property.findMany({
      select: {
        id: true,
        title: true,
        memberId: true,
        status: true,
        category: true,
        availableFrom: true,
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
      },
      where: { ...params, isDeleted: false },
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
