import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CustomerService } from './customer.service';
import { ICustomer } from './customer.interface';
import { customerFilterableFields } from './customer.constant';
// import { IBooking, IBookingRequest } from '../booking/booking.interface';

// const createBookingRequest = catchAsync(async (req: Request, res: Response) => {
//   const {
//     customerID,
//     bookingRequest,
//   }: { customerID: string; bookingRequest: IBookingRequest } = req.body; // Assuming the data is passed in the request body

//   // Call the service function to create the booking request
//   const result = await CustomerService.createBookingRequest(
//     customerID,
//     bookingRequest,
//   );

//   if (result) {
//     sendResponse<IBooking>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Booking request created successfully',
//       data: result,
//     });
//   } else {
//     sendResponse<IBooking>(res, {
//       statusCode: httpStatus.BAD_REQUEST,
//       success: false,
//       message: 'Failed to create booking request',
//       data: null,
//     });
//   }
// });

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { ...PostData } = req.body;
  const result = await CustomerService.createCustomer(PostData);
  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});
const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CustomerService.getSingleCustomer(id);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer fetched successfully !',
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CustomerService.getAllCustomers(
    filters,
    paginationOptions,
  );

  sendResponse<ICustomer[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customers fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await CustomerService.updateCustomer(id, updatedData);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer updated successfully !',
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CustomerService.deleteCustomer(id);

  sendResponse<ICustomer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer deleted successfully !',
    data: result,
  });
});

export const CustomerController = {
  // createBookingRequest,
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
