import Joi from "joi";
// Login validator schema
class AuthValidator {
  // login validator
  public loginValidatorSchema = Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().min(8).max(20).required(),
  });

  // registration validator
  public registrationValidatorSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().required(),
    password: Joi.string().required().min(8),
    address: Joi.string().optional(),
    areaId: Joi.number().optional(),
  });
}

export default AuthValidator;
