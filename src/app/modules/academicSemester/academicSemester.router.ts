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

export const AcademicSemesterRoutes = router;
