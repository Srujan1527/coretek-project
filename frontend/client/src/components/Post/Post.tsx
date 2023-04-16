import React, { useEffect } from "react";
import Navbar from "../NavBar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../helper";
import { setPosts } from "../../state/state";
import { Link } from "react-router-dom";

const Post = () => {
  useEffect(() => {
    fetchPosts();
  }, []);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.token);
  const statePosts = useSelector((state: any) => state.posts);
  const fetchPosts = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchPosts = await fetch(`${BASE_URL}/posts/`, options);
    const posts = await fetchPosts.json();
    if (posts) {
      dispatch(
        setPosts({
          posts: posts.data,
        })
      );
    }
    console.log(posts);
  };
  return (
    <div>
      <Navbar />

      <ul>
        {statePosts.map((each: any) => (
          <li key={each.post_id} className="border-2 m-2 rounded-lg">
            <h2 className="p-2 font-inter"> {each.post}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
