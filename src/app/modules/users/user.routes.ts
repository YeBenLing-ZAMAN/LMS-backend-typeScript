import express from "express";
import { UserController } from "./user.controllers";
const router = express.Router();

router.post("/create-user", UserController.createUser);

export const UserRoutes = router;
