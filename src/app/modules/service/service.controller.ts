import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.service';
import { IService } from './service.interface';
import { serviceFilterableFields } from './service.constant';

const createService = catchAsync(async (req: Request, res: Response) => {
  const { ...serviceData } = req.body;
  const result = await ServiceService.createService(serviceData);

  if (result) {
    // Service was created successfully
    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service created successfully',
      data: result,
    });
  } else {
    // Service with the same categoryIds already exists
    sendResponse<IService>(res, {
      statusCode: httpStatus.CONFLICT, // Use an appropriate HTTP status code for a conflict
      success: false,
      message:
        'Service with the same categoryIds exists or not create any category Id before',
      data: null,
    });
  }
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ServiceService.getSingleService(id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully !',
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceService.getAllServices(
    filters,
    paginationOptions,
  );

  sendResponse<IService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await ServiceService.updateService(id, updatedData);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully !',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ServiceService.deleteService(id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully !',
    data: result,
  });
});

export const ServiceController = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
};
