"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../authentication/controller");
const controller_2 = require("./controller");
const postsRouter = express_1.default.Router();
postsRouter.get("/", controller_1.verifyToken, controller_2.getAllPosts);
postsRouter.post("/create-post", controller_1.verifyToken, controller_2.createPost);
postsRouter.get("/post/:id", controller_1.verifyToken, controller_2.getUserPosts);
exports.default = postsRouter;
