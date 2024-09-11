import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import { typeList, lengthValidator } from '../../constants/goods-constants.js';

const GoodSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      match: lengthValidator,
    },
    quantity: {
      type: String,
      required: true,
      match: lengthValidator,
    },
    unit: {
      type: String,
      required: false,
      match: lengthValidator,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

GoodSchema.post('save', mongooseSaveError);

GoodSchema.pre('findOneAndUpdate', setUpdateSettings);

GoodSchema.post('findOneAndUpdate', mongooseSaveError);

const Good = model('Good', GoodSchema);

export default Good;
