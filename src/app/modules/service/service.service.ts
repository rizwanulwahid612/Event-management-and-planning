/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { serviceSearchableFields } from './service.constant';
import { IService, IServiceFilterRequest } from './service.interface';
import { Service } from './service.model';
import { Category } from '../category/category.model';

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
export const findLastServiceId = async (): Promise<string | undefined> => {
  const lastService = await Service.findOne(
    {
      role: 'service',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastService?.id ? lastService.id.substring(8) : undefined;
};

export const generateServiceId = async (): Promise<string> => {
  const currentId =
    (await findLastServiceId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `Service-${incrementedId}`;

  return incrementedId;
};
const createService = async (service: IService): Promise<IService | null> => {
  const { categoryIds } = service;
  let createNewService = true;

  await asyncForEach(categoryIds, async (categoryId: string) => {
    const alreadyExist = await Service.findOne({ categoryIds: categoryId });
    const categoryExists = await Category.exists({ _id: categoryId });
    if (alreadyExist || !categoryExists) {
      createNewService = false;
    }
  });

  if (createNewService) {
    const id = await generateServiceId();
    service.id = id;
    const result = await Service.create(service);
    console.log(result);
    return result;
  } else {
    return null;
  }
};

const getSingleService = async (id: string): Promise<IService | null> => {
  const result = await Service.findOne({ id }).populate('categoryIds');
  return result;
};
const getAllServices = async (
  filters: IServiceFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IService[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: serviceSearchableFields.map(field => ({
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

  const result = await Service.find(whereConditions)
    .populate('categoryIds')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Service.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateService = async (
  id: string,
  payload: Partial<IService>,
): Promise<IService | null> => {
  const result = await Service.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteService = async (id: string): Promise<IService | null> => {
  const service = await Service.findOneAndDelete({ id });
  return service;
};
export const ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
