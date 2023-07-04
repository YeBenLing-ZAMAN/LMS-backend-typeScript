"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../middleware/validationRequest");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post("/login", validationRequest_1.requestValidation.validateRequest(auth_validation_1.AuthValidation.loginZodSchema), auth_controller_1.AuthController.login);
router.post("/refresh-token", validationRequest_1.requestValidation.validateRequest(auth_validation_1.AuthValidation.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
router.post("/change-password", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT), validationRequest_1.requestValidation.validateRequest(auth_validation_1.AuthValidation.changePasswordZodSchema), auth_controller_1.AuthController.changePassword);
// router.get("/get-all-user", AuthController.getAllUser);
exports.AuthRoutes = router;
