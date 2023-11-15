import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';
import { IBooking } from './booking.interface';
import pick from '../../../shared/pick';
import { bookingFilterableFields } from './booking.constant';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { ...bookingData } = req.body;
  const result = await BookingService.createBooking(bookingData);

  if (result) {
    // Service was created successfully
    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking created successfully',
      data: result,
    });
  } else {
    // Service with the same categoryIds already exists
    sendResponse<IBooking>(res, {
      statusCode: httpStatus.CONFLICT, // Use an appropriate HTTP status code for a conflict
      success: false,
      message:
        'Booking with the same categoryIds exists or not create any category Id before',
      data: null,
    });
  }
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingService.getSingleBooking(id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully !',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookingService.getAllBookings(
    filters,
    paginationOptions,
  );

  sendResponse<IBooking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await BookingService.updateBooking(id, updatedData);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully !',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingService.deleteBooking(id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully !',
    data: result,
  });
});

// Confirm a booking by ID
const confirmBookingController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const booking = await BookingService.confirmBooking(id);

    if (booking) {
      return res.json({ message: 'Booking confirmed', booking });
    } else {
      return res
        .status(404)
        .json({ message: 'Booking not found or already confirmed' });
    }
  } catch (error) {
    console.error('Error confirming booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const BookingController = {
  confirmBookingController,
  createBooking,
  getSingleBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
