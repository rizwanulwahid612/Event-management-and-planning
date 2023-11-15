/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { INotification, INotificationFilter } from './notification.interface';
import { Notification } from './notification.model';
import { notificationSearchableFields } from './notification.constant';

const createNotification = async (
  notification: INotification,
): Promise<INotification | null> => {
  const result = await Notification.create(notification);
  return result;
};

const getSingleNotification = async (
  id: string,
): Promise<INotification | null> => {
  const result = await Notification.findOne({ _id: id })
    .populate('adminId')
    .populate('customerId')
    .populate('bookingId');
  return result;
};
const getAllNotifications = async (
  filters: INotificationFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<INotification[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: notificationSearchableFields.map(field => ({
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

  const result = await Notification.find(whereConditions)
    .populate('adminId')
    .populate('customerId')
    .populate('bookingId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Notification.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateNotification = async (
  id: string,
  payload: Partial<INotification>,
): Promise<INotification | null> => {
  const result = await Notification.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteNotification = async (
  id: string,
): Promise<INotification | null> => {
  const result = await Notification.findOneAndDelete({ _id: id });
  return result;
};
export const NotificationService = {
  createNotification,
  getSingleNotification,
  getAllNotifications,
  updateNotification,
  deleteNotification,
};
