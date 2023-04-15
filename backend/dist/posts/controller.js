"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosts = exports.createPost = exports.getAllPosts = void 0;
const service_1 = require("./service");
const getAllPosts = async (req, res) => {
    try {
        const allPosts = await (0, service_1.getAllPostsByQuery)();
        res.status(200).json({
            data: allPosts,
        });
    }
    catch (err) {
        res.status(404).json({
            error: `Cannot get all posts ${err}`,
        });
    }
};
exports.getAllPosts = getAllPosts;
const createPost = async (req, res) => {
    req.params.id = req.user.user_id;
    const { post } = req.body;
    try {
        const { id } = req.params;
        const createdPost = await (0, service_1.createPostByQuery)(post, id);
        console.log(id);
        res.status(200).json({
            message: "Successfully created a post ",
            data: createdPost,
        });
    }
    catch (err) {
        res.status(404).json({
            error: `Cannot create a post ${err}`,
        });
    }
};
exports.createPost = createPost;
const getUserPosts = async (req, res) => {
    req.params.id = req.user.user_id;
    try {
        const { id } = req.params;
        const getUserPost = await (0, service_1.getUserPostByQuery)(id);
        console.log(id);
        res.status(200).json({
            message: "Successfully retrieved all user's posts ",
            data: getUserPost,
        });
    }
    catch (err) {
        res.status(404).json({
            error: `Cannot get all posts of an user ${err}`,
        });
    }
};
exports.getUserPosts = getUserPosts;
