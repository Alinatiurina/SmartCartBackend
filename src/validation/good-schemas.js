import Joi from 'joi';

import { typeList, lengthValidator } from '../constants/goods-constants.js';

export const goodAddSchema = Joi.object({
  title: Joi.string().required().pattern(lengthValidator),
  quantity: Joi.string().pattern(lengthValidator).required(),
  unit: Joi.string().pattern(lengthValidator),
  category: Joi.string().valid(...typeList),
});

export const goodUpdateSchema = Joi.object({
  title: Joi.string().pattern(lengthValidator),
  quantity: Joi.string().pattern(lengthValidator),
  unit: Joi.string().pattern(lengthValidator),
  category: Joi.string().valid(...typeList),
});
