"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    serviceID: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    reviewIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
}, {
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
