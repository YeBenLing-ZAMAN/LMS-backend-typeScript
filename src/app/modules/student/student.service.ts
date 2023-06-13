/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from "../../../interface.ts/pagination";
import { IGenericResponse } from "../../../interface.ts/common";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import mongoose, { SortOrder } from "mongoose";
import { IStudent, IStudentFilters } from "./student.interface";
import { StudentSearchAbleFields } from "./student.constants";
import { Student } from "./student.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../users/user.model";

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTeam, ...filtersData } = filters;

  const andConditions = [];

  if (searchTeam) {
    andConditions.push({
      $or: StudentSearchAbleFields.map((field) => ({
        [field]: {
          $regex: searchTeam,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .populate("academicSemester")
    .populate("academicDepartment")
    .populate("academicFaculty")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate("academicSemester")
    .populate("academicDepartment")
    .populate("academicFaculty");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found!");
  }
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found! Please");
  }

  // 01- handle embedded
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };
  // const name ={firstName:"Md",lastName:"kamruzzaman"}
  // 02- dynamically update // update user name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // update Guardian
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach((key) => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  // update LocalGuardian
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach((key) => {
      const localGuardianKey = `localGuardian.${key}`;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true, // return new document of the DB
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  let deletedStudent = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const isExist = await Student.findOne({ id });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "Student not found! Please");
    }

    // const newStudent = await Student.create([student], { session });
    const deleteUser = await User.findOneAndDelete({ id }, { session });

    if (!deleteUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    //set student -->  _id into user.student
    // user.student = newStudent[0]._id;

    deletedStudent = await Student.findOneAndDelete({ id }, { session })
      .populate("academicSemester")
      .populate("academicDepartment")
      .populate("academicFaculty");
    if (!deletedStudent) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deletedStudent;
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
