"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_controller_1 = require("./service.controller");
const service_validation_1 = require("./service.validation");
const router = express_1.default.Router();
router.post('/create-service', (0, validateRequest_1.default)(service_validation_1.ServiceValidation.postService), 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
service_controller_1.ServiceController.createService);
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
service_controller_1.ServiceController.getSingleService);
router.get('/', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
service_controller_1.ServiceController.getAllServices);
router.patch('/:id', (0, validateRequest_1.default)(service_validation_1.ServiceValidation.updateService), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.ServiceController.updateService);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.ServiceController.deleteService);
exports.ServiceRoutes = router;
