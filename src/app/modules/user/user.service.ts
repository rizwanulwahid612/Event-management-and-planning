/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
// import { IFaculty } from "../faculty/faculty.interface";
// import { Faculty } from "../faculty/faculty.model";

import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateCustomerId,
  // generateFacultyId,
} from './user.utils';
import { ICustomer } from '../customer/customer.interface';
import { Customer } from '../customer/customer.model';
//import { IUploadFile } from '../../../interfaces/file';
//import { IUploadFile } from '../../../interfaces/file';

const createCustomer = async (
  customer: ICustomer,
  user: IUser,
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set role
  user.role = 'customer';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateCustomerId();
    user.id = id;
    customer.id = id;

    const newCustomer = await Customer.create([customer], { session });

    if (!newCustomer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create customer');
    }

    user.customer = newCustomer[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create customer/user',
      );
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'customer',
    });
  }

  return newUserAllData;
};
const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  if (!user || !admin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User or Admin data is missing');
  }
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // set role
  user.role = 'admin';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin/user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

// const createAdminFromCustomer = async (
//   customer: ICustomer,
//   admin: IAdmin,
//   user: IUser,
// ): Promise<IUser | null> => {
//   if (!user || !admin) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User or Admin data is missing');
//   }
//   // default password
//   if (!user.password) {
//     user.password = config.default_admin_pass as string;
//   }

//   // set role
//   user.role = 'admin';

//   // generate faculty id
//   let newUserAllData = null;
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     const id = await generateAdminId();
//     user.id = id;
//     admin.id = id;

//     const newAdmin = await Admin.create([admin], { session });

//     if (!newAdmin.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin ');
//     }

//     user.admin = newAdmin[0]._id;

//     const newUser = await User.create([user], { session });

//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin/user');
//     }
//     newUserAllData = newUser[0];

//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'admin',
//       populate: [
//         {
//           path: 'managementDepartment',
//         },
//       ],
//     });
//   }

//   return newUserAllData;
// };
const createAdminFromCustomer = async (customerId: ICustomer) => {
  try {
    // Fetch customer data from the database
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const userName = {
      firstName: customer.name.firstName,
      lastName: customer.name.lastName,
      middleName: customer.name.middleName,
    };
    const id = generateAdminId();
    // Create admin object from customer data
    const adminData = {
      id: id,
      email: customer.email,
      name: userName,
      profileImage: customer.profileImage,
      dateOfBirth: customer.dateOfBirth,
      contactNo: customer.contactNo,
      emergencyContactNo: customer.emergencyContactNo,
      gender: customer.gender,
      permanentAddress: customer.permanentAddress,
      presentAddress: customer.presentAddress,
      bloodGroup: customer.bloodGroup,
      managementDepartment: '',
      designation: 'admin from customer',
    };

    // Create admin and link it to the customer
    const createdAdmin = await Admin.create(adminData);
    const userData = {
      id: id,
      role: 'admin',
      password: '$2b$12$Y6OvfLMVvvkcTk7mcjOEa.NTCn4Jg3yarSlXg1vTArAJMDhmCgi1G',
      admin: createdAdmin._id,
    };
    const createdUser = await User.create(userData);
    // Delete the customer
    await Customer.findByIdAndDelete(customerId);

    return {
      admin: createdAdmin,
      user: createdUser,
      message: 'Customer transformed into admin successfully',
    };
  } catch (error: any) {
    throw new Error(`Failed to create admin from customer: ${error.message}`);
  }
};

export const UserService = {
  createCustomer,
  createAdmin,
  createAdminFromCustomer,
};
