import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CustomerController } from './customer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerValidation } from './customer.validations';
//import { CustomerValidation } from './customer.validations';
//import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

// router.post(
//   '/:id/create-booking-request',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.CUSTOMER,
//   ),
//   CustomerController.createBookingRequest,
// );
router.post(
  '/create-Customer',
  //validateRequest(PostValidation.postPost),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  CustomerController.createCustomer,
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  CustomerController.getSingleCustomer,
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  CustomerController.getAllCustomers,
);

router.patch(
  '/:id',
  validateRequest(CustomerValidation.updateCustomer),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  CustomerController.updateCustomer,
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  CustomerController.deleteCustomer,
);

export const CustomerRoutes = router;
