import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { INotification } from './notification.interface';
import { NotificationService } from './notification.service';
import { notificationFilterableFields } from './notification.constant';

const createNotification = catchAsync(async (req: Request, res: Response) => {
  const { ...NotificationData } = req.body;
  const result = await NotificationService.createNotification(NotificationData);
  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification created successfully',
    data: result,
  });
});

const getSingleNotification = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await NotificationService.getSingleNotification(id);

    sendResponse<INotification>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification fetched successfully !',
      data: result,
    });
  },
);

const getAllNotifications = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, notificationFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await NotificationService.getAllNotifications(
    filters,
    paginationOptions,
  );

  sendResponse<INotification[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateNotification = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await NotificationService.updateNotification(id, updatedData);

  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification updated successfully !',
    data: result,
  });
});

const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await NotificationService.deleteNotification(id);

  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification deleted successfully !',
    data: result,
  });
});

export const NotificationController = {
  createNotification,
  getSingleNotification,
  getAllNotifications,
  updateNotification,
  deleteNotification,
};
