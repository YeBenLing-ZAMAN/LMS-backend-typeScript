import express from "express";
import usersControllers from "./users.controllers";
const router = express.Router();

router.post("/create-user", usersControllers.createUser);

export default router;
