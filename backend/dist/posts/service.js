"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPostByQuery = exports.createPostByQuery = exports.getAllPostsByQuery = void 0;
const index_1 = require("../index");
const getAllPostsByQuery = async () => {
    try {
        const query = `SELECT * FROM posts  `;
        return new Promise((resolve, reject) => {
            index_1.db?.all(query, (err, data) => {
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
exports.getAllPostsByQuery = getAllPostsByQuery;
const createPostByQuery = async (post, user_id) => {
    try {
        const query = `INSERT INTO posts (post,user_id) VALUES (?,?)`;
        const params = [post, user_id];
        return new Promise((resolve, reject) => {
            index_1.db?.run(query, params, (err, data) => {
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
exports.createPostByQuery = createPostByQuery;
const getUserPostByQuery = async (user_id) => {
    try {
        const query = `SELECT * FROM posts WHERE user_id=${user_id}  `;
        return new Promise((resolve, reject) => {
            index_1.db?.all(query, (err, data) => {
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
exports.getUserPostByQuery = getUserPostByQuery;
