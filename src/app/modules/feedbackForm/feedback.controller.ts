import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IFeedback } from './feedback.interface';
import { FeedbackService } from './feedback.service';
import { feedbackFilterableFields } from './feedback.constant';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const { ...FeedbackData } = req.body;
  const result = await FeedbackService.createFeedback(FeedbackData);
  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback created successfully',
    data: result,
  });
});

const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FeedbackService.getSingleFeedback(id);

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback fetched successfully !',
    data: result,
  });
});

const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, feedbackFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FeedbackService.getAllFeedbacks(
    filters,
    paginationOptions,
  );

  sendResponse<IFeedback[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await FeedbackService.updateFeedback(id, updatedData);

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback updated successfully !',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FeedbackService.deleteFeedback(id);

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback deleted successfully !',
    data: result,
  });
});

export const FeedbackController = {
  createFeedback,
  getSingleFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
};
