import express from "express";
import cors from "cors";
import "dotenv/config";
import color from "colors";
import songRouter from "./src/routes/songRoutes.js";
import connectDB from "./src/config/mongodb.js";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoutes.js";
// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middlewares
app.use(express.json());
app.use(cors());

// initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.get("/", (req, res) => res.send("API Working"));

app.listen(port, () => console.log(`Server started on ${port}`.bgBlue));
