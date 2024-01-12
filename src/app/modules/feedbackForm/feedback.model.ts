import { FeedbackModel, IFeedback } from './feedback.interface';
import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    comment: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerImage: {
      type: String,
    },
    rating: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
export const Feedback = model<IFeedback, FeedbackModel>(
  'Feedback',
  FeedbackSchema,
);
