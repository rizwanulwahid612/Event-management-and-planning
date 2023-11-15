/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IPost, IPostFilter } from './post.interface';
import { Post } from './post.model';
import { postSearchableFields } from './post.constant';
import { Customer } from '../customer/customer.model';

const createPost = async (post: IPost): Promise<IPost | null> => {
  // const result = await Post.create(post);
  // // Update the customer notifications
  // const customers = await Customer.find({});
  // for (const customer of customers) {
  //   // Customize the notification message
  //   const notificationMessage = `New post created: ${post.comment}`;
  //   customer.notification.push(notificationMessage);
  //   await customer.save();
  // }
  const result = await Post.create(post);

  // Create a notification message for the new post
  const notificationMessage = `New post created: ${post.comment}`;

  // Update the customer notifications
  const customers = await Customer.find({});
  for (const customer of customers) {
    // Push the notification message to the 'notification' array
    customer?.notification?.push({ message: notificationMessage });
    await customer.save();
  }

  return result;
};

const getSinglePost = async (id: string): Promise<IPost | null> => {
  const result = await Post.findOne({ _id: id }).populate('adminId');

  return result;
};
const getAllPosts = async (
  filters: IPostFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IPost[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: postSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Post.find(whereConditions)
    .populate('adminId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updatePost = async (
  id: string,
  payload: Partial<IPost>,
): Promise<IPost | null> => {
  const result = await Post.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deletePost = async (id: string): Promise<IPost | null> => {
  const result = await Post.findOneAndDelete({ _id: id });
  return result;
};
export const PostService = {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
};
