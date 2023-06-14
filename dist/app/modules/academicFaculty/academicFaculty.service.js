"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyService = void 0;
const academicFaculty_model_1 = require("./academicFaculty.model");
const academicFaculty_constants_1 = require("./academicFaculty.constants");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createFaculty = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.create(
      payload
    );
    return result;
  });
const getAllFaculty = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTeam } = filters,
      filtersData = __rest(filters, ["searchTeam"]);
    const andConditions = [];
    if (searchTeam) {
      andConditions.push({
        $or: academicFaculty_constants_1.academicFacultySearchableFields.map(
          (field) => ({
            [field]: {
              $regex: searchTeam,
              $options: "i",
            },
          })
        ),
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
      paginationHelpers_1.paginationHelper.calculatePagination(
        paginationOptions
      );
    const sortCondition = {};
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicFaculty_model_1.AcademicFaculty.find(
      whereConditions
    )
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    const total = yield academicFaculty_model_1.AcademicFaculty.countDocuments(
      whereConditions
    );
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleFaculty = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        "Academic Faculty not found!"
      );
    }
    return result;
  });
const updateFaculty = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicFaculty_model_1.AcademicFaculty.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true, // return new document of the DB
        }
      );
    return result;
  });
const deleteFaculty = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicFaculty_model_1.AcademicFaculty.findByIdAndDelete({
        _id: id,
      });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        "Academic Faculty not found!"
      );
    }
    return result;
  });
exports.AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
