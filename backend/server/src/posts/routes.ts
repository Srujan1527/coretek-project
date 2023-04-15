import express from "express";
import { verifyToken } from "../authentication/controller";
import { getAllPosts, createPost, getUserPosts } from "./controller";

const postsRouter = express.Router();

postsRouter.get("/", verifyToken, getAllPosts);
postsRouter.post("/create-post", verifyToken, createPost);
postsRouter.get("/post/:id", verifyToken, getUserPosts);
export default postsRouter;
