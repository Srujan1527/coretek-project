import {
  getAllPostsByQuery,
  createPostByQuery,
  getUserPostByQuery,
} from "./service";

export const getAllPosts = async (req: any, res: any) => {
  try {
    const allPosts = await getAllPostsByQuery();

    res.status(200).json({
      data: allPosts,
    });
  } catch (err) {
    res.status(404).json({
      error: `Cannot get all posts ${err}`,
    });
  }
};

export const createPost = async (req: any, res: any) => {
  req.params.id = req.user.user_id;

  const { post } = req.body;
  try {
    const { id } = req.params;
    console.log("post:", post);

    const createdPost = await createPostByQuery(post, id);
    console.log(createdPost);
    res.status(200).json({
      message: "Successfully created a post ",
    });
  } catch (err) {
    res.status(404).json({
      error: `Cannot create a post ${err}`,
    });
  }
};

export const getUserPosts = async (req: any, res: any) => {
  req.params.id = req.user.user_id;

  try {
    const { id } = req.params;
    const getUserPost = await getUserPostByQuery(id);
    console.log(id);
    res.status(200).json({
      message: "Successfully retrieved all user's posts ",
      data: getUserPost,
    });
  } catch (err) {
    res.status(404).json({
      error: `Cannot get all posts of an user ${err}`,
    });
  }
};
