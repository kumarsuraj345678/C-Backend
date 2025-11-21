import express from "express";
import { envVariables } from "./configs/envVariables.js";
import { connectDB } from "./configs/connectDB.js";
import { usersRouter } from "./routes/users.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { productsRouter } from "./routes/products.route.js";

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

app.use("/api/v1/products", productsRouter);

// import upload from "./middlewares/multer.middleware.js";
// import fs from "node:fs";
// import { uploadToCloudinary } from "./utils/cloudinaryUtils.js";

// app.post("/api/v1/products", upload.single("image"), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);

//   // fs.writeFileSync(`./uploads/${req.file.originalname}`, req.file.buffer);

//   const uploadedImage = await uploadToCloudinary(req.file.buffer);
//   console.log("Uploaded Image:", uploadedImage);

//   res.send({
//     message: "File uploaded successfully",
//   });
// });

app.listen(envVariables.port, () => {
  console.log(`Server is running on port ${envVariables.port}`);
});
