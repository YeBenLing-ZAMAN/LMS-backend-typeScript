import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../users/user.model";
import { ILoginUser } from "./auth.interface";

const login = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const user = new User(); // creating instance of a user.

  // checking user by custom our created instance methods
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // isMatching password
  const isPasswordMatch =
    isUserExist.password &&
    (await user.isPasswordMatch(password, isUserExist.password));
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, "Password is incorrect");
  }

  // create JWT token

  return {};
};

export const AuthService = {
  login,
};
