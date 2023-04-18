import {
  getAllCommentsByQuery,
  createCommentByQuery,
  getCommentsOfEachPostByQuery,
} from "./service";

export const getAllComments = async (req: any, res: any) => {
  try {
    const allComments = await getAllCommentsByQuery();

    res.status(200).json({
      results: allComments.length,
      data: allComments,
    });
  } catch (err) {
    res.status(404).json({
      error: `Cannot get all posts ${err}`,
    });
  }
};
export const createComment = async (req: any, res: any) => {
  req.params.id = req.user.user_id;
  req.params.user_name = req.user.user_name;
  const { post_id } = req.params;

  try {
    const { id, user_name } = req.params;
    const { comment } = req.body;
    console.log(comment);
    await createCommentByQuery(id, post_id, user_name, comment);

    res.status(200).json({
      message: "Comment Successfully Created",
    });
  } catch (err) {
    res.status(404).json({
      error: `Unable to create a comment ${err}`,
    });
  }
};
export const getCommentsOfEachPost = async (req: any, res: any) => {
  const { post_id } = req.params;
  try {
    const postComments = await getCommentsOfEachPostByQuery(post_id);
    res.status(200).json({
      message: "Post Comments Successfully Fetched",
      results: postComments.length,
      data: postComments,
    });
  } catch (err) {
    res.status(404).json({
      error: `Unable to get each Post comments ${err}`,
    });
  }
};
