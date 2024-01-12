'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
);
const category_controller_1 = require('./category.controller');
const category_validation_1 = require('./category.validation');
// import { ServiceController } from './service.controller';
// import { ServiceValidation } from './service.validation';
const router = express_1.default.Router();
router.post(
  '/create-category',
  (0, validateRequest_1.default)(
    category_validation_1.CategoryValidation.postCategory,
  ),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  category_controller_1.CategoryController.createCategory,
);
router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  category_controller_1.CategoryController.getSingleCategory,
);
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  category_controller_1.CategoryController.getAllCategory,
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    category_validation_1.CategoryValidation.updateCategory,
  ),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
  ),
  category_controller_1.CategoryController.updateCategory,
);
router.delete(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
  ),
  category_controller_1.CategoryController.deleteCategory,
);
exports.CategoryRoutes = router;
