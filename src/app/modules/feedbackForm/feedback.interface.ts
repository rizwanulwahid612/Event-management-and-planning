import { Model } from 'mongoose';
import { ICustomer } from '../customer/customer.interface';

export type IFeedback = {
  customerName: string;
  customerImage: string;
  comment: string;
  rating: string;
};
export type FeedbackModel = Model<IFeedback, Record<string, unknown>>;

export type IFeedbackFilter = {
  searchTerm?: string | undefined;
  customerName?: string | ICustomer;
};
