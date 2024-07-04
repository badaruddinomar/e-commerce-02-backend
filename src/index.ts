// Packages--
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import morgan from "morgan";
dotenv.config();
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.routes.js";
import { errorMiddleware } from "./middleware/error.js";

// Instances--
const app = express();

// Middleware--
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(fileUpload());
app.use(morgan("dev"));

// Handling uncaught exceptions--
process.on("uncaughtException", (err) => {
  console.log(`error: ${err.message}`);
  console.log(`Uncaught exception: ${err.stack}`);
  process.exit(1);
});
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
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

// Error handling middleware--
app.use(errorMiddleware);
// Server connection--
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`server running on port:${port}`);
});

// unhandled promise rejection--
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shuting down the server due to unhandled promise rejection!`);

  server.close(() => {
    process.exit(1);
  });
});
