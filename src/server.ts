import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

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
}

DatabaseConnection();
