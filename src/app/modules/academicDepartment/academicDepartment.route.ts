import express from "express";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import { requestValidation } from "../../middleware/validationRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";

const router = express.Router();

router.post(
  "/create-department",
  requestValidation.validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

router.get("/:id", AcademicDepartmentController.getSingleDepartment);

router.patch(
  "/:id",
  requestValidation.validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);

router.delete("/:id", AcademicDepartmentController.deleteDepartment);

router.get("/", AcademicDepartmentController.getAllDepartments);

export const academicDepartmentRoutes = router;
