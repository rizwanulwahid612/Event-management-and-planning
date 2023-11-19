'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookingService =
  exports.generateBookingId =
  exports.findLastBookingId =
  exports.asyncForEach =
    void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require('mongoose');
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const booking_model_1 = require('./booking.model');
const category_model_1 = require('../category/category.model');
const booking_constant_1 = require('./booking.constant');
const admin_model_1 = require('../admin/admin.model');
const customer_model_1 = require('../customer/customer.model');
const asyncForEach = (array, callback) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(array)) {
      throw new Error('Expected an array');
    }
    for (let index = 0; index < array.length; index++) {
      yield callback(array[index], index, array);
    }
  });
exports.asyncForEach = asyncForEach;
const findLastBookingId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastBooking = yield booking_model_1.Booking.findOne(
      {
        role: 'booking',
      },
      { id: 1, _id: 0 },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastBooking === null || lastBooking === void 0 ? void 0 : lastBooking.id
    )
      ? lastBooking.id.substring(8)
      : undefined;
  });
exports.findLastBookingId = findLastBookingId;
const generateBookingId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastBookingId)()) ||
      (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `Booking-${incrementedId}`;
    return incrementedId;
  });
exports.generateBookingId = generateBookingId;
const createBooking = booking =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { serviceIDs } = booking;
    let createNewBooking = true;
    yield (0, exports.asyncForEach)(serviceIDs, serviceId =>
      __awaiter(void 0, void 0, void 0, function* () {
        const categoryId = serviceId.categoryId;
        const alreadyExist = yield booking_model_1.Booking.findOne({
          'serviceIDs.categoryId': categoryId,
        });
        const categoryExists = yield category_model_1.Category.exists({
          _id: categoryId,
        });
        if (alreadyExist || !categoryExists) {
          createNewBooking = false;
        }
      }),
    );
    if (createNewBooking) {
      const id = yield (0, exports.generateBookingId)();
      booking.id = id;
      const result = yield booking_model_1.Booking.create(booking);
      const admins = yield admin_model_1.Admin.find();
      for (const admin of admins) {
        (_a =
          admin === null || admin === void 0 ? void 0 : admin.notification) ===
          null || _a === void 0
          ? void 0
          : _a.push({
              message: `New booking received of this customer name:${
                booking === null || booking === void 0
                  ? void 0
                  : booking.customerID
              } `,
              booking: [result],
            });
        yield admin.save();
      }
      // Now, send a notification to the customer
      const customer = yield customer_model_1.Customer.findById(
        booking === null || booking === void 0 ? void 0 : booking.customerID,
      );
      if (customer) {
        (_b =
          customer === null || customer === void 0
            ? void 0
            : customer.notification) === null || _b === void 0
          ? void 0
          : _b.push({
              message: `Your booking:${
                booking === null || booking === void 0
                  ? void 0
                  : booking.customerID
              }is panding & admin will confirmed please wait`,
            });
        yield customer.save();
      }
      return result;
    } else {
      return null;
    }
  });
// Example of using Types.ObjectId for query
// Example of populating a document with Types.ObjectId
//const populatedBooking = await Booking.findOne({ _id: yourId }).populate('customerID');
const confirmBooking = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    // Find the booking by ID
    const booking = yield booking_model_1.Booking.findOne({
      _id: new mongoose_1.Types.ObjectId(id),
    });
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
    yield booking.save();
    // Find the corresponding customer
    const customer = yield customer_model_1.Customer.findById(
      booking === null || booking === void 0 ? void 0 : booking.customerID,
    );
    if (customer) {
      // Push the booking ID to the customer's 'booking' array
      (_c =
        customer === null || customer === void 0
          ? void 0
          : customer.booking) === null || _c === void 0
        ? void 0
        : _c.push(booking._id.toString());
      (_d =
        customer === null || customer === void 0
          ? void 0
          : customer.notification) === null || _d === void 0
        ? void 0
        : _d.push({
            message: `Your booking is confirmed by Admin: ${
              booking === null || booking === void 0 ? void 0 : booking.adminID
            } please check`,
          });
      yield customer.save();
    }
    return booking;
  });
const getSingleBooking = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findOne({ _id: id })
      .populate('customerID') // Populate the customerID field
      .populate('serviceIDs.categoryId');
    return result;
  });
const getAllBookings = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions,
      );
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
      andConditions.push({
        $or: booking_constant_1.bookingSearchableFields.map(field => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield booking_model_1.Booking.find(whereConditions)
      .populate('customerID') // Populate the customerID field
      .populate('serviceIDs.categoryId')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield booking_model_1.Booking.countDocuments(whereConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const updateBooking = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      },
    );
    return result;
  });
const deleteBooking = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const service = yield booking_model_1.Booking.findOneAndDelete({ id });
    return service;
  });
exports.BookingService = {
  createBooking,
  getSingleBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  confirmBooking,
};
