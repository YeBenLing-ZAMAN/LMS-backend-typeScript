import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") }); // current working directory meant

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dataBase_url: process.env.DB_URL,
  default_user_password: process.env.DEFAULT_USER_PASSWORD,
};
