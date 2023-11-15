/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICategory, ICategoryFilterRequest } from './category.interface';
import { Category } from './category.model';
import { categorySearchableFields } from './category.constant';
//import { Review } from '../reviewRating/review.model';
// import { Review } from '../reviewRating/review.model';
// import { IReview } from '../reviewRating/review.interface';

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const findLastCategoryId = async (): Promise<string | undefined> => {
  const lastCategory = await Category.findOne(
    {
      role: 'category',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastCategory?.id ? lastCategory.id.substring(9) : undefined;
};

export const generateCategoryId = async (): Promise<string> => {
  const currentId =
    (await findLastCategoryId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `Category-${incrementedId}`;

  return incrementedId;
};

const createCategory = async (
  category: ICategory,
): Promise<ICategory | null> => {
  const id = await generateCategoryId();
  category.id = id;

  const result = await Category.create(category);
  return result;
};
const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findOne({ _id: id }).populate('reviewIds');
  // const categoryIdFindAtReview = await Review.findOne({ categoryId: id });
  // if (result === categoryIdFindAtReview) {
  //   return await Category.findOne({ _id: id }).populate('reviewIds');
  // } else {
  return result;
};
const getAllCategories = async (
  filters: ICategoryFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICategory[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: categorySearchableFields.map(field => ({
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

  const result = await Category.find(whereConditions)
    .populate('reviewIds')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateCategory = async (
  id: string,
  payload: Partial<ICategory>,
): Promise<ICategory | null> => {
  const result = await Category.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deletecategory = async (id: string): Promise<ICategory | null> => {
  const category = await Category.findOneAndDelete({ id });
  //delete user
  // await User.deleteOne({ id });
  return category;
};
export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deletecategory,
};
