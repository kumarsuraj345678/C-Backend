import mongoose from "mongoose";
import { envVariables } from "./envVariables.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(envVariables.mongodbUri, {
      dbName: "Cuvette_Backend",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
