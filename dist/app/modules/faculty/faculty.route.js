"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const faculty_validation_1 = require("./faculty.validation");
const validationRequest_1 = require("../../middleware/validationRequest");
const user_1 = require("../../enums/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), faculty_controller_1.FacultyController.getAllFaculties);
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT), faculty_controller_1.FacultyController.getSingleFaculty);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), faculty_controller_1.FacultyController.deleteFaculty);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY), validationRequest_1.requestValidation.validateRequest(faculty_validation_1.FacultyValidation.updateFacultyZodSchema), faculty_controller_1.FacultyController.updateFaculty);
exports.FacultyRoutes = router;
