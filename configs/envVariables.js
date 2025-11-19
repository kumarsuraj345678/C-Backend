import dotenv from "dotenv";
dotenv.config();

export const envVariables = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  accessToken: process.env.ACCESS_TOKEN,
  clientUrl: process.env.CLIENT_URL,
};

Object.freeze(envVariables); //prevents modification of the object
