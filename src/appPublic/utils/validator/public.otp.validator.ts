import Joi from "joi";

class PublicOtpValidator {
  // send otp body validator

  public sendOtpSchema = Joi.object({
    email: Joi.string().email().required(),
    type: Joi.string()
      .valid("Reset_Member", "Reset_Admin", "Verify_Member", "Verify_Admin")
      .required(),
  });

  // match otp body validator
  public matchOtpSchema = Joi.object({
    email: Joi.string().email().required(),
    type: Joi.string()
      .valid("Reset_Member", "Reset_Admin", "Verify_Member", "Verify_Admin")
      .required(),
    otp: Joi.string().length(6).required(),
  });
}
export default PublicOtpValidator;
