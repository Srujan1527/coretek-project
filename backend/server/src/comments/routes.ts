import express, { Request, Response } from "express";
import {
  getAllComments,
  createComment,
  getCommentsOfEachPost,
} from "./controller";
import { verifyToken } from "../authentication/controller";

const commentsRouter = express.Router();
commentsRouter.get("/", getAllComments);
commentsRouter.get("/each-post-comments/:post_id", getCommentsOfEachPost);
commentsRouter.post("/create-comment/:post_id", verifyToken, createComment);

export default commentsRouter;
