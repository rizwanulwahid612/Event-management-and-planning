'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
//import validateRequest from '../../middlewares/validateRequest';
//import { UserValidation } from './user.validation';
const user_controller_1 = require('./user.controller');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
const router = express_1.default.Router();
router.post(
  '/create-customer',
  // validateRequest(UserValidation.createCustomerZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  user_controller_1.UserController.createCustomer,
);
router.post(
  '/create-admin',
  //validateRequest(UserValidation.createAdminZodSchema),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN),
  user_controller_1.UserController.createAdmin,
);
router.post(
  '/create-adminfromcustomer',
  //validateRequest(UserValidation.createAdminZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.createAdminFromCustomer,
);
exports.UserRoutes = router;
