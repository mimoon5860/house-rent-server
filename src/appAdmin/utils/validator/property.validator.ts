import Joi from "joi";
// Login validator schema
class PropertyValidator {
  // create property attribute validator
  public createPropertyAttribute = Joi.object({
    attributeName: Joi.string().required(),
  });
}

export default PropertyValidator;
