import { Model } from 'mongoose';
export type ICategory = {
  id: string;
  role: string;
  serviceID?: string;
  name: string;
  profileImage: string;
  details: string;
  reviewIds: string[];
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;

export type ICategoryFilterRequest = {
  searchTerm?: string | undefined;
  id?: string;
  name?: string;
  details?: string;
};
