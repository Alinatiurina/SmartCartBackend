import { getContacts, getContactById, addContact, upsertContact, deleteContact } from "../services/contact-service.js";
import createHttpError from 'http-errors';
import parsePaginationParams from "../utils/parsePaginationParams.js";
import parseSortParams from "../utils/parseSortParams.js";
import { contactFieldList } from '../constants/contacts-constants.js';
import parseContactFitlerParams from "../utils/parseContactFilterParams.js";

export const getAllContactsController = async (req, res) => {  
    const { _id: userId } = req.user;
    const { query } = req;
    const { page, perPage } = parsePaginationParams(query);
    const { sortBy, sortOrder } = parseSortParams(query, contactFieldList);
    const filter = { ...parseContactFitlerParams(query), userId };

    const data = await getContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getContactByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const data = await getContactById({ _id: id, userId });;

    if (!data) {
        throw createHttpError(404, `Contact with id ${id} not found`);
    }
    res.json({
        status: 200,
        message: `Successfully found contact id=${id}!`,
        data,
    });
};

export const addContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const data = await addContact({ ...req.body, userId });
    
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data,
    });
};

export const patchContactController = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const result = await upsertContact({ _id: id ,  userId }, req.body);

    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.data,
    });
};

export const deleteContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const result = await deleteContact({ _id: id,  userId  });
    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(204).send();
};