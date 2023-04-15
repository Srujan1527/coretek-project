import express, { Request, Response } from "express";

const postsRouter = express.Router();
postsRouter.post("/login", (req: Request, res: Response) => {
  res.send("hello login");
});

postsRouter.post("/signup", (req: Request, res: Response) => {
  res.send("hello signup");
});

export default postsRouter;
