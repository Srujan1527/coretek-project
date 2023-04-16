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
    <div>
      <nav className="h-1/5 flex justify-between bg-neutral-200">
        <div>
          <h1 className="p-2 ml-5 font-rubik cursor-pointer" onClick={() => navigate("/")}>
            Hacker News
          </h1>
        </div>
        <div className="flex">
          <ul className="flex mr-10 ">
            <Link to="/posts">
              <li className="p-2 font-rubik">Posts</li>
            </Link>
            <Link to="/profile">
              <li className="p-2 font-rubik">Profile</li>
            </Link>
          </ul>
          <button className="mr-5 font-rubik" onClick={logOutUser}>
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
