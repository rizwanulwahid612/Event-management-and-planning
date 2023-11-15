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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.findLastAdminId = exports.generateCustomerId = exports.findLastCustomerId = void 0;
//import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
const user_model_1 = require("./user.model");
const findLastCustomerId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastCustomer = yield user_model_1.User.findOne({ role: 'customer' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastCustomer === null || lastCustomer === void 0 ? void 0 : lastCustomer.id) ? lastCustomer.id.substring(2) : undefined;
});
exports.findLastCustomerId = findLastCustomerId;
const generateCustomerId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastCustomerId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `C-${incrementedId}`;
    return incrementedId;
});
exports.generateCustomerId = generateCustomerId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield user_model_1.User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(2) : undefined;
});
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
});
exports.generateAdminId = generateAdminId;
