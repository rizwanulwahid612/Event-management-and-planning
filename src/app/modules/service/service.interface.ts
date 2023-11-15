import { Model } from 'mongoose';
export type IService = {
  id: string;
  role: string;
  name: string;
  price: string;
  details: string;
  location: string;
  profileImage: string;
  startTime?: string;
  endTime?: string;
  apointmentdaysInWeek?:
    | 'SATURDAY TO THURSDAY'
    | 'SUNDAY TO WEDNESDAY'
    | 'MONDAY TO THURSDAY'
    | 'TUESDAY TO FRIDAY'
    | 'WEDNESDAY TO SATURDAY '
    | 'THURSDAY TO SUNDAY'
    | 'FRIDAY TO MONDAY';
  categoryIds: string[];
};
export type ServiceModel = Model<IService, Record<string, unknown>>;

export type IServiceFilterRequest = {
  searchTerm?: string | undefined;
  id?: string;
  name?: string;
  price?: string;
  startTime?: string;
  endTime?: string;
  category?: string;
  location?: string;
};
