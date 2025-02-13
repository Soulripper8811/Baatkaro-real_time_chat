import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import authRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
dotenv.config();
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

const port = process.env.PORT || 5001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
