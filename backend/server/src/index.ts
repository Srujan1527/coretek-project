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

const sqlite3Verbose = sqlite3.verbose();
export const app = express();
app.use(express.json());
app.use(cors());
const dbPath = path.join(__dirname, "myDatabase.db");

export const db = new sqlite3Verbose.Database("myDatabase.db");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/posts", postsRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${process.env.PORT} `);
});
