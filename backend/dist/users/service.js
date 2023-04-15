"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUserFromDB = exports.getAllUsersFromDB = exports.getUser = void 0;
const index_1 = require("../index");
const getUser = async (id) => {
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
exports.getUser = getUser;
const getAllUsersFromDB = () => {
    const query = `SELECT * FROM users`;
    return new Promise((resolve, reject) => {
        index_1.db?.all(query, (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.getAllUsersFromDB = getAllUsersFromDB;
const getSingleUserFromDB = (id) => {
    const query = `SELECT * FROM users WHERE user_id=?`;
    const params = [id];
    return new Promise((resolve, reject) => {
        index_1.db?.all(query, params, (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.getSingleUserFromDB = getSingleUserFromDB;
