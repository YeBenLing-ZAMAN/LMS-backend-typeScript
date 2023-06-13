import express from "express";
import { requestValidation } from "../../middleware/validationRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import { AcademicSemesterController } from "./academicSemester.controller";
const router = express.Router();

router.post(
  "/create-semester",
  requestValidation.validateRequest(
    AcademicSemesterValidation.createAcademicSemesterZodSchema
  ),
  AcademicSemesterController.createSemester
);

router.get("/:id", AcademicSemesterController.getSingleSemesters);
router.patch(
  "/:id",
  requestValidation.validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterZodSchema
  ),
  AcademicSemesterController.updateSemester
);
router.delete("/:id", AcademicSemesterController.deleteSemesters);
router.get("/", AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
