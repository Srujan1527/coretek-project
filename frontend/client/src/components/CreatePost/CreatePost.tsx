import { useState } from "react";
import React from "react";
import Navbar from "../NavBar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../helper";
import { setIsError, setSuccessMsg } from "../../state/state";

type Form = {
  post?: string;
};
const defaultFormFields: Form = {
  post: "",
};

const CreatePost = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { post } = formFields;
  const token = useSelector((state: any) => state.token);
  const isError = useSelector((state: any) => state.isError);
  const responseMessage = useSelector((state: any) => state.successMsg);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    dispatch(
      setSuccessMsg({
        successMsg: null,
      })
    );
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const createPost = async () => {
    const requestBody: string = JSON.stringify(formFields);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    };

    const response = await fetch(`${BASE_URL}/posts/create-post`, options);

    const data = await response.json();
    console.log(data.message);

    if (data.message) {
      dispatch(setIsError());
      dispatch(
        setSuccessMsg({
          successMsg: data.message,
        })
      );
    }
    resetFormFields();
  };
  return (
    <>
      <Navbar />
      <div className="pt-16 flex flex-col justify-center items-center">
        <label className="font-inter font-bold text-xl m-5" id="post">
          Create Post
        </label>
        <input
          type="text"
          id="post"
          required
          onChange={handleChange}
          name="post"
          value={post}
          className="block border border-grey-light w-96 p-3 rounded mb-4"
          placeholder="Enter your Name"
        />
        {isError && (
          <span className="text-green-500  text-sm">{responseMessage}</span>
        )}
        <button
          className="mt-5 font-rubik p-1 text-sm h-10 w-30 rounded bg-sky-400  hover:bg-cyan-600 hover:text-cyan-50 "
          onClick={createPost}
        >
          Create Post
        </button>
      </div>
    </>
  );
};

export default CreatePost;
