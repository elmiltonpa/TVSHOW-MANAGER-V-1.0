import mongoose from "mongoose";
import config from "./config.js";

const stringConnect = config.MONGODB_URI;

mongoose
  .connect(stringConnect)
  .then(() => {})
  .catch((err) => {
    throw new Error(`Error connecting to MongoDB: ${err.message}`);
  });

export default mongoose;
