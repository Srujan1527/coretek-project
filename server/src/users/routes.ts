import express, { Request, Response } from "express";
import { signUp, login } from "./controller";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
export default userRouter;
