import { INotification, NotificationModel } from './notification.interface';
import { Schema, model } from 'mongoose';

const NotificationSchema = new Schema<INotification, NotificationModel>(
  {
    // _id: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: false,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: false,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: false,
    },
    alartmessage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Notification = model<INotification, NotificationModel>(
  'Notification',
  NotificationSchema,
);
