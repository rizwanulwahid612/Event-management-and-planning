import { Schema, model } from 'mongoose';
import { CategoryModel, ICategory } from './category.interface';

const CategorySchema = new Schema<ICategory, CategoryModel>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    serviceID: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    reviewIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Category = model<ICategory, CategoryModel>(
  'Category',
  CategorySchema,
);
