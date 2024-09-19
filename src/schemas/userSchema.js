import joi from "joi";

export const schemaCreateUser = joi.object({
  name: joi.string().required().messages({
    "any.required": "username field is required",
    "string.empty": "username field is required",
  }),

  email: joi.string().email().required().messages({
    "string.email": "Email field invalid format",
    "any.required": "Email field is required",
    "string.empty": "Email field is required",
  }),

  password: joi.string().required().messages({
    "any.required": "password field is required",
    "string.empty": "password field is required",
  }),

  phone: joi.string()
  .pattern(/^(?:\+55\s?)?(?:\(?[0-9]{2}\)?\s?[9]?[0-9]{8})$/)
  .required()
  .messages({
    "any.required": "phone field is required",
    "string.empty": "phone field is required",
    "string.pattern.base": "phone must be a valid phone number",
  }),
});