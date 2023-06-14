import express from "express";
import { UserController } from "./user.controllers";
import { requestValidation } from "../../middleware/validationRequest";
import { UserValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/create-student",
  requestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);
router.post(
  "/create-faculty",
  requestValidation.validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);
router.post(
  "/create-admin",
  requestValidation.validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

router.get("/get-all-user", UserController.getAllUser);

export const UserRoutes = router;
