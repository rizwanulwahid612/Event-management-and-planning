'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Review = void 0;
const mongoose_1 = require('mongoose');
const ReviewSchema = new mongoose_1.Schema(
  {
    customerId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    categoryId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
exports.Review = (0, mongoose_1.model)('Review', ReviewSchema);
