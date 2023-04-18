import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../NavBar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../helper";
import { setPosts } from "../../state/state";

import { getTimeDiff } from "../utils/utils";

// type Form = {
//   comment?: string;
// };
const defaultFormFields: any = {
  comment: "",
};

const Post = () => {
  useEffect(() => {
    const fetchAll = async () => {
      await fetchPosts();
      await fetchAllComments();
    };
    fetchAll();
  }, []);
  const [allPostComments, setAllPostComments] = useState([]);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [clickedPostId, setClickedPostId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.token);
  const statePosts = useSelector((state: any) => state.posts);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    // dispatch(
    //   setSuccessMsg({
    //     successMsg: null,
    //   })
    // );
  };
  const fetchPosts = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchPosts = await fetch(`${BASE_URL}/posts/`, options);
    const posts = await fetchPosts.json();
    // const commentsList = statePosts.map(
    //   async (post: any) => await fetchAllComments(post.post_id)
    // );
    // console.log(commentsList);
    if (posts) {
      dispatch(
        setPosts({
          posts: posts.data,
        })
      );
    }
  }, [dispatch, token]);

  const fetchAllComments = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const commentsResponse = await fetch(`${BASE_URL}/comments/`, options);
    const commentsData = await commentsResponse.json();

    if (commentsData.data) {
      setAllPostComments(commentsData.data);
    }
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleClickPost = (postId: string) => {
    setClickedPostId(postId === clickedPostId ? null : postId);
  };

  const createPost = async (post_id: any) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formFields),
    };

    const commentResponse = await fetch(
      `${BASE_URL}/comments/create-comment/${post_id}`,
      options
    );
    const response = await commentResponse.json();
    console.log(response);
    resetFormFields();
  };
  return (
    <div>
      <Navbar />

      <ul className="pt-10 ">
        {statePosts.map((each: any) => {
          const returnedHumanizedTimeDiff = getTimeDiff(each);

          const postComments = allPostComments.filter(
            (comment: any) => comment.post_id === each.post_id
          );
          const isPostClicked = each.post_id === clickedPostId;
          return (
            <li
              key={each.post_id}
              className="border-2 m-2 rounded-lg flex flex-col"
            >
              <h2 className="p-2 font-inter"> {each.post}</h2>
              <div className="flex mb-1">
                <p className="text-slate-500 text-xs ml-1">
                  {returnedHumanizedTimeDiff} |
                </p>
                <p
                  className="text-slate-500 text-xs ml-1 hover:underline hover:text-orange-500 cursor-pointer "
                  onClick={() => handleClickPost(each.post_id)}
                >
                  <span>{postComments.length} </span>Comments
                </p>
              </div>
              {isPostClicked && (
                <ul className="flex flex-col justify-center items-center">
                  <h4 className="text-lg  text-orange-500 font-rubik font-bold">
                    Comments
                  </h4>
                  <div>
                    {postComments.map((each: any, index) => (
                      <li
                        key={each.comment_id}
                        className="font-rubik text-xs mb-1"
                      >
                        <p className="text-sm">
                          {" "}
                          {index + 1}. {each.comment}{" "}
                          <span className="text-slate-500 text-xs ml-1 font-poppins">
                            --postedBy{" "}
                            <span className="text-green-500 text-sm">
                              {each.user_name}{" "}
                            </span>
                          </span>
                        </p>
                      </li>
                    ))}
                  </div>
                  <div className="flex flex-col w-80">
                    <input
                      className="  border-2 w-full p-4 rounded mb-4 mr-3 text-xs font-rubik h-24"
                      type="text"
                      placeholder="Write your Comment"
                      name="comment"
                      value={formFields.comment}
                      onChange={handleChange}
                    />
                    <button
                      className=" p-2 w-fit rounded bg-gray-400 text-slate-50 hover:bg-cyan-600 text-xs"
                      onClick={async () => await createPost(each.post_id)}
                    >
                      Create Comment
                    </button>
                  </div>
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Post;
