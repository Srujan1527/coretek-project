import React, { useEffect } from "react";
import Navbar from "../NavBar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../helper";
import { setPosts } from "../../state/state";
import { Link } from "react-router-dom";
import moment from "moment";

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

      <ul className="pt-10">
        {/* {statePosts.map((each: any) => (
          <li key={each.post_id} className="border-2 m-2 rounded-lg">
            <h2 className="p-2 font-inter"> {each.post}</h2>
            <p>{each.created_at}</p>
          </li>
        ))} */}
        {statePosts.map((each: any) => {
          const postTimeStamp = each.created_at;
          console.log(postTimeStamp);
          const postDate: any = new Date(postTimeStamp);
          console.log(postDate);
          const currentDate: any = new Date();
          console.log(currentDate);
          const timeDiffInMillis = currentDate - postDate;
          console.log(timeDiffInMillis);
          const duration = moment.duration(timeDiffInMillis);
          console.log(duration);
          let humanizedTimeDiff;
          if (duration.asSeconds() < 60) {
            humanizedTimeDiff = `posted ${Math.floor(
              duration.asSeconds()
            )} seconds ago`;
          } else if (duration.asMinutes() < 60) {
            humanizedTimeDiff = `posted ${Math.floor(
              duration.asMinutes()
            )} minutes ago`;
          } else if (duration.asHours() < 24) {
            humanizedTimeDiff = `posted ${Math.floor(
              duration.asHours()
            )} hours ago`;
          } else {
            humanizedTimeDiff = `posted ${Math.floor(
              duration.asDays()
            )} days ago`;
          }
          return (
            <li key={each.post_id} className="border-2 m-2 rounded-lg">
              <h2 className="p-2 font-inter"> {each.post}</h2>
              <p className="text-slate-500 text-xs ml-1">{humanizedTimeDiff}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Post;
