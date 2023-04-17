import express from "express";

import * as sqlite3 from "sqlite3";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
import cors from "cors";
import userRouter from "./users/routes";
import commentsRouter from "./comments/routes";
import postsRouter from "./posts/routes";
import authRouter from "./authentication/routes";
export const app = express();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

const sqlite3Verbose = sqlite3.verbose();
const dbPath = path.join(__dirname, "myDatabase.db");

export const db = new sqlite3Verbose.Database("myDatabase.db");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/posts", postsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${process.env.PORT} `);
});
