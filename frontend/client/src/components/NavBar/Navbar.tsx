import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../state/state";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(setLogOut());
    navigate("/login");
  };
  return (
    <div className="box-border t-0">
      <nav className=" fixed top-0 left-0 right-0 z-50 flex justify-between bg-neutral-200 ">
        <div>
          <h1
            className="p-2 ml-5 font-rubik cursor-pointer"
            onClick={() => navigate("/")}
          >
            Hacker News
          </h1>
        </div>
        <div className="flex">
          <ul className="flex mr-10 ">
            <Link to="/posts">
              <li className="p-2 font-rubik hover:text-red-500">Posts</li>
            </Link>
            <Link to="/create-post">
              <li className="p-2 font-rubik hover:text-red-500">Create Post</li>
            </Link>
            <Link to="/profile">
              <li className="p-2 font-rubik hover:text-red-500">Profile</li>
            </Link>
          </ul>
          <button
            className="mr-5 font-rubik p-1 text-sm h-10 w-30 rounded bg-sky-400  hover:bg-cyan-600 hover:text-cyan-50 "
            onClick={logOutUser}
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
