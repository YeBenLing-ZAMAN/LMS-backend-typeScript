"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../middleware/validationRequest");
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = express_1.default.Router();
router.post(
  "/create-semester",
  validationRequest_1.requestValidation.validateRequest(
    academicSemester_validation_1.AcademicSemesterValidation
      .createAcademicSemesterZodSchema
  ),
  academicSemester_controller_1.AcademicSemesterController.createSemester
);
router.get(
  "/:id",
  academicSemester_controller_1.AcademicSemesterController.getSingleSemesters
);
router.patch(
  "/:id",
  validationRequest_1.requestValidation.validateRequest(
    academicSemester_validation_1.AcademicSemesterValidation
      .updateAcademicSemesterZodSchema
  ),
  academicSemester_controller_1.AcademicSemesterController.updateSemester
);
router.delete(
  "/:id",
  academicSemester_controller_1.AcademicSemesterController.deleteSemesters
);
router.get(
  "/",
  academicSemester_controller_1.AcademicSemesterController.getAllSemesters
);
exports.AcademicSemesterRoutes = router;
