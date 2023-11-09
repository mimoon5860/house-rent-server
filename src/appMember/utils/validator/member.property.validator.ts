import Joi from "joi";

class MemberPropertyValidator {
  // price included schema
  private priceIncludedSchema = Joi.string().required();

  // price excluded schema
  private priceExcludedSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    priceFor: Joi.string()
      .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
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
    category: Joi.string()
      .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
      .required(),
    priceFor: Joi.string()
      .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
      .required(),
    priceIncluded: Joi.array().empty().items(this.priceIncludedSchema),
    priceExcluded: Joi.array().empty().items(this.priceExcludedSchema),
    basicInfo: Joi.array().items(this.basicInfoSchema).required(),
  });

  // save or post property schema
  public changePropertyStatusSchema = Joi.object({
    status: Joi.string().valid("Active", "Inactive").required(),
  });

  // common params id check schema
  public commonParamsIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });

  // get property query chech schema
  public getPropertyQeurySchema = Joi.object({
    sortBy: Joi.string()
      .valid("createDate", "availableFrom", "expiryDate")
      .optional(),
    orderBy: Joi.string().valid("asc", "desc").optional(),
    status: Joi.string()
      .valid("Draft", "Active", "Inactive", "Expired")
      .optional(),
    category: Joi.string()
      .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
      .optional(),
    area: Joi.number().integer().positive().optional(),
    thana: Joi.number().integer().positive().optional(),
    district: Joi.number().integer().positive().optional(),
    division: Joi.number().integer().positive().optional(),
  });

  // update property excluded added part validator schema

  public updatePriceExludedAddedSchemah = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    priceFor: Joi.string()
      .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
      .optional(),
  });
  // update property excluded updated part validator schema
  public updatePriceExludedUpdatedSchemah = Joi.object({
    id: Joi.number().required,
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    priceFor: Joi.string()
      .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
      .optional(),
  });

  // update property validator schema
  public updatePropertySchemah = Joi.object({
    title: Joi.string().optional(),
    shortAddress: Joi.string().optional(),
    summary: Joi.string().optional(),
    areaId: Joi.number().optional(),
    availableFrom: Joi.date().min("now").optional(),
    price: Joi.number().optional(),
    category: Joi.string()
      .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
      .optional(),
    priceFor: Joi.string()
      .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
      .optional(),
    priceIncluded: Joi.object({
      added: Joi.array().items(Joi.string().required()).optional(),
      deleted: Joi.array().items(Joi.number().required()).optional(),
    }).optional(),
    priceExluded: Joi.object({
      added: Joi.array().items(this.updatePriceExludedAddedSchemah).optional(),
      deleted: Joi.array().items(Joi.number().required()).optional(),
      updated: Joi.array()
        .items(this.updatePriceExludedUpdatedSchemah)
        .optional(),
    }).optional(),
    basicInfo: Joi.object({
      added: Joi.array()
        .items(
          Joi.object({
            attributeId: Joi.number().required(),
            value: Joi.string().required(),
          })
        )
        .optional(),
      deleted: Joi.array().items(Joi.number().required()).optional(),
      updated: Joi.array().items(
        Joi.object({
          id: Joi.number().required(),
          value: Joi.string().required(),
        }).optional()
      ),
    }),
  });

  // Update property status validator schema
  public updatePropertyStatusSchmea = Joi.object({
    status: Joi.string().required().valid("Active", "Inactive"),
  });

  // Get property query validator schema
  public getPropertyQueryValidatorSchema = Joi.object({
    limit: Joi.number().optional(),
    skip: Joi.number().optional(),
    status: Joi.string()
      .optional()
      .valid("Draft", "Active", "Inactive", "Expired"),
    category: Joi.string()
      .optional()
      .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop"),
    formDate: Joi.date().optional(),
    toDate: Joi.date().optional(),
    title: Joi.string().optional(),
    deleted: Joi.boolean().optional(),
  });
}

export default MemberPropertyValidator;
