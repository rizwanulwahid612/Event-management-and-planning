import { Model } from 'mongoose';
//import { IService } from '../service/service.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};
export type ICustomer = {
  id: string;
  name: UserName;
  profileImage?: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'Male' | 'Female' | 'Others';
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  notification?: { message: string }[];
  booking?: string[];
};
export type CustomerModel = Model<ICustomer, Record<string, unknown>>;

export type ICustomerFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'Male' | 'Female' | 'Others';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
};
