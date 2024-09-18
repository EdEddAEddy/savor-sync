import joi from "joi";

export const schemaCreateUser = joi.object({
  username: joi.string().required().messages({
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
});