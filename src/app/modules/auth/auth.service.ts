import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../users/user.model";
import bcrypt from "bcrypt";

import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelper";

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
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

  const { id: userId, role, needsPasswordChange } = isUserExist;

  // create JWT token
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expiries_in as string
  );

  // created refresh token
  const refreshToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expiries_in as string
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    //
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "invalid refresh Token");
  }

  const { userId } = verifiedToken;
  const user = new User(); // creating instance of a user.

  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // generate new token

  // create JWT token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expiries_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userinfo: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // checking user?
  const user = new User();
  const isUserExist = await user.isUserExist(userinfo?.userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // checking password?
  const isPasswordMatch =
    isUserExist.password &&
    (await user.isPasswordMatch(oldPassword, isUserExist.password));
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, "Old Password is incorrect");
  }

  // hash password before saving
  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds as string)
  );

  const updateData = {
    password: newHashPassword,
    needsPasswordChange: false,
    passwordChangeAt: new Date(),
  };

  await User.findOneAndUpdate({ id: userinfo?.userId }, updateData);
};
export const AuthService = {
  login,
  refreshToken,
  changePassword,
};
