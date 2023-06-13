import express from "express";
import { UserController } from "./user.controllers";
import { requestValidation } from "../../middleware/validationRequest";
import { UserValidation } from "./user.vaildation";
const router = express.Router();

router.post(
  "/create-student",
  requestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

router.get("/get-all-user", UserController.getAllUser);

export const UserRoutes = router;
