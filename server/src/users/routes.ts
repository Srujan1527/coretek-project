import express, { Request, Response } from "express";
import { verifyToken } from "../authentication/controller";
import { getMe, getAllUsers, getUserById } from "./controller";

const userRouter = express.Router();

userRouter.get("/me", verifyToken, getMe);
userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").get(getUserById);
export default userRouter;
