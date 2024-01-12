import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';

export type IPost = {
  adminId: Types.ObjectId | IAdmin;
  imagepost?: string;
  comment: string;
};
export type PostModel = Model<IPost, Record<string, unknown>>;

export type IPostFilter = {
  searchTerm?: string | undefined;
  adminId?: Types.ObjectId | IAdmin;
};
