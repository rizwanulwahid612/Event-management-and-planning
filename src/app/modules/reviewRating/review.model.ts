import { IReview, ReviewModel } from './review.interface';
import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema<IReview, ReviewModel>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Review = model<IReview, ReviewModel>('Review', ReviewSchema);
