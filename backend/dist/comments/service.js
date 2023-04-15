"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentByQuery = exports.getAllCommentsByQuery = void 0;
const index_1 = require("../index");
const getAllCommentsByQuery = async () => {
    const query = `SELECT * FROM comments `;
    return new Promise((resolve, reject) => {
        try {
            index_1.db?.all(query, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        }
        catch (err) {
            return err;
        }
    });
};
exports.getAllCommentsByQuery = getAllCommentsByQuery;
const createCommentByQuery = async (user_id, post_id, comment) => {
    const query = `INSERT INTO comments (user_id,post_id,comment) VALUES(?,?,?)`;
    const params = [user_id, post_id, comment];
    return new Promise((resolve, reject) => {
        try {
            index_1.db?.run(query, params, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        }
        catch (err) {
            return err;
        }
    });
};
exports.createCommentByQuery = createCommentByQuery;
