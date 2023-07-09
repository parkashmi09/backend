import express from "express";
import useRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { connectDB } from "./database/data.js";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middleware/error.js";
import cors from "cors";
import { config } from "dotenv";

export const app = express();

config({
  path: "./database/config.env",
});
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use("/api/v1/users", useRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("You are in Home Page");
});

app.use(errorMiddleWare);
