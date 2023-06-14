"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const validationRequest_1 = require("../../middleware/validationRequest");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post(
  "/create-student",
  validationRequest_1.requestValidation.validateRequest(
    user_validation_1.UserValidation.createUserZodSchema
  ),
  user_controllers_1.UserController.createStudent
);
router.post(
  "/create-faculty",
  validationRequest_1.requestValidation.validateRequest(
    user_validation_1.UserValidation.createFacultyZodSchema
  ),
  user_controllers_1.UserController.createFaculty
);
router.post(
  "/create-admin",
  validationRequest_1.requestValidation.validateRequest(
    user_validation_1.UserValidation.createAdminZodSchema
  ),
  user_controllers_1.UserController.createAdmin
);
router.get("/get-all-user", user_controllers_1.UserController.getAllUser);
exports.UserRoutes = router;
