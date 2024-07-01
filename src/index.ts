// Packages--
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import { errorMiddleware } from "./middleware/error.js";

// Instances--
const app = express();

// Middleware--
app.use(express.json());

// DB connection--
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => {
    console.log(`Database conneciton error: ${err}`);
  });

// Routes--
app.use("/api/v1/user", userRoutes);

app.use(errorMiddleware);
// Server connection--
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running on port:${port}`);
});
