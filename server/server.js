import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import { fileURLToPath } from "url";
import http from "http";
import configureSocket from "./socket/socket.js";

const app = express();
export const httpServer = http.createServer(app);

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", parameterLimit: 100000, extended: true })
);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//middleware for cookies
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//Mongoose Setup
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
  })
  .catch((error) => console.log(error));

//Socket Configuration
configureSocket(httpServer);
