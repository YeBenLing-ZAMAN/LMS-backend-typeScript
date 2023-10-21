"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const validationRequest_1 = require("../../middleware/validationRequest");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.post(
  "/create-department",
  validationRequest_1.requestValidation.validateRequest(
    academicDepartment_validation_1.AcademicDepartmentValidation
      .createAcademicDepartmentZodSchema
  ),
  academicDepartment_controller_1.AcademicDepartmentController.createDepartment
);
router.get(
  "/:id",
  academicDepartment_controller_1.AcademicDepartmentController
    .getSingleDepartment
);
router.patch(
  "/:id",
  validationRequest_1.requestValidation.validateRequest(
    academicDepartment_validation_1.AcademicDepartmentValidation
      .updateAcademicDepartmentZodSchema
  ),
  academicDepartment_controller_1.AcademicDepartmentController.updateDepartment
);
router.delete(
  "/:id",
  academicDepartment_controller_1.AcademicDepartmentController.deleteDepartment
);
router.get(
  "/",
  academicDepartment_controller_1.AcademicDepartmentController.getAllDepartments
);
exports.academicDepartmentRoutes = router;
