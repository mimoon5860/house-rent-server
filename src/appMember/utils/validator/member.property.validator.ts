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

  // create property validator
  public createPropertySchema = Joi.object({
    title: Joi.string().required(),
    shortAddress: Joi.string().required(),
    summary: Joi.string().required(),
    areaId: Joi.number().required(),
    rent: Joi.number().required(),
    category: Joi.string()
      .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
      .required(),
    rentFor: Joi.string()
      .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
      .required(),
    priceIncluded: Joi.array().empty().items(this.priceIncludedSchema),
    priceExcluded: Joi.array().empty().items(this.priceExcludedSchema),
    basicInfo: Joi.object()
      .keys({
        availableFrom: Joi.date().min("now").required(),
        propertyType: Joi.string()
          .valid("Room", "Flat", "Seat", "House", "Apartment", "Floor")
          .required(),
        bedRoom: Joi.number().optional(),
        bathRoom: Joi.number().optional(),
        balcony: Joi.number().optional(),
        floor: Joi.number().optional(),
        gender: Joi.string().valid("Male", "Female", "Anyone").optional(),
        size: Joi.number().optional(),
        parking: Joi.number().optional(),
      })
      .required(),
    mobileNumber: Joi.string().required(),
    alternativeMobileNumber: Joi.string().required(),
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

  public updatePriceExludedAddedSchema = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    priceFor: Joi.string()
      .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
      .optional(),
  });
  // update property excluded updated part validator schema
  public updatePriceExludedUpdatedSchema = Joi.object({
    id: Joi.number().required,
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    priceFor: Joi.string()
      .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
      .optional(),
  });

  // update property validator schema
  public updatePropertySchema = Joi.object({
    title: Joi.string().optional(),
    shortAddress: Joi.string().optional(),
    summary: Joi.string().optional(),
    areaId: Joi.number().optional(),
    availableFrom: Joi.date().min("now").optional(),
    rent: Joi.number().optional(),
    category: Joi.string()
      .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
      .optional(),
    rentFor: Joi.string()
      .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
      .optional(),
    priceIncluded: Joi.object({
      added: Joi.array().items(Joi.string().required()).optional(),
      deleted: Joi.array().items(Joi.number().required()).optional(),
    }).optional(),
    priceExluded: Joi.object({
      added: Joi.array().items(this.updatePriceExludedAddedSchema).optional(),
      deleted: Joi.array().items(Joi.number().required()).optional(),
      updated: Joi.array()
        .items(this.updatePriceExludedUpdatedSchema)
        .optional(),
    }).optional(),
    basicInfo: Joi.object()
      .keys({
        availableFrom: Joi.date().optional(),
        propertyType: Joi.string()
          .valid("Room", "Flat", "Seat", "House", "Apartment", "Floor")
          .optional(),
        bedRoom: Joi.number().optional(),
        bathRoom: Joi.number().optional(),
        balcony: Joi.number().optional(),
        floor: Joi.number().optional(),
        gender: Joi.string().valid("Male", "Female", "Anyone").optional(),
        size: Joi.number().optional(),
        parking: Joi.number().optional(),
      })
      .optional(),
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
    isDeleted: Joi.boolean().optional(),
  });

  // id in params validator
  public paramsIdValidatorSchema = Joi.object({
    id: Joi.number().required(),
  });
}

export default MemberPropertyValidator;
