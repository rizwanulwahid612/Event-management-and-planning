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
exports.CustomerController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const customer_service_1 = require('./customer.service');
const customer_constant_1 = require('./customer.constant');
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
const createCustomer = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const PostData = __rest(req.body, []);
    const result =
      yield customer_service_1.CustomerService.createCustomer(PostData);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Customer created successfully',
      data: result,
    });
  }),
);
const getSingleCustomer = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield customer_service_1.CustomerService.getSingleCustomer(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Customer fetched successfully !',
      data: result,
    });
  }),
);
const getAllCustomers = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      customer_constant_1.customerFilterableFields,
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields,
    );
    const result = yield customer_service_1.CustomerService.getAllCustomers(
      filters,
      paginationOptions,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Customers fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  }),
);
const updateCustomer = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield customer_service_1.CustomerService.updateCustomer(
      id,
      updatedData,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Customer updated successfully !',
      data: result,
    });
  }),
);
const deleteCustomer = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield customer_service_1.CustomerService.deleteCustomer(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Customer deleted successfully !',
      data: result,
    });
  }),
);
exports.CustomerController = {
  // createBookingRequest,
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
