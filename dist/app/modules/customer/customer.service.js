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
exports.CustomerService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const user_model_1 = require('../user/user.model');
const customer_model_1 = require('./customer.model');
const customer_constant_1 = require('./customer.constant');
const createCustomer = post =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.create(post);
    return result;
  });
const getSingleCustomer = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.findOne({ id })
      .populate('notification')
      .populate('booking');
    return result;
  });
const getAllCustomers = (filters, paginationOptions) =>
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
        $or: customer_constant_1.customerSearchableFields.map(field => ({
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
    const result = yield customer_model_1.Customer.find(whereConditions)
      .populate('notification')
      .populate('booking')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total =
      yield customer_model_1.Customer.countDocuments(whereConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const updateCustomer = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield customer_model_1.Customer.findOne({ id });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Customer is not found !',
      );
    }
    const { name } = payload,
      customerData = __rest(payload, ['name']);
    const updatedCustomerData = Object.assign({}, customerData);
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`;
        updatedCustomerData[nameKey] = name[key];
      });
    }
    const result = yield customer_model_1.Customer.findOneAndUpdate(
      { id },
      updatedCustomerData,
      {
        new: true,
      },
    );
    return result;
  });
const deleteCustomer = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Check if the admin exists
    const isExist = yield customer_model_1.Customer.findOne({ id });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Customer not found!',
      );
    }
    // eslint-disable-next-line no-useless-catch
    try {
      // Delete the admin
      const admin = yield customer_model_1.Customer.findOneAndDelete({ id });
      if (!admin) {
        throw new ApiError_1.default(404, 'Customer not found');
      }
      // Delete the related user
      yield user_model_1.User.deleteOne({ id });
      return admin;
    } catch (error) {
      // Handle errors appropriately
      throw error.message;
    }
  });
// const deleteCustomer = async (id: string): Promise<ICustomer | null> => {
//   // check if the faculty is exist
//   const isExist = await Customer.findOne({ id });
//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Customer is not found !');
//   }
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     //delete student first
//     const customer = await Customer.findOneAndDelete({ id }, { session });
//     if (!customer) {
//       throw new ApiError(404, 'Failed to delete Customer');
//     }
//     //delete user
//     await User.deleteOne({ id });
//     session.commitTransaction();
//     session.endSession();
//     return customer;
//   } catch (error) {
//     session.abortTransaction();
//     throw error;
//   }
// };
exports.CustomerService = {
  // createBookingRequest,
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
