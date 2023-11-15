import { Schema, model } from 'mongoose';
import { CustomerModel, ICustomer } from './customer.interface';

const CustomerSchema = new Schema<ICustomer, CustomerModel>(
  {
    id: {
      type: String,
      required: false,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: false,
        },
        lastName: {
          type: String,
          required: false,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: false,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Others'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: {
      type: String,
      unique: true,
      required: false,
    },
    contactNo: {
      type: String,
      unique: true,
      required: false,
    },
    emergencyContactNo: {
      type: String,
      required: false,
    },
    presentAddress: {
      type: String,
      required: false,
    },
    permanentAddress: {
      type: String,
      required: false,
    },
    // notification: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Notification',
    //   },
    // ],
    notification: [
      {
        message: {
          type: String,
        },
      },
    ],
    booking: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Customer = model<ICustomer, CustomerModel>(
  'Customer',
  CustomerSchema,
);
