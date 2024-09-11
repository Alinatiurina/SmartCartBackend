import express from 'express';
import {
  getAllGoodsController,
  getGoodByIdController,
  addGoodController,
  patchGoodController,
  deleteGoodController,
} from '../controllers/goods.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import isValid from '../middlewares/isValidId.js';
import { goodAddSchema, goodUpdateSchema } from '../validation/good-schemas.js';
import authenticate from '../middlewares/authenticate.js';

const goodRouter = express.Router();

goodRouter.use(authenticate);

goodRouter.get('/', ctrlWrapper(getAllGoodsController));
goodRouter.get('/:id', isValid, ctrlWrapper(getGoodByIdController));
goodRouter.post(
  '/',
  // validateBody(goodAddSchema),
  ctrlWrapper(addGoodController),
);
goodRouter.patch(
  '/:id',
  isValid,
  validateBody(goodUpdateSchema),
  ctrlWrapper(patchGoodController),
);
goodRouter.delete('/:id', isValid, ctrlWrapper(deleteGoodController));

export default goodRouter;
