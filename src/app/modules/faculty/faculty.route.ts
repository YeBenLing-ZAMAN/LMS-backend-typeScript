import express from "express";
import { FacultyController } from "./faculty.controller";
import { FacultyValidation } from "./faculty.validation";
import { requestValidation } from "../../middleware/validationRequest";
import { ENUM_USER_ROLE } from "../../enums/user";
import auth from "../../middleware/auth";
const router = express.Router();

router.get("/", auth(ENUM_USER_ROLE.ADMIN), FacultyController.getAllFaculties);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  FacultyController.getSingleFaculty
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  FacultyController.deleteFaculty
);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  requestValidation.validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
export const FacultyRoutes = router;
