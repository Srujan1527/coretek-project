import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper";

type Form = {
  name?: string;
  email?: string;
  password?: string;
};

const defaultFormFields: Form = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password } = formFields;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // const formData= new FormData()
    // formData.append("name", name);
    // formData.append("email", email);
    // formData.append("password", password);
    // console.log(formFields);
    const requestBody: string = JSON.stringify(formFields);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody !== undefined ? requestBody : "",
    };
    const savedUserResponse = await fetch(`${BASE_URL}/auth/signup`, options);
    const savedUser = await savedUserResponse.json();
    console.log(savedUser);
    navigate("/login");
  };
  return (
    <div className="flex flex-col justify-center min-h-screen items-center">
      <form
        className="shadow-2xl flex flex-col justify-center items-center p-4 max-w-xl h-3/6 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col ">
          <h1 className="self-center mb-4 text-xl font-bold font-poppins">
            SignUp
          </h1>
          <label htmlFor="name" className="mb-2 font-inter text-sm">
            {" "}
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            onChange={handleChange}
            name="name"
            value={name}
            className="block border border-grey-light w-96 p-3 rounded mb-4"
            placeholder="Enter your Name"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="email" className="mb-2 font-inter text-sm">
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
          <label htmlFor="password" className="mb-2 font-inter text-sm">
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
          Sign up
        </button>
        <p className="text-sm mt-2">
          Already an User? Click here to{" "}
          <Link to="/login">
            <span className="text-red-500 ">log in</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
