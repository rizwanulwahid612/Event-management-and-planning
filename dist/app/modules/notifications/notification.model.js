"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    // _id: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false,
    },
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin',
        required: false,
    },
    bookingId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Booking',
        required: false,
    },
    alartmessage: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Notification = (0, mongoose_1.model)('Notification', NotificationSchema);
