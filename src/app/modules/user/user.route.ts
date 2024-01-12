import express from 'express';
//import validateRequest from '../../middlewares/validateRequest';
//import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-customer',
  // validateRequest(UserValidation.createCustomerZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER,
  // ),
  UserController.createCustomer,
);

router.post(
  '/create-admin',
  //validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.createAdmin,
);
router.post(
  '/create-adminfromcustomer',
  //validateRequest(UserValidation.createAdminZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdminFromCustomer,
);

export const UserRoutes = router;
