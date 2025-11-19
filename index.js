import express from "express";
import { envVariables } from "./configs/envVariables.js";
import { connectDB } from "./configs/connectDB.js";
import { usersRouter } from "./routes/users.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: envVariables.clientUrl,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello Backend !!!");
});

app.use("/api/v1/users", usersRouter);

app.listen(envVariables.port, () => {
  console.log(`Server is running on port ${envVariables.port}`);
});
