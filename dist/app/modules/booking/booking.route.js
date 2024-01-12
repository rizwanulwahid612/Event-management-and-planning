"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
//import { ENUM_USER_ROLE } from '../../../enums/user';
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.put('/confirm/:id', (0, auth_1.default)(), 
// ENUM_USER_ROLE.SUPER_ADMIN,
// ENUM_USER_ROLE.ADMIN,
// ENUM_USER_ROLE.CUSTOMER,
booking_controller_1.BookingController.confirmBookingController);
router.post('/create-Booking', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.postBooking), 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
booking_controller_1.BookingController.createBooking);
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
booking_controller_1.BookingController.getSingleBooking);
router.get('/', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
booking_controller_1.BookingController.getAllBookings);
router.patch('/:id', 
//validateRequest(BookingValidation.updateBooking),
//auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
booking_controller_1.BookingController.updateBooking);
router.delete('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
booking_controller_1.BookingController.deleteBooking);
exports.BookingRoutes = router;
