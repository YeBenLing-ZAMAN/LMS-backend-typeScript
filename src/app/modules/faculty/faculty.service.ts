/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from "../../../interface.ts/pagination";
import { IGenericResponse } from "../../../interface.ts/common";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../users/user.model";
import { IFaculty, IFacultyFilters } from "./faculty.interface";
import { FacultySearchAbleFields } from "./faculty.constants";
import { Faculty } from "./faculty.model";

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTeam, ...filtersData } = filters;

  const andConditions = [];

  if (searchTeam) {
    andConditions.push({
      $or: FacultySearchAbleFields.map((field) => ({
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

  const result = await Faculty.find(whereConditions)
    .populate("academicDepartment")
    .populate("academicFaculty")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate("academicDepartment")
    .populate("academicFaculty");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty not found!");
  }
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found! Please");
  }

  // 01- handle embedded
  const { name, ...facultyData } = payload;
  const updatedStudentData: Partial<IFaculty> = { ...facultyData };

  // 02- dynamically update // update user name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedStudentData, {
    new: true, // return new document of the DB
  });
  return result;
};
const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  let deletedFaculty = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const isExist = await Faculty.findOne({ id });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "Faculty not found! Please");
    }

    // const newStudent = await Student.create([student], { session });
    const deleteUser = await User.findOneAndDelete({ id }, { session });

    if (!deleteUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
    }

    deletedFaculty = await Faculty.findOneAndDelete({ id }, { session })
      .populate("academicDepartment")
      .populate("academicFaculty");
    if (!deletedFaculty) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deletedFaculty;
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
