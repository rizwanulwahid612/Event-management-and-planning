"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-customer', (0, validateRequest_1.default)(user_validation_1.UserValidation.createCustomerZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), user_controller_1.UserController.createCustomer);
router.post('/create-admin', 
//validateRequest(UserValidation.createAdminZodSchema),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.createAdmin);
exports.UserRoutes = router;
