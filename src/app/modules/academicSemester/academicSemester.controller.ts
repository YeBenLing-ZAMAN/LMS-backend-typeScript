import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import { AcademicSemesterService } from "./academicSemester.service";

const createSemester: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: "Academic semester created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const academicSemesterController = {
  createSemester,
};
