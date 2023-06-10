import { User } from "./user.model";
import { IUser } from "./user.interface";
import config from "../../../config";
import { generatedUsersId } from "./user.utiles";

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generatedUsersId();
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const createdUser = await User.create(user);

  if (!createUser) {
    throw new Error("Failed to create user!");
  }
  return createdUser;
};

export const userService = {
  createUser,
};
