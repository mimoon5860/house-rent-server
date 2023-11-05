import Joi from "joi";
class MemberValidator {
  public changePassword = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
  });

  public updateProfile = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    mobileNumber: Joi.string().optional(),
    address: Joi.string().optional(),
    areaId: Joi.number().optional(),
  });
}
export default MemberValidator;
