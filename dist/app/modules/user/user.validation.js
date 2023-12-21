'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const createCustomerZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    customer: zod_1.z.object({
      name: zod_1.z.object({
        firstName: zod_1.z.string({
          required_error: 'First name is required',
        }),
        lastName: zod_1.z.string({
          required_error: 'Last name is required',
        }),
        middleName: zod_1.z.string().optional(),
      }),
      gender: zod_1.z.string({
        required_error: 'Gender is required',
      }),
      dateOfBirth: zod_1.z.string({
        required_error: 'Date of birth is required',
      }),
      email: zod_1.z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: zod_1.z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: zod_1.z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: zod_1.z
        .string({
          required_error: 'Blood group is required',
        })
        .optional(),
      presentAddress: zod_1.z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: zod_1.z.string({
        required_error: 'Permanent address is required',
      }),
      profileImage: zod_1.z.string().optional(),
    }),
  }),
});
const createAdminZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    admin: zod_1.z.object({
      name: zod_1.z.object({
        firstName: zod_1.z.string({
          required_error: 'First name is required',
        }),
        lastName: zod_1.z.string({
          required_error: 'Last name is required',
        }),
        middleName: zod_1.z.string().optional(),
      }),
      dateOfBirth: zod_1.z.string({
        required_error: 'Date of birth is required',
      }),
      gender: zod_1.z.string({
        required_error: 'Gender is required',
      }),
      bloodGroup: zod_1.z.string({
        required_error: 'Blood group is required',
      }),
      email: zod_1.z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: zod_1.z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: zod_1.z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: zod_1.z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: zod_1.z.string({
        required_error: 'Permanent address is required',
      }),
      managementDepartment: zod_1.z.string({
        required_error: 'Management department is required',
      }),
      designation: zod_1.z.string({
        required_error: 'Designation is required',
      }),
      notification: zod_1.z
        .array(
          zod_1.z.object({
            message: zod_1.z.string().optional(),
            booking: zod_1.z.array(zod_1.z.string().optional()).optional(),
          }),
        )
        .optional(),
      profileImage: zod_1.z.string().optional(),
    }),
  }),
});
exports.UserValidation = {
  createCustomerZodSchema,
  createAdminZodSchema,
};
