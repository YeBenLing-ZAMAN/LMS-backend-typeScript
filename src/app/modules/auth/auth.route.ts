import express from "express";
import { requestValidation } from "../../middleware/validationRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
const router = express.Router();

router.post(
  "/login",
  requestValidation.validateRequest(AuthValidation.loginZodSchema),
  AuthController.login
);

router.post(
  "/refresh-token",
  requestValidation.validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  "/change-password",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  requestValidation.validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);

// router.get("/get-all-user", AuthController.getAllUser);

export const AuthRoutes = router;
