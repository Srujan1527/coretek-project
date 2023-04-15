"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.createToken = exports.getUserByEmail = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = async (user) => {
    try {
        const { name, email, password } = user;
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const query = `INSERT INTO users (user_name,email,user_password) VALUES (?,?,?)`;
        const params = [name, email, hashedPassword];
        return new Promise((resolve, reject) => {
            index_1.db.run(query, params, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve("Object Created");
                }
            });
        });
    }
    catch (err) {
        return err;
    }
};
exports.createUser = createUser;
const getUserByEmail = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email= ?`;
        const params = [email];
        return new Promise((resolve, reject) => {
            index_1.db?.get(query, params, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    catch (err) {
        return err;
    }
};
exports.getUserByEmail = getUserByEmail;
const createToken = (user) => {
    const { user_id } = user;
    const myVariable = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ id: user_id }, myVariable);
    return token;
};
exports.createToken = createToken;
const getCurrentUser = async (decoded) => {
    const { id } = decoded;
    const query = `SELECT * FROM users WHERE user_id = ?`;
    const params = [id];
    return new Promise((resolve, reject) => {
        try {
            index_1.db?.get(query, params, (err, user) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(user);
                }
            });
        }
        catch (err) {
            return err;
        }
    });
};
exports.getCurrentUser = getCurrentUser;
