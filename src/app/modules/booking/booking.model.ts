import { Schema, model } from 'mongoose';
import { BookingModel, IBooking, IBookingRequest } from './booking.interface';

const BookingRequestSchema = new Schema<IBookingRequest>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  bookimage: {
    type: String,
  },
  apointmentdaysInWeek: {
    type: String,
    enum: [
      'SATURDAY TO THURSDAY',
      'SUNDAY TO WEDNESDAY',
      'MONDAY TO THURSDAY',
      'TUESDAY TO FRIDAY',
      'WEDNESDAY TO SATURDAY',
      'THURSDAY TO SUNDAY',
      'FRIDAY TO MONDAY',
      '7 DAYS',
    ],
    isDeleted: {
      type: Boolean,
    },
  },
});

const BookingSchema = new Schema<IBooking, BookingModel>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    customerID: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    serviceIDs: {
      type: [BookingRequestSchema], // This is an array of subdocuments
      required: true,
    },
    adminID: {
      type: Schema.Types.ObjectId,
      ref: 'Admin', // Assuming you have an 'Admin' model
    },
    isConfirm: {
      type: Boolean,
      // required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<IBooking, BookingModel>('Booking', BookingSchema);
