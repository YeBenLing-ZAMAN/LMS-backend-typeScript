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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedAdminId =
  exports.findLastAdminId =
  exports.generatedFacultyId =
  exports.findLastFacultyId =
  exports.generatedStudentId =
  exports.findLastUserId =
    void 0;
const user_model_1 = require("./user.model");
const findLastUserId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lastStudent = yield user_model_1.User.findOne(
      { role: "student" },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean(); //  operation make faster
    return (
      lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id
    )
      ? (_a =
          lastStudent === null || lastStudent === void 0
            ? void 0
            : lastStudent.id) === null || _a === void 0
        ? void 0
        : _a.substring(4)
      : undefined;
  });
exports.findLastUserId = findLastUserId;
const generatedStudentId = (academicSemester) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastUserId)()) || (0).toString().padStart(5, "0"); // 00000
    // increment by one
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
    // 2023
    incrementedId = `${
      academicSemester === null || academicSemester === void 0
        ? void 0
        : academicSemester.year.substring(2, 4)
    }${
      academicSemester === null || academicSemester === void 0
        ? void 0
        : academicSemester.code
    }${incrementedId}`;
    return incrementedId; //240200001
  });
exports.generatedStudentId = generatedStudentId;
const findLastFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const lastFaculty = yield user_model_1.User.findOne(
      { role: "faculty" },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean(); // operation make faster
    return (
      lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id
    )
      ? (_b =
          lastFaculty === null || lastFaculty === void 0
            ? void 0
            : lastFaculty.id) === null || _b === void 0
        ? void 0
        : _b.substring(2)
      : undefined;
  });
exports.findLastFacultyId = findLastFacultyId;
const generatedFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastFacultyId)()) ||
      (0).toString().padStart(5, "0"); // 00000
    // increment by one
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
    // 2023
    incrementedId = `F-${incrementedId}`; //F-00001
    return incrementedId;
  });
exports.generatedFacultyId = generatedFacultyId;
const findLastAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const lastFaculty = yield user_model_1.User.findOne(
      { role: "admin" },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean(); // operation make faster
    return (
      lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id
    )
      ? (_c =
          lastFaculty === null || lastFaculty === void 0
            ? void 0
            : lastFaculty.id) === null || _c === void 0
        ? void 0
        : _c.substring(2)
      : undefined;
  });
exports.findLastAdminId = findLastAdminId;
const generatedAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, "0"); // 00000
    // increment by one
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
    // 2023
    incrementedId = `A-${incrementedId}`; //A-00001
    return incrementedId;
  });
exports.generatedAdminId = generatedAdminId;
