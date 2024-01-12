"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    details: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    apointmentdaysInWeek: {
        type: String,
        enum: [
            'SATURDAY TO THURSDAY',
            'SUNDAY TO WEDNESDAY',
            'MONDAY TO THURSDAY',
            'TUESDAY TO FRIDAY',
            'WEDNESDAY TO SATURDAY ',
            'THURSDAY TO SUNDAY',
            'FRIDAY TO MONDAY',
        ],
    },
    categoryIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Category',
        },
    ],
}, {
    timestamps: true,
});
exports.Service = (0, mongoose_1.model)('Service', ServiceSchema);
