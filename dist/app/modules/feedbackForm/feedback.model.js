"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const mongoose_1 = require("mongoose");
const FeedbackSchema = new mongoose_1.Schema({
    comment: {
        type: String,
    },
    customerName: {
        type: String,
    },
    customerImage: {
        type: String,
    },
    rating: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Feedback = (0, mongoose_1.model)('Feedback', FeedbackSchema);
