/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from "../../../interface.ts/pagination";
import { IGenericResponse } from "../../../interface.ts/common";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../users/user.model";
import { IAdmin, IAdminFilters } from "./admin.interface";
import { AdminSearchAbleFields } from "./admin.constants";
import { Admin } from "./admin.model";

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTeam, ...filtersData } = filters;

  const andConditions = [];

  if (searchTeam) {
    andConditions.push({
      $or: AdminSearchAbleFields.map((field) => ({
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

  const result = await Admin.find(whereConditions)
    .populate("managementDepartment")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate("managementDepartment");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found!");
  }
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found! Please");
  }

  // 01- handle embedded
  const { name, ...adminData } = payload;
  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  // 02- dynamically update // update user name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true, // return new document of the DB
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  let deletedAdmin = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const isExist = await Admin.findOne({ id });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "Admin not found! Please");
    }

    // const newStudent = await Student.create([student], { session });
    const deleteUser = await User.findOneAndDelete({ id }, { session });

    if (!deleteUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    deletedAdmin = await Admin.findOneAndDelete({ id }, { session }).populate(
      "managementDepartment"
    );
    if (!deletedAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete Admin");
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deletedAdmin;
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
