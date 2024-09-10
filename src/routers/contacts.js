import express from 'express';
import { getAllContactsController, getContactByIdController, addContactController, patchContactController, deleteContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import isValid from '../middlewares/isValidId.js';
import { contactAddSchema, contactUpdateSchema } from '../validation/contact-schemas.js';
import authenticate from '../middlewares/authenticate.js';

const contactRouter = express.Router();

contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getAllContactsController));
contactRouter.get("/:id", isValid, ctrlWrapper(getContactByIdController));
contactRouter.post("/", validateBody(contactAddSchema), ctrlWrapper(addContactController));
contactRouter.patch("/:id", isValid, validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));
contactRouter.delete("/:id", isValid, ctrlWrapper(deleteContactController));

export default contactRouter;
