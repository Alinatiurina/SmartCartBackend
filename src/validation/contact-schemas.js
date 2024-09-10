import Joi from "joi";

import { typeList, lengthValidator } from "../constants/contacts-constants.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().required().pattern(lengthValidator),
    phoneNumber: Joi.string().pattern(lengthValidator).required(),
    email: Joi.string().pattern(lengthValidator),
    isFavourite: Joi.boolean,
    contactType: Joi.string().valid(...typeList),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string().pattern(lengthValidator),
    phoneNumber: Joi.string().pattern(lengthValidator),
    email: Joi.string().pattern(lengthValidator),
    sFavourite: Joi.boolean,
    contactType: Joi.string().valid(...typeList),
});