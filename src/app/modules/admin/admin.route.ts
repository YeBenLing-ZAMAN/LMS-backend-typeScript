import express from "express";
import { requestValidation } from "../../middleware/validationRequest";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";
const router = express.Router();

router.get("/", AdminController.getAllAdmins);
router.get("/:id", AdminController.getSingleAdmin);
router.delete("/:id", AdminController.deleteAdmin);
router.patch(
  "/:id",
  requestValidation.validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);
export const AdminRoutes = router;
