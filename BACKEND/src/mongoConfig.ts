import mongoose from "mongoose";
import config from "./config.js";

const stringConnect = config.MONGODB_URI;

mongoose
  .connect(stringConnect)
  .then(() => {})
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default mongoose;
