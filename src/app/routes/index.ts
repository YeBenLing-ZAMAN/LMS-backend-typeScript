import express from "express";
import { UserRoutes } from "../modules/users/user.routes";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.router";

const router = express.Router();

const moduleRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/academic-semester", route: AcademicSemesterRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
