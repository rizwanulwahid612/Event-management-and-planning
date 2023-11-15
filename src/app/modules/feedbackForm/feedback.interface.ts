import { Model, Types } from 'mongoose';
import { ICustomer } from '../customer/customer.interface';

export type IFeedback = {
  customerId: Types.ObjectId | ICustomer;
  comment: string;
};
export type FeedbackModel = Model<IFeedback, Record<string, unknown>>;

export type IFeedbackFilter = {
  searchTerm?: string | undefined;
  customerId?: Types.ObjectId | ICustomer;
};
