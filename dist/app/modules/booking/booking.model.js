"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingRequestSchema = new mongoose_1.Schema({
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
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
            'WEDNESDAY TO SATURDAY',
            'THURSDAY TO SUNDAY',
            'FRIDAY TO MONDAY',
            '7 DAYS',
        ],
        isDeleted: {
            type: Boolean,
        },
    },
});
const BookingSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    customerID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    serviceIDs: {
        type: [BookingRequestSchema],
        required: true,
    },
    adminID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin', // Assuming you have an 'Admin' model
    },
    isConfirm: {
        type: Boolean,
        // required: true,
    },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)('Booking', BookingSchema);
