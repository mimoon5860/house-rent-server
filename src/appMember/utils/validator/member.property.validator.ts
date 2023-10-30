import Joi from "joi";

class MemberPropertyValidator {
  // price included schema
  private priceIncludedSchema = Joi.string().required();
  // price excluded schema
  private priceExcludedSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    priceFor: Joi.string()
      .allow(["Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly"])
      .required(),
  });
  // basic info of property schema
  private basicInfoSchema = Joi.object({
    attributeId: Joi.number().required(),
    value: Joi.string().required(),
  });

  // create property validator
  public createPropertySchema = Joi.object({
    title: Joi.string().required(),
    shortAddress: Joi.string().required(),
    summary: Joi.string().required(),
    areaId: Joi.number().required(),
    availableFrom: Joi.date().min("now").required(),
    price: Joi.number().required(),
    categroy: Joi.string()
      .valid(["Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop"])
      .required(),
    priceFor: Joi.string()
      .valid(["Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly"])
      .required(),
    priceIncluded: Joi.array().items(this.priceIncludedSchema).allow([]),
    priceExluded: Joi.array().items(this.priceExcludedSchema).allow([]),
    basicInfo: Joi.array().items(this.basicInfoSchema).required(),
  });

  // save or post property schema
  public changePropertyStatusSchema = Joi.object({
    status: Joi.string().allow(["Active", "Inactive"]).required(),
  });

  // common params id check schema
  public commonParamsIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });

  // get property query chech schema
  public getPropertyQeurySchema = Joi.object({
    sortBy: Joi.string()
      .allow(["createDate", "availableFrom", "expiryDate"])
      .optional(),
    orderBy: Joi.string().allow("asc", "desc").optional(),
    status: Joi.string()
      .allow("Draft", "Active", "Inactive", "Expired")
      .optional(),
    category: Joi.string()
      .allow("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
      .optional(),
    area: Joi.number().integer().positive().optional(),
    thana: Joi.number().integer().positive().optional(),
    district: Joi.number().integer().positive().optional(),
    division: Joi.number().integer().positive().optional(),
  });
}

export default MemberPropertyValidator;
