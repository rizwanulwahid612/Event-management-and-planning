/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { ICustomer, ICustomerFilters } from './customer.interface';
import { Customer } from './customer.model';
import { customerSearchableFields } from './customer.constant';

const createCustomer = async (post: ICustomer): Promise<ICustomer | null> => {
  const result = await Customer.create(post);
  return result;
};

const getSingleCustomer = async (id: string): Promise<ICustomer | null> => {
  const result = await Customer.findOne({ id })
    .populate('notification')
    .populate('booking');
  return result;
};

const getAllCustomers = async (
  filters: ICustomerFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICustomer[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: customerSearchableFields.map(field => ({
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

  const result = await Customer.find(whereConditions)
    .populate('notification')
    .populate('booking')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Customer.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateCustomer = async (
  id: string,
  payload: Partial<ICustomer>,
): Promise<ICustomer | null> => {
  const isExist = await Customer.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer is not found !');
  }

  const { name, ...customerData } = payload;

  const updatedCustomerData: Partial<ICustomer> = { ...customerData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<ICustomer>;
      (updatedCustomerData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Customer.findOneAndUpdate({ id }, updatedCustomerData, {
    new: true,
  });
  return result;
};
const deleteCustomer = async (id: string): Promise<ICustomer | null> => {
  // Check if the admin exists
  const isExist = await Customer.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found!');
  }

  // eslint-disable-next-line no-useless-catch
  try {
    // Delete the admin
    const admin = await Customer.findOneAndDelete({ id });

    if (!admin) {
      throw new ApiError(404, 'Customer not found');
    }

    // Delete the related user
    await User.deleteOne({ id });

    return admin;
  } catch (error: any) {
    // Handle errors appropriately
    throw error.message;
  }
};
// const deleteCustomer = async (id: string): Promise<ICustomer | null> => {
//   // check if the faculty is exist
//   const isExist = await Customer.findOne({ id });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Customer is not found !');
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     //delete student first
//     const customer = await Customer.findOneAndDelete({ id }, { session });
//     if (!customer) {
//       throw new ApiError(404, 'Failed to delete Customer');
//     }
//     //delete user
//     await User.deleteOne({ id });
//     session.commitTransaction();
//     session.endSession();

//     return customer;
//   } catch (error) {
//     session.abortTransaction();
//     throw error;
//   }
// };

export const CustomerService = {
  // createBookingRequest,
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
