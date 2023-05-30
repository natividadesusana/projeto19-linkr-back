import Joi from "joi";

export const postsSchema = Joi.object({
  url: Joi.string().required(),
  description: Joi.string().optional(),
});
