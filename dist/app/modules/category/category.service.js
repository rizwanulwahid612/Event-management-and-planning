"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = exports.generateCategoryId = exports.findLastCategoryId = exports.asyncForEach = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const category_model_1 = require("./category.model");
const category_constant_1 = require("./category.constant");
//import { Review } from '../reviewRating/review.model';
// import { Review } from '../reviewRating/review.model';
// import { IReview } from '../reviewRating/review.interface';
const asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(array)) {
        throw new Error('Expected an array');
    }
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
exports.asyncForEach = asyncForEach;
const findLastCategoryId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastCategory = yield category_model_1.Category.findOne({
        role: 'category',
    }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastCategory === null || lastCategory === void 0 ? void 0 : lastCategory.id) ? lastCategory.id.substring(9) : undefined;
});
exports.findLastCategoryId = findLastCategoryId;
const generateCategoryId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastCategoryId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `Category-${incrementedId}`;
    return incrementedId;
});
exports.generateCategoryId = generateCategoryId;
const createCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, exports.generateCategoryId)();
    category.id = id;
    const result = yield category_model_1.Category.create(category);
    return result;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOne({ _id: id }).populate('reviewIds');
    // const categoryIdFindAtReview = await Review.findOne({ categoryId: id });
    // if (result === categoryIdFindAtReview) {
    //   return await Category.findOne({ _id: id }).populate('reviewIds');
    // } else {
    return result;
});
const getAllCategories = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: category_constant_1.categorySearchableFields.map(field => ({
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
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield category_model_1.Category.find(whereConditions)
        .populate('reviewIds')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield category_model_1.Category.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deletecategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.Category.findOneAndDelete({ id });
    //delete user
    // await User.deleteOne({ id });
    return category;
});
exports.CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deletecategory,
};
