import express from "express";

import * as sqlite3 from "sqlite3";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
import userRouter from "./users/routes";
import commentsRouter from "./comments/routes";
import postsRouter from "./posts/routes";
import authRouter from "./authentication/routes";

const sqlite3Verbose = sqlite3.verbose();
export const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "myDatabase.db");

export const db = new sqlite3Verbose.Database("myDatabase.db");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/posts", postsRouter);
// app.get("/books", (req, res) => {
//   db.run(
//     "CREATE TABLE IF NOT EXISTS profileDetails (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)",
//     (err) => {
//       if (err) {
//         return console.error(err.message);
//       }
//       console.log("Books table created successfully");
//       res.send("Books table created successfully")
//     }
//   );
// });

// app.post("/books", (req:any, res) => {
//   const { name, email } = req.body;
//   const insertQuery = `INSERT INTO profileDetails (name, email) VALUES ('${name}', '${email}')`;
//   db.run(insertQuery, (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log(`Row inserted successfully: ${name}, ${email}`);
//     res.send(`Row inserted successfully: ${name}, ${email}`);
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${process.env.PORT} `);
});
