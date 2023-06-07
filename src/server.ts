import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { errorLogger, infoLogger } from "./shared/logger";

async function DatabaseConnection() {
  try {
    await mongoose.connect(config.dataBase_url as string);
    infoLogger.info(`Database is connected successfully`);

    /* port listing from here  */
    app.listen(config.port, () => {
      infoLogger.info(`app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error(`Fail to connected DB`, err);
  }
}

DatabaseConnection();
