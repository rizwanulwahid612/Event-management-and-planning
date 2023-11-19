"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const mongoose_1 = require("mongoose");
const FeedbackSchema = new mongoose_1.Schema({
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Feedback = (0, mongoose_1.model)('Feedback', FeedbackSchema);
