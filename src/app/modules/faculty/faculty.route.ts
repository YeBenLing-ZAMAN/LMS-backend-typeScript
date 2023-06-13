import express from "express";
import { FacultyController } from "./faculty.controller";
import { FacultyValidation } from "./faculty.validation";
import { requestValidation } from "../../middleware/validationRequest";
const router = express.Router();

router.get("/", FacultyController.getAllFaculties);
router.get("/:id", FacultyController.getSingleFaculty);
router.delete("/:id", FacultyController.deleteFaculty);
router.patch(
  "/:id",
  requestValidation.validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
export const FacultyRoutes = router;
