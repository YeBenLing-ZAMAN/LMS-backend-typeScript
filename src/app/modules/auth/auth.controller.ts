import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.login(loginData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user login successfully!",
    data: result,
  });
});

export const AuthController = {
  login,
};
