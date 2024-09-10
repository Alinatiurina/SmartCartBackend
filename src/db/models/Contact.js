import { Schema, model } from "mongoose";
import { mongooseSaveError, setUpdateSettings } from "./hooks.js";
import { typeList, lengthValidator } from "../../constants/contacts-constants.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        match: lengthValidator,
    },
    phoneNumber: {
        type: String,
        required: true,
        match: lengthValidator,
    },
    email: {
        type: String,
        required: false,
        match: lengthValidator,
    },
    isFavourite: Boolean,
    contactType: {
        type: String,
        enum: typeList,
        default: 'personal',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", mongooseSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateSettings);

contactSchema.post("findOneAndUpdate", mongooseSaveError);

const Contact = model("Contact", contactSchema);

export default Contact;