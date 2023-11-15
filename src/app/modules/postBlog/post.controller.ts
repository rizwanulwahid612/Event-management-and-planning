import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PostService } from './post.service';
import { IPost } from './post.interface';
import { postFilterableFields } from './post.constant';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const { ...PostData } = req.body;
  const result = await PostService.createPost(PostData);
  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created successfully',
    data: result,
  });
});

const getSinglePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PostService.getSinglePost(id);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post fetched successfully !',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, postFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PostService.getAllPosts(filters, paginationOptions);

  sendResponse<IPost[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedPost = req.body;

  const result = await PostService.updatePost(id, updatedPost);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully !',
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PostService.deletePost(id);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully !',
    data: result,
  });
});

export const PostController = {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
};
