import express from "express";
import { requestValidation } from "../../middleware/validationRequest";
import { ManagementDepartmentController } from "./managementDepartment.controller";
import { ManagementDepartmentValidation } from "./managementDepartment.validation";
const router = express.Router();

router.post(
  "/create-management",
  requestValidation.validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get(
  "/:id",
  ManagementDepartmentController.getSingleManagementDepartment
);
router.patch(
  "/:id",
  requestValidation.validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);
router.delete(
  "/:id",
  ManagementDepartmentController.deleteManagementDepartment
);
router.get("/", ManagementDepartmentController.getAllManagementDepartments);

export const ManagementDepartmentRoutes = router;
