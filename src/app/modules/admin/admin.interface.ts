import { Model, Types } from "mongoose";
import { IManagementDepartment } from "../managementDepartment/managementDepartment.interface";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id: string;
  name: UserName; //embedded object
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  managementDepartment: Types.ObjectId | IManagementDepartment; // reference _id
  profileImage?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTeam?: string;
  id?: string;
  gender?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  name?: string;
  emergencyContactNo?: string;
};
