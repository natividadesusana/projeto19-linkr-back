import Joi from "joi";

export const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    picture_url: Joi.string().uri().required()
});