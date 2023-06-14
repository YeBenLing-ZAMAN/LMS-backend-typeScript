"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../middleware/validationRequest");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.post(
  "/create-faculty",
  validationRequest_1.requestValidation.validateRequest(
    academicFaculty_validation_1.AcademicFacultyValidation
      .createFacultyZodSchema
  ),
  academicFaculty_controller_1.AcademicFacultyController.createFaculty
);
router.get(
  "/:id",
  academicFaculty_controller_1.AcademicFacultyController.getSingleFaculty
);
router.patch(
  "/:id",
  validationRequest_1.requestValidation.validateRequest(
    academicFaculty_validation_1.AcademicFacultyValidation
      .updateFacultyZodSchema
  ),
  academicFaculty_controller_1.AcademicFacultyController.updateFaculty
);
router.delete(
  "/:id",
  academicFaculty_controller_1.AcademicFacultyController.deleteFaculty
);
router.get(
  "/",
  academicFaculty_controller_1.AcademicFacultyController.getAllFaculty
);
exports.AcademicFacultyRoutes = router;
