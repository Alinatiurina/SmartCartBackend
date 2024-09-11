import {
  getGoods,
  getGoodById,
  addGood,
  upsertGood,
  deleteGood,
} from '../services/good-service.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { goodsFieldList } from '../constants/goods-constants.js';
import parseGoodFitlerParams from '../utils/parseGoodFilterParams.js';

export const getAllGoodsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { query } = req;
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, goodsFieldList);
  const filter = { ...parseGoodFitlerParams(query), userId };

  const data = await getGoods({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found Goods!',
    data,
  });
};

export const getGoodByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const data = await getGoodById({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Good with id ${id} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found good id=${id}!`,
    data,
  });
};

export const addGoodController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await addGood({
    ...req.body,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a good!',
    data,
  });
};

export const patchGoodController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await upsertGood({ _id: id, userId }, req.body);

  if (!result) {
    throw createHttpError(404, 'Good not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a good!',
    data: result.data,
  });
};

export const deleteGoodController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const result = await deleteGood({ _id: id, userId });
  if (!result) {
    throw createHttpError(404, 'Good not found');
  }
  res.status(204).send();
};
