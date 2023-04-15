"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.getMe = void 0;
const appError_1 = require("../utils/appError");
const service_1 = require("./service");
const getMe = async (req, res, next) => {
    req.params.id = req.user.user_id;
    try {
        const { id } = req.params;
        const user = await (0, service_1.getUser)(id);
        if (!user) {
            return next(new appError_1.AppError("No user found", 404));
        }
        res.status(200).json({
            data: user,
        });
    }
    catch (err) {
        res.status(400).json({
            message: `Unable to get User ${err}`,
        });
    }
};
exports.getMe = getMe;
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, service_1.getAllUsersFromDB)();
        res.status(200).json({
            data: users,
        });
    }
    catch (err) {
        res.status(404).json({
            message: `Unable to fetch users ${err}`,
        });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await (0, service_1.getSingleUserFromDB)(id);
        res.status(200).json({
            data: singleUser,
        });
    }
    catch (err) {
        res.status(404).json({
            message: `Unable to fetch user based on Id ${err}`,
        });
    }
};
exports.getUserById = getUserById;
