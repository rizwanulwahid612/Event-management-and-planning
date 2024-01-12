'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
);
const notification_controller_1 = require('./notification.controller');
const notification_validation_1 = require('./notification.validation');
const router = express_1.default.Router();
router.post(
  '/create-notification',
  (0, validateRequest_1.default)(
    notification_validation_1.NotificationValidation.postNotification,
  ),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.CUSTOMER,
  ),
  notification_controller_1.NotificationController.createNotification,
);
router.get(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.CUSTOMER,
  ),
  notification_controller_1.NotificationController.getSingleNotification,
);
router.get(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.CUSTOMER,
  ),
  notification_controller_1.NotificationController.getAllNotifications,
);
router.patch(
  '/:id',
  //validateRequest(NotificationValidation.updateNotification),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.CUSTOMER,
  ),
  notification_controller_1.NotificationController.updateNotification,
);
router.delete(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
  ),
  notification_controller_1.NotificationController.deleteNotification,
);
exports.NotificationRoutes = router;
