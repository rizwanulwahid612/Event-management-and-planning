import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './service.interface';

const ServiceSchema = new Schema<IService, ServiceModel>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    details: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    apointmentdaysInWeek: {
      type: String,
      enum: [
        'SATURDAY TO THURSDAY',
        'SUNDAY TO WEDNESDAY',
        'MONDAY TO THURSDAY',
        'TUESDAY TO FRIDAY',
        'WEDNESDAY TO SATURDAY ',
        'THURSDAY TO SUNDAY',
        'FRIDAY TO MONDAY',
      ],
    },
    categoryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Service = model<IService, ServiceModel>('Service', ServiceSchema);
