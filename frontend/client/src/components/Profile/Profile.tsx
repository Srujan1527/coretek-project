import React from "react";
import Navbar from "../NavBar/Navbar";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const { user_name, email } = user;
  return (
    <>
      <Navbar />

      <div className="my-40 flex  flex-col justify-center items-center">
        <h1 className="font-poppins text-lg">
          {" "}
          User: <span className="text-red-600 font-rubik">{user_name}</span>
        </h1>
        <h2 className="font-poppins text-lg">
          {" "}
          Email:<span className="text-red-600 font-rubik"> {email}</span>
        </h2>
      </div>
    </>
  );
};

export default Profile;
