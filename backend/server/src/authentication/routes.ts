import express, { Request, Response } from "express";
import { signUp, login } from "./controller";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
export default authRouter;