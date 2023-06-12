import express from "express";
import { requestValidation } from "../../middleware/validationRequest";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
const router = express.Router();

router.post(
  "/create-faculty",
  requestValidation.validateRequest(
    AcademicFacultyValidation.createFacultyZodSchema
  ),
  AcademicFacultyController.createFaculty
);

router.get("/:id", AcademicFacultyController.getSingleFaculty);
router.patch(
  "/:id",
  requestValidation.validateRequest(
    AcademicFacultyValidation.updateFacultyZodSchema
  ),
  AcademicFacultyController.updateFaculty
);
router.delete("/:id", AcademicFacultyController.deleteFaculty);
router.get("/", AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
