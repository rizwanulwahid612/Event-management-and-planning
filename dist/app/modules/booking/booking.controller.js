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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookingController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const booking_service_1 = require('./booking.service');
const pick_1 = __importDefault(require('../../../shared/pick'));
const booking_constant_1 = require('./booking.constant');
const createBooking = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = __rest(req.body, []);
    const result =
      yield booking_service_1.BookingService.createBooking(bookingData);
    if (result) {
      // Service was created successfully
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking created successfully',
        data: result,
      });
    } else {
      // Service with the same categoryIds already exists
      (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CONFLICT,
        success: false,
        message:
          'Booking with the same categoryIds exists or not create any category Id before',
        data: null,
      });
    }
  }),
);
const getSingleBooking = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield booking_service_1.BookingService.getSingleBooking(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Booking fetched successfully !',
      data: result,
    });
  }),
);
const getAllBookings = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      booking_constant_1.bookingFilterableFields,
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields,
    );
    const result = yield booking_service_1.BookingService.getAllBookings(
      filters,
      paginationOptions,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Booking fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  }),
);
const updateBooking = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield booking_service_1.BookingService.updateBooking(
      id,
      updatedData,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Booking updated successfully !',
      data: result,
    });
  }),
);
const deleteBooking = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield booking_service_1.BookingService.deleteBooking(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Booking deleted successfully !',
      data: result,
    });
  }),
);
// Confirm a booking by ID
const confirmBookingController = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const booking = yield booking_service_1.BookingService.confirmBooking(id);
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
  });
exports.BookingController = {
  confirmBookingController,
  createBooking,
  getSingleBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
