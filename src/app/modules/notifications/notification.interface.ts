import { Model, Types } from 'mongoose';
import { ICustomer } from '../customer/customer.interface';
//import { IService } from '../service/service.interface';
import { IBooking } from '../booking/booking.interface';
import { IAdmin } from '../admin/admin.interface';

export type INotification = {
  customerId?: Types.ObjectId | ICustomer;
  adminId?: Types.ObjectId | IAdmin;
  bookingId?: Types.ObjectId | IBooking;
  alartmessage: string;
};
export type NotificationModel = Model<INotification, Record<string, unknown>>;

export type INotificationFilter = {
  searchTerm?: string | undefined;
  customerId?: Types.ObjectId | ICustomer;
  adminId?: Types.ObjectId | IAdmin;
  bookingId?: Types.ObjectId | IBooking;
};
