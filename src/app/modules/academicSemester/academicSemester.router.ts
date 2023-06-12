import express from "express";
import { requestValidation } from "../../middleware/validationRequest";
import { academicSemesterValidation } from "./academicSemester.validation";
import { academicSemesterController } from "./academicSemester.controller";
const router = express.Router();

router.post(
  "/create-semester",
  requestValidation.validateRequest(
    academicSemesterValidation.createAcademicSemesterZodSchema
  ),
  academicSemesterController.createSemester
);

router.get("/:id", academicSemesterController.getSingleSemesters);
router.patch(
  "/:id",
  requestValidation.validateRequest(
    academicSemesterValidation.updateAcademicSemesterZodSchema
  ),
  academicSemesterController.updateSemester
);
router.delete("/:id", academicSemesterController.deleteSemesters);
router.get("/", academicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
