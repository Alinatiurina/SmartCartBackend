import Good from '../db/models/Good.js';
import calcPaginationData from '../utils/calcPaginationData.js';
import { sortOrderList } from '../constants/index.js';
import { goodsFieldList } from '../constants/goods-constants.js';

export const getGoods = async ({
  filter,
  page,
  perPage,
  sortBy = goodsFieldList[0],
  sortOrder = sortOrderList[0],
}) => {
  const skip = (page - 1) * perPage;

  const databaseQuery = Good.find();

  if (filter.userId) {
    databaseQuery.where('userId').equals(filter.userId);
  }
  if (filter.type) {
    databaseQuery.where('GoodType').equals(filter.GoodType);
  }
  if (filter.favorite) {
    databaseQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const items = await databaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await Good.find().merge(databaseQuery).countDocuments();
  const { totalPages, hasNextPage, hasPrevPage } = calcPaginationData({
    total: totalItems,
    perPage,
    page,
  });

  return {
    items,
    totalItems,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

export const getGoodById = (filter) => Good.findOne(filter);

export const addGood = (data) => Good.create(data);

export const upsertGood = async (filter, data, options = {}) => {
  const result = await Good.findOneAndUpdate(filter, data, {
    // new: true,
    // upsert: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result?.lastErrorObject?.upserted);

  return {
    data: result.value,
    isNew,
  };
};

export const deleteGood = (filter) => Good.findOneAndDelete(filter);
