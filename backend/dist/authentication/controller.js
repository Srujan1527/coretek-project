"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.login = exports.signUp = void 0;
const service_1 = require("./service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../utils/appError");
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userDetails = { name, email, password };
        const abc = await (0, service_1.createUser)(userDetails);
        res.status(200).json({
            message: abc,
        });
    }
    catch (err) {
        res.status(404).json({
            error: err,
        });
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, service_1.getUserByEmail)(email);
        if (!user)
            return res.status(400).json({ msg: "User Does not Exists" });
        const isMatch = await bcrypt_1.default.compare(password, user.user_password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid Credentials" });
        const token = (0, service_1.createToken)(user);
        res.status(200).json({
            data: user,
            token: token,
        });
    }
    catch (err) {
        res.status(404).json({
            message: `Error Occurred ${err}`,
        });
    }
};
exports.login = login;
const verifyToken = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new appError_1.AppError("You are not logged in! Please log in to get access", 401));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const currentUser = await (0, service_1.getCurrentUser)(decoded);
    if (!currentUser) {
        return next(new appError_1.AppError("The USer belonging to this token does no longer exists", 401));
    }
    req.user = currentUser;
    next();
};
exports.verifyToken = verifyToken;
// tommorrow  write error handling for login
