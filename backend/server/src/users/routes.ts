import express, { Request, Response } from "express";
import { verifyToken } from "../authentication/controller";
import { getMe, getAllUsers, getUserById } from "./controller";

const userRouter = express.Router();

userRouter.get("/me", verifyToken, getMe);
// userRouter.route("/").get(getAllUsers);
userRouter.get("/", verifyToken, getAllUsers);
// userRouter.route("/:id").get(getUserById);
userRouter.get("/:id", verifyToken, getUserById);
export default userRouter;
