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
exports.PostService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const post_model_1 = require("./post.model");
const post_constant_1 = require("./post.constant");
const customer_model_1 = require("../customer/customer.model");
const createPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // const result = await Post.create(post);
    // // Update the customer notifications
    // const customers = await Customer.find({});
    // for (const customer of customers) {
    //   // Customize the notification message
    //   const notificationMessage = `New post created: ${post.comment}`;
    //   customer.notification.push(notificationMessage);
    //   await customer.save();
    // }
    const result = yield post_model_1.Post.create(post);
    // Create a notification message for the new post
    const notificationMessage = `New post created: ${post.comment}`;
    // Update the customer notifications
    const customers = yield customer_model_1.Customer.find({});
    for (const customer of customers) {
        // Push the notification message to the 'notification' array
        (_a = customer === null || customer === void 0 ? void 0 : customer.notification) === null || _a === void 0 ? void 0 : _a.push({ message: notificationMessage });
        yield customer.save();
    }
    return result;
});
const getSinglePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findOne({ _id: id }).populate('adminId');
    return result;
});
const getAllPosts = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: post_constant_1.postSearchableFields.map(field => ({
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
    const result = yield post_model_1.Post.find(whereConditions)
        .populate('adminId')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield post_model_1.Post.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updatePost = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findOneAndDelete({ _id: id });
    return result;
});
exports.PostService = {
    createPost,
    getSinglePost,
    getAllPosts,
    updatePost,
    deletePost,
};
