import { Model, Types } from 'mongoose';
import { ICustomer } from '../customer/customer.interface';
import { IService } from '../service/service.interface';

export type IReview = {
  customerId: Types.ObjectId | ICustomer;
  categoryId: Types.ObjectId | IService;
  rating: string;
  comment: string;
};
export type ReviewModel = Model<IReview, Record<string, unknown>>;

export type IReviewFilter = {
  searchTerm?: string | undefined;
  customerId?: Types.ObjectId | ICustomer;
  serviceId?: Types.ObjectId | IService;
  rating?: string;
};
