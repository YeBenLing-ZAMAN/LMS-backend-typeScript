import express from "express";
import { UserController } from "./user.controllers";
import { requestValidation } from "../../middleware/validationRequest";
import { userValidation } from "./user.vaildation";
const router = express.Router();

router.post(
  "/create-user",
  requestValidation.validateRequest(userValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;
