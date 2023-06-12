import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  academicSemesterTitleCodeMapper,
  academicSemestersSearchAbleFields,
} from "./academicSemester.constant";
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { IPaginationOptions } from "../../../interface.ts/pagination";
import { IGenericResponse } from "../../../interface.ts/common";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid semester code ! ");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTeam, ...filtersData } = filters;

  const andConditions = [];

  if (searchTeam) {
    andConditions.push({
      $or: academicSemestersSearchAbleFields.map((field) => ({
        [field]: {
          $regex: searchTeam,
          $options: "i",
        },
      })),
    });
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       { title: { $regex: searchTeam, $options: "i" } },
  //       { code: { $regex: searchTeam, $options: "i" } },
  //       { year: { $regex: searchTeam, $options: "i" } },
  //     ],
  //   },
  // ];

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // if (Object.keys(filtersData).length) {
  //   $and: [
  //     {
  //       title: filtersData.title,
  //     },
  //     {
  //       code: filtersData.code,
  //     },
  //   ];
  // }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemesters = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemesters,
};
