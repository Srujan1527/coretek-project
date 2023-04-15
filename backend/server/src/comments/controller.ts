import { getAllCommentsByQuery, createCommentByQuery } from "./service";

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
  const { post_id } = req.params;
  const { comment } = req.body;
  try {
    const { id } = req.params;
    const newComment = await createCommentByQuery(id, post_id, comment);

    res.status(200).json({
      message: "Comment Successfully Created",
      data: newComment,
    });
  } catch (err) {
    res.status(404).json({
      error: `Unable to create a comment ${err}`,
    });
  }
};
