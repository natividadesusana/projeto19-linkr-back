import Joi from "joi";

export const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    pictureUrl: Joi.string().uri().required()
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});