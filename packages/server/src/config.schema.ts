import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
   MONGO_URI: Joi.string().required(),
   JWT_EXPIRE: Joi.string().required(),
   JWT_SECRET: Joi.string().required(),
   JWT_REFRESH_SECRET: Joi.string().required(),
});
