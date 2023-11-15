/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Feedback } from './feedback.model';
import { IFeedback, IFeedbackFilter } from './feedback.interface';
import { feedbackSearchableFields } from './feedback.constant';

const createFeedback = async (
  feedback: IFeedback,
): Promise<IFeedback | null> => {
  const result = await Feedback.create(feedback);
  return result;
};

const getSingleFeedback = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findOne({ _id: id }).populate('customerId');

  return result;
};
const getAllFeedbacks = async (
  filters: IFeedbackFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFeedback[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: feedbackSearchableFields.map(field => ({
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

  const result = await Feedback.find(whereConditions)
    .populate('customerId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Feedback.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateFeedback = async (
  id: string,
  payload: Partial<IFeedback>,
): Promise<IFeedback | null> => {
  const result = await Feedback.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFeedback = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findOneAndDelete({ _id: id });
  return result;
};
export const FeedbackService = {
  createFeedback,
  getSingleFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
};
