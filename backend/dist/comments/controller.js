"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.getAllComments = void 0;
const service_1 = require("./service");
const getAllComments = async (req, res) => {
    try {
        const allComments = await (0, service_1.getAllCommentsByQuery)();
        res.status(200).json({
            results: allComments.length,
            data: allComments,
        });
    }
    catch (err) {
        res.status(404).json({
            error: `Cannot get all posts ${err}`,
        });
    }
};
exports.getAllComments = getAllComments;
const createComment = async (req, res) => {
    req.params.id = req.user.user_id;
    const { post_id } = req.params;
    const { comment } = req.body;
    try {
        const { id } = req.params;
        const newComment = await (0, service_1.createCommentByQuery)(id, post_id, comment);
        res.status(200).json({
            message: "Comment Successfully Created",
            data: newComment,
        });
    }
    catch (err) {
        res.status(404).json({
            error: `Unable to create a comment ${err}`,
        });
    }
};
exports.createComment = createComment;
