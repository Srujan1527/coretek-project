"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../authentication/controller");
const controller_2 = require("./controller");
const userRouter = express_1.default.Router();
userRouter.get("/me", controller_1.verifyToken, controller_2.getMe);
// userRouter.route("/").get(getAllUsers);
userRouter.get("/", controller_1.verifyToken, controller_2.getAllUsers);
// userRouter.route("/:id").get(getUserById);
userRouter.get("/:id", controller_1.verifyToken, controller_2.getUserById);
exports.default = userRouter;
