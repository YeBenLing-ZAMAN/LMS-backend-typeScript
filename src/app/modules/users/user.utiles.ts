import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

export const findLastUserId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean(); //  operation make faster
  return lastStudent?.id ? lastStudent?.id?.substring(4) : undefined;
};

export const generatedStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, "0"); // 00000
  // increment by one
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  // 2023
  incrementedId = `${academicSemester.year.substring(2, 4)}${
    academicSemester.code
  }${incrementedId}`;
  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: "faculty" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean(); // operation make faster
  return lastFaculty?.id ? lastFaculty?.id?.substring(2) : undefined;
};

export const generatedFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, "0"); // 00000
  // increment by one
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  // 2023
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
