import Joi from "joi";

class PublicPropertyValidator {
  // Get property query validator schema
  public getPropertyQueryValidatorSchema = Joi.object({
    limit: Joi.number().optional(),
    skip: Joi.number().optional(),
    category: Joi.string()
      .optional()
      .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop"),
    area: Joi.string().optional(),
    thana: Joi.string().optional(),
    district: Joi.string().optional(),
    division: Joi.string().optional(),
    title: Joi.string().optional(),
  });

  // get single property schema
  public getSinglePropertyQuerySchema = Joi.object({
    memberId: Joi.number().optional(),
  });

  // id in params validator
  public paramsIdValidatorSchema = Joi.object({
    id: Joi.number().required(),
  });
}
export default PublicPropertyValidator;
