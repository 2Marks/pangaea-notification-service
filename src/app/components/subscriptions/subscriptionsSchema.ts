import Joi from "joi";

export const createSubscriptionSchema = Joi.object({
  topic: Joi.string().required(),
  url: Joi.string().required(),
});

export const publishMessageSchema = Joi.object({
  topic: Joi.string().required(),
  data: Joi.object().required(),
});
