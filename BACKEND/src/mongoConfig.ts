import mongoose from "mongoose";
import config from "./config.js";

const stringConnect = config.MONGODB_URI;

mongoose
  .connect(stringConnect)
  .then(() => {
    console.error("--- MONGODB CONNECTED SUCCESSFULLY ---");
  })
  .catch((err) => {
    console.error("--- MONGODB CONNECTION ERROR ---");
    console.error(err);
    // No throw, let process continue logging
  });

export default mongoose;
