import express, { Request, Response } from "express";
import { getAllComments, createComment } from "./controller";
import { verifyToken } from "../authentication/controller";

const commentsRouter = express.Router();
commentsRouter.get("/", getAllComments);

commentsRouter.post("/create-comment/:post_id", verifyToken, createComment);

export default commentsRouter;
