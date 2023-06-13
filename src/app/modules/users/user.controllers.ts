import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user created successfully!",
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user created successfully!",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all user data!",
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  getAllUser,
};
