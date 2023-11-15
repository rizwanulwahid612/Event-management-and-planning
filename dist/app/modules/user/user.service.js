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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../../../config/index"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("../admin/admin.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const customer_model_1 = require("../customer/customer.model");
//import { IUploadFile } from '../../../interfaces/file';
//import { IUploadFile } from '../../../interfaces/file';
const createCustomer = (customer, user) => __awaiter(void 0, void 0, void 0, function* () {
    // default password
    if (!user.password) {
        user.password = index_1.default.default_faculty_pass;
    }
    // set role
    user.role = 'customer';
    // generate faculty id
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateCustomerId)();
        user.id = id;
        customer.id = id;
        const newCustomer = yield customer_model_1.Customer.create([customer], { session });
        if (!newCustomer.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create customer');
        }
        user.customer = newCustomer[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create customer/user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'customer',
        });
    }
    return newUserAllData;
});
const createAdmin = (admin, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user || !admin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User or Admin data is missing');
    }
    // default password
    if (!user.password) {
        user.password = index_1.default.default_admin_pass;
    }
    // set role
    user.role = 'admin';
    // generate faculty id
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateAdminId)();
        user.id = id;
        admin.id = id;
        const newAdmin = yield admin_model_1.Admin.create([admin], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin ');
        }
        user.admin = newAdmin[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin/user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'admin',
            populate: [
                {
                    path: 'managementDepartment',
                },
            ],
        });
    }
    return newUserAllData;
});
exports.UserService = {
    createCustomer,
    createAdmin,
};
