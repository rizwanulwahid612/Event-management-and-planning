import express from 'express';
//import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();
router.put(
  '/confirm/:id',
  auth(),
  // ENUM_USER_ROLE.SUPER_ADMIN,
  // ENUM_USER_ROLE.ADMIN,
  // ENUM_USER_ROLE.CUSTOMER,
  BookingController.confirmBookingController,
);
router.post(
  '/create-Booking',
  validateRequest(BookingValidation.postBooking),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  BookingController.createBooking,
);
router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  BookingController.getSingleBooking,
);
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  BookingController.getAllBookings,
);

router.patch(
  '/:id',
  //validateRequest(BookingValidation.updateBooking),
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BookingController.updateBooking,
);

router.delete(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  BookingController.deleteBooking,
);

export const BookingRoutes = router;
