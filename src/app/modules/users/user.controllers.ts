import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { RequestHandler } from "express-serve-static-core";

const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;
    const result = await userService.createUser(user);
    res.status(200).json({
      success: true,
      message: "user created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
};
