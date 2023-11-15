import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IReview } from './review.interface';
import { ReviewService } from './review.service';
import { reviewFilterableFields } from './review.constant';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...ReviewData } = req.body;
  const result = await ReviewService.createReview(ReviewData);
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewService.getSingleReview(id);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully !',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ReviewService.getAllReviews(filters, paginationOptions);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await ReviewService.updateReview(id, updatedData);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully !',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewService.deleteReview(id);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully !',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getSingleReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
