import Contact from "../db/models/Contact.js";
import calcPaginationData from "../utils/calcPaginationData.js";
import { sortOrderList } from "../constants/index.js";
import { contactFieldList } from '../constants/contacts-constants.js';

export const getContacts = async ({ filter, page, perPage, sortBy = contactFieldList[0], sortOrder = sortOrderList[0] }) => {
    const skip = (page - 1) * perPage;

    const databaseQuery = Contact.find();

    if(filter.userId) {
        databaseQuery.where("userId").equals(filter.userId);
    }
    if (filter.type) {
        databaseQuery.where("contactType").equals(filter.contactType);
    }
    if (filter.favorite) {
        databaseQuery.where("isFavourite").equals(filter.isFavourite);
    }

    const items = await databaseQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
    const totalItems = await Contact.find().merge(databaseQuery).countDocuments();
    const { totalPages, hasNextPage, hasPrevPage } = calcPaginationData({ total: totalItems, perPage, page });

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

export const getContactById = filter => Contact.findOne(filter);

export const addContact = data => Contact.create(data);

export const upsertContact = async (filter, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(filter, data, {
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

export const deleteContact = filter => Contact.findOneAndDelete(filter);
