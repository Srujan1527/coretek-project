import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setError,
  setIsError,
  setNotIsError,
} from "../../state/state";
import userEvent from "@testing-library/user-event";

type Form = {
  email?: string;
  password?: string;
};

const defaultFormFields: Form = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const errorMsg = useSelector((state: any) => state.errorMsg);
  const isError = useSelector((state: any) => state.isError);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    dispatch(
      setError({
        errorMsg: null,
      })
    );
  };

  const loginInUser = async (e: any) => {
    e.preventDefault();
    try {
      const requestBody: string = JSON.stringify(formFields);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody !== undefined ? requestBody : "",
      };
      const loginUserResponse = await fetch(`${BASE_URL}/auth/login`, options);
      const loggedUser = await loginUserResponse.json();
      console.log(loggedUser);
      if (loggedUser && loggedUser.message === undefined) {
        dispatch(
          setLogin({
            user: loggedUser.data,
            token: loggedUser.token,
          })
        );
        dispatch(setNotIsError());
      } else if (loggedUser.message) {
        dispatch(
          setError({
            errorMsg: loggedUser.message,
          })
        );
        dispatch(setIsError());
      }

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col justify-center min-h-screen items-center">
      <form
        className="shadow-2xl flex flex-col justify-center items-center p-4 max-w-xl h-3/6 rounded-xl"
        onSubmit={loginInUser}
      >
        <div className="flex flex-col ">
          <h1 className="self-center mb-4 text-xl font-bold font-poppins">
            Login
          </h1>
          <label htmlFor="email " className="font-inter text-sm ">
            {" "}
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
            className="block border border-grey-light w-96 p-3 rounded mb-4"
            placeholder="Enter your Email"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="password" className="font-inter text-sm ">
            {" "}
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
            className="block border border-grey-light w-96 p-3 rounded mb-4"
            placeholder="Enter your Password"
          />
        </div>
        <button
          type="submit"
          className=" p-2 w-30 rounded bg-sky-400 text-slate-50 hover:bg-cyan-600 "
        >
          Login
        </button>
        {isError && <span className="text-red-500  text-sm">{errorMsg}</span>}
        <p className="text-sm mt-2">
          Don't have an account? Click here to{" "}
          <Link to="/signup">
            <span className="text-red-500 ">Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
