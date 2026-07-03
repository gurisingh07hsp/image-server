import './config/env.js';
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware.js";
import uploadRoutes from "./routes/upload.routes.js";
import imageRoutes from './routes/image.routes.js';
import { multerErrorHandler } from "./middleware/multerError.middleware.js";

const app = express();

app.use( helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }));

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.ALLOWED_ORIGIN,
        credentials: true,
    })
);

app.use(morgan("dev"));
console.log("ENV CHECK:", process.env.PROUTY_API_KEY);

app.use("/api/images", imageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/images",express.static("storage/images"));
app.use(multerErrorHandler);

app.get("/health", (_, res) => {
    res.json({
        success: true,
        message: "Image Server Running"
    });
});


app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });

});

app.use(errorHandler);

export default app;