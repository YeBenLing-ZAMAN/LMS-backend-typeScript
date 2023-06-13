import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";
import { IPaginationOptions } from "../../../interface.ts/pagination";
import { IGenericResponse } from "../../../interface.ts/common";
import { academicFacultySearchableFields } from "./academicFaculty.constants";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculty = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTeam, ...filtersData } = filters;

  const andConditions = [];

  if (searchTeam) {
    andConditions.push({
      $or: academicFacultySearchableFields.map((field) => ({
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
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Academic Faculty not found!");
  }
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true, // return new document of the DB
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Academic Faculty not found!");
  }
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
