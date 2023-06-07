import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") }); // current working directory meant



export default {
    port : process.env.PORT,
    dataBase_url : process.env.DB_URL
}