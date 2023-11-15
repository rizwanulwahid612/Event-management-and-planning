import { Model, Types } from 'mongoose';
import { ICustomer } from '../customer/customer.interface';
import { ICategory } from '../category/category.interface';
import { IAdmin } from '../admin/admin.interface';

export type IBookingRequest = {
  // categoryName: string | ICategory;
  categoryId: Types.ObjectId | ICategory | string;
  startTime: string;
  endTime: string;
  apointmentdaysInWeek?:
    | 'SATURDAY TO THURSDAY'
    | 'SUNDAY TO WEDNESDAY'
    | 'MONDAY TO THURSDAY'
    | 'TUESDAY TO FRIDAY'
    | 'WEDNESDAY TO SATURDAY '
    | 'THURSDAY TO SUNDAY'
    | 'FRIDAY TO MONDAY'
    | '7 DAYS';
  isDeleted?: false;
};
export type IBooking = {
  id: string;
  role?: string;
  customerID: Types.ObjectId | ICustomer;
  serviceIDs: IBookingRequest[];
  isConfirm?: false;
  adminID?: Types.ObjectId | IAdmin;
  notification?: { message: string }[];
};
export type BookingModel = Model<IBooking, Record<string, unknown>>;

export type IBookingFilterRequest = {
  searchTerm?: string | undefined;
  // customerID?: string;
};
