"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const customer_controller_1 = require("./customer.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customer_validations_1 = require("./customer.validations");
//import { CustomerValidation } from './customer.validations';
//import validateRequest from '../../middlewares/validateRequest';
const router = express_1.default.Router();
// router.post(
//   '/:id/create-booking-request',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.CUSTOMER,
//   ),
//   CustomerController.createBookingRequest,
// );
router.post('/create-Customer', 
//validateRequest(PostValidation.postPost),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), customer_controller_1.CustomerController.createCustomer);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), customer_controller_1.CustomerController.getSingleCustomer);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), customer_controller_1.CustomerController.getAllCustomers);
router.patch('/:id', (0, validateRequest_1.default)(customer_validations_1.CustomerValidation.updateCustomer), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), customer_controller_1.CustomerController.updateCustomer);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), customer_controller_1.CustomerController.deleteCustomer);
exports.CustomerRoutes = router;
