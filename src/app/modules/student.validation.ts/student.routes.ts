import express from "express";
import { requestValidation } from "../../middleware/validationRequest";
import { StudentController } from "./student.controller";
import { StudentValidation } from "./student.validation";
const router = express.Router();

router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getSingleStudent);
router.delete("/:id", StudentController.deleteStudent);
router.patch(
  "/:id",
  requestValidation.validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);
export const StudentRoutes = router;
