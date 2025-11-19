import jwt from "jsonwebtoken";
import { envVariables } from "../configs/envVariables.js";

export const authenticateUser = (req, res, next) => {
  try {
    const incomingCookies = req.cookies?.accessToken;
    if (!incomingCookies) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }

    const verifyToken = jwt.verify(incomingCookies, envVariables.accessToken);
    if (!verifyToken) {
      return res.status(400).json({
        success: false,
        message: "Token Expired or Invalid",
      });
    }
    req.user = verifyToken;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Issue in Verify Token",
    });
  }
};
