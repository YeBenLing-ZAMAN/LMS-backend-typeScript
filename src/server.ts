/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
// import { errorLogger, infoLogger } from "./shared/logger";
import { Server } from "http";

/* uncaughtException error handling */
process.on("uncaughtException", (error) => {
  console.log("uncaught Exception is detected.....", error);
  process.exit(1);
});

let server: Server;

async function DatabaseConnection() {
  try {
    await mongoose.connect(config.dataBase_url as string);
    console.log(`Database is connected successfully`);

    /* port listing from here  */
    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(`Fail to connected DB`, err);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

DatabaseConnection();

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
