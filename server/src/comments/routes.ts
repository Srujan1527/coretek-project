import express, { Request, Response } from "express";

const commentsRouter = express.Router();
commentsRouter.post("/login", (req: Request, res: Response) => {
  res.send("hello login");
});

commentsRouter.post("/signup", (req: Request, res: Response) => {
  res.send("hello signup");
});

export default commentsRouter;
