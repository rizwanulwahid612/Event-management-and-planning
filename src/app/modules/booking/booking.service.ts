/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, Types } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Booking } from './booking.model';
import {
  IBooking,
  IBookingFilterRequest,
  IBookingRequest,
} from './booking.interface';
import { Category } from '../category/category.model';
import { bookingSearchableFields } from './booking.constant';
import { Admin } from '../admin/admin.model';
import { Customer } from '../customer/customer.model';

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
export const findLastBookingId = async (): Promise<string | undefined> => {
  const lastBooking = await Booking.findOne(
    {
      role: 'booking',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastBooking?.id ? lastBooking.id.substring(8) : undefined;
};

export const generateBookingId = async (): Promise<string> => {
  const currentId =
    (await findLastBookingId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `Booking-${incrementedId}`;

  return incrementedId;
};
const createBooking = async (booking: IBooking): Promise<IBooking | null> => {
  const { serviceIDs } = booking;
  let createNewBooking = true;

  await asyncForEach(serviceIDs, async (serviceId: IBookingRequest) => {
    const categoryId = serviceId.categoryId;

    const alreadyExist = await Booking.findOne({
      'serviceIDs.categoryId': categoryId,
    });
    const categoryExists = await Category.exists({ _id: categoryId });
    if (alreadyExist || !categoryExists) {
      createNewBooking = false;
    }
  });

  if (createNewBooking) {
    const id = await generateBookingId();
    booking.id = id;

    const result = await Booking.create(booking);

    const admins = await Admin.find();

    for (const admin of admins) {
      admin?.notification?.push({
        message: `New booking received of this customer id:${booking?.customerID} `,
        booking: [result],
      });
      await admin.save();
    }
    // Now, send a notification to the customer
    const customer = await Customer.findById(booking?.customerID);
    if (customer) {
      customer?.notification?.push({
        message: ` CustomerId:${booking.customerID} Your booking is panding & admin will confirmed please wait`,
      });
      await customer.save();
    }
    return result;
  } else {
    return null;
  }
};

// Example of using Types.ObjectId for query

// Example of populating a document with Types.ObjectId
//const populatedBooking = await Booking.findOne({ _id: yourId }).populate('customerID');

const confirmBooking = async (id: string): Promise<IBooking | null> => {
  // Find the booking by ID
  const booking = await Booking.findOne({ _id: new Types.ObjectId(id) });

  if (!booking) {
    return null;
  }

  // Check if the booking is already confirmed, and if so, return it
  if (booking.isConfirm) {
    return booking;
  }

  // Update the booking to set 'isConfirm' to true
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  booking.isConfirm = true;
  await booking.save();

  // Find the corresponding customer
  const customer = await Customer.findById(booking?.customerID);

  if (customer) {
    // Push the booking ID to the customer's 'booking' array
    customer?.booking?.push(booking._id.toString());
    customer?.notification?.push({
      message: `Your booking is confirmed by Admin: ${booking?.adminID} please check`,
    });
    await customer.save();
  }

  return booking;
};

const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findOne({ _id: id })
    .populate('customerID') // Populate the customerID field
    .populate('serviceIDs.categoryId');
  return result;
};
const getAllBookings = async (
  filters: IBookingFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBooking[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: bookingSearchableFields.map(field => ({
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

  const result = await Booking.find(whereConditions)
    .populate('customerID') // Populate the customerID field
    .populate('serviceIDs.categoryId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Booking.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateBooking = async (
  id: string,
  payload: Partial<IBooking>,
): Promise<IBooking | null> => {
  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const service = await Booking.findOneAndDelete({ _id: id });
  return service;
};
export const BookingService = {
  createBooking,
  getSingleBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  confirmBooking,
};
