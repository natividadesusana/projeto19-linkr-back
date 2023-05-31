import Joi from "joi";

export const postsSchema = Joi.object({
  url: Joi.string().uri().required(),
  description: Joi.string().allow("").optional(),
});
