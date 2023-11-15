import { FeedbackModel, IFeedback } from './feedback.interface';
import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
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
export const Feedback = model<IFeedback, FeedbackModel>(
  'Feedback',
  FeedbackSchema,
);
