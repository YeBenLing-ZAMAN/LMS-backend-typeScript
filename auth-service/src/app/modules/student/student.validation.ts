import { z } from "zod";
import { bloodGroup, gender } from "./student.constants";

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({
            required_error: "First name is required",
          })
          .optional(),
        lastName: z
          .string({
            required_error: "Last name is required",
          })
          .optional(),
        middleName: z.string().optional(),
      })
      .optional(),
    gender: z
      .enum([...gender] as [string, ...string[]], {
        required_error: "Gender is required",
      })
      .optional(),
    dateOfBirth: z
      .string({
        required_error: "Date of birth is required",
      })
      .optional(),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email()
      .optional(),
    contactNo: z
      .string({
        required_error: "Contact number is required",
      })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: "Emergency contact number is required",
      })
      .optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z
      .string({
        required_error: "Present address is required",
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: "Permanent address is required",
      })
      .optional(),
    academicSemester: z
      .string({
        required_error: "Academic semester is required",
      })
      .optional(),
    academicDepartment: z
      .string({
        required_error: "Academic department is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: "Academic faculty is required",
      })
      .optional(),
    guardian: z
      .object({
        fatherName: z
          .string({
            required_error: "Father name is required",
          })
          .optional(),
        fatherOccupation: z
          .string({
            required_error: "Father occupation is required",
          })
          .optional(),
        fatherContactNo: z
          .string({
            required_error: "Father contact number is required",
          })
          .optional(),
        motherName: z
          .string({
            required_error: "Mother name is required",
          })
          .optional(),
        motherOccupation: z
          .string({
            required_error: "Mother occupation is required",
          })
          .optional(),
        motherContactNo: z
          .string({
            required_error: "Mother contact number is required",
          })
          .optional(),
        address: z
          .string({
            required_error: "Guardian address is required",
          })
          .optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z
          .string({
            required_error: "Local guardian name is required",
          })
          .optional(),
        occupation: z
          .string({
            required_error: "Local guardian occupation is required",
          })
          .optional(),
        contactNo: z
          .string({
            required_error: "Local guardian contact number is required",
          })
          .optional(),
        address: z
          .string({
            required_error: "Local guardian address is required",
          })
          .optional(),
      })
      .optional(),
    profileImage: z.string().optional(),
  }),
});

export const StudentValidation = {
  updateStudentZodSchema,
};
