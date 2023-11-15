/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IReview, IReviewFilter } from './review.interface';
import { Review } from './review.model';
import { reviewSearchableFields } from './review.constant';
import { Category } from '../category/category.model';
import { ICategory } from '../category/category.interface';

const createReview = async (review: IReview): Promise<IReview | null> => {
  const result = await Review.create(review);
  await Category.updateOne(
    { _id: review.categoryId },
    { $push: { reviewIds: result._id } },
  );
  return result;
};

const getSingleReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findOne({ _id: id })
    .populate('customerId')
    .populate('categoryId');
  return result;
};
const getReviewByCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findOne({ _id: id })
    .populate('customerId')
    .populate('categoryId');
  return result;
};
const getAllReviews = async (
  filters: IReviewFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IReview[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: reviewSearchableFields.map(field => ({
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

  const result = await Review.find(whereConditions)
    .populate('customerId')
    .populate('categoryId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateReview = async (
  id: string,
  payload: Partial<IReview>,
): Promise<IReview | null> => {
  const result = await Review.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findOneAndDelete({ _id: id });
  return result;
};
export const ReviewService = {
  createReview,
  getSingleReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewByCategory,
};
