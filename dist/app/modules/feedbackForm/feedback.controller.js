'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FeedbackController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const feedback_service_1 = require('./feedback.service');
const feedback_constant_1 = require('./feedback.constant');
const createFeedback = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const FeedbackData = __rest(req.body, []);
    const result =
      yield feedback_service_1.FeedbackService.createFeedback(FeedbackData);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Feedback created successfully',
      data: result,
    });
  }),
);
const getSingleFeedback = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield feedback_service_1.FeedbackService.getSingleFeedback(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Feedback fetched successfully !',
      data: result,
    });
  }),
);
const getAllFeedbacks = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      feedback_constant_1.feedbackFilterableFields,
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields,
    );
    const result = yield feedback_service_1.FeedbackService.getAllFeedbacks(
      filters,
      paginationOptions,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Feedback fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  }),
);
const updateFeedback = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield feedback_service_1.FeedbackService.updateFeedback(
      id,
      updatedData,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Feedback updated successfully !',
      data: result,
    });
  }),
);
const deleteFeedback = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield feedback_service_1.FeedbackService.deleteFeedback(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Feedback deleted successfully !',
      data: result,
    });
  }),
);
exports.FeedbackController = {
  createFeedback,
  getSingleFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
};
