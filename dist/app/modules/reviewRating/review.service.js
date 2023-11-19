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
exports.ReviewService = void 0;
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const review_model_1 = require('./review.model');
const review_constant_1 = require('./review.constant');
const category_model_1 = require('../category/category.model');
const createReview = review =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.create(review);
    yield category_model_1.Category.updateOne(
      { _id: review.categoryId },
      { $push: { reviewIds: result._id } },
    );
    return result;
  });
const getSingleReview = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findOne({ _id: id })
      .populate('customerId')
      .populate('categoryId');
    return result;
  });
const getReviewByCategory = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOne({ _id: id })
      .populate('customerId')
      .populate('categoryId');
    return result;
  });
const getAllReviews = (filters, paginationOptions) =>
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
        $or: review_constant_1.reviewSearchableFields.map(field => ({
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
    const result = yield review_model_1.Review.find(whereConditions)
      .populate('customerId')
      .populate('categoryId')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield review_model_1.Review.countDocuments(whereConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const updateReview = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      },
    );
    return result;
  });
const deleteReview = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findOneAndDelete({ _id: id });
    return result;
  });
exports.ReviewService = {
  createReview,
  getSingleReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewByCategory,
};
