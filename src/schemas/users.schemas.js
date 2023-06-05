import Joi from 'joi'

export const usersSchema = Joi.object({
  userName: Joi.string().required()
})
