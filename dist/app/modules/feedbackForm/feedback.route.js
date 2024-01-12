'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
//import validateRequest from '../../middlewares/validateRequest';
const feedback_controller_1 = require('./feedback.controller');
//import { FeedbackValidation } from './feedback.validation';
const router = express_1.default.Router();
router.post(
  '/create-feedback',
  //validateRequest(FeedbackValidation.postFeedback),
  (0, auth_1.default)(
    // ENUM_USER_ROLE.SUPER_ADMIN,
    // ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.CUSTOMER,
  ),
  feedback_controller_1.FeedbackController.createFeedback,
);
router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  feedback_controller_1.FeedbackController.getSingleFeedback,
);
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  feedback_controller_1.FeedbackController.getAllFeedbacks,
);
router.patch(
  '/:id',
  // validateRequest(FeedbackValidation.updateFeedback),
  (0, auth_1.default)(
    // ENUM_USER_ROLE.SUPER_ADMIN,
    // ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.CUSTOMER,
  ),
  feedback_controller_1.FeedbackController.updateFeedback,
);
router.delete(
  '/:id',
  (0, auth_1.default)(
    // ENUM_USER_ROLE.SUPER_ADMIN,
    // ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.CUSTOMER,
  ),
  feedback_controller_1.FeedbackController.deleteFeedback,
);
exports.FeedbackRoutes = router;
