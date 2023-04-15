"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const controller_2 = require("../authentication/controller");
const commentsRouter = express_1.default.Router();
commentsRouter.get("/", controller_1.getAllComments);
commentsRouter.post("/create-comment/:post_id", controller_2.verifyToken, controller_1.createComment);
exports.default = commentsRouter;
