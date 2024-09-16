import React from "react";
import styled from "styled-components";
import { BASE_URL } from "../constants/config";
import { useState } from "react";
import axios from "axios";
import Register from "./Register";
import  { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart())

    try {

      const url = `${BASE_URL}/users/login`;

      const res = await axios.post(url, data);
      const token = res.data.data.accessToken;
      console.log(token + "access token : ");

    // Store the token
      const set=localStorage.setItem('accessToken', token);
      console.log(set);
      dispatch(loginSuccess(res.data.data));

      console.log(res.data.data);
      // const result = res.json()
      // console.log(result);
      if (res?.data?.success) {
        setData({
          username: "",
          email: "",
          password: "",
          avatar: "",
        });
        navigate("/");
      }

    } catch (error) {
      
      dispatch(loginFailure());
      console.log(error);
    }
  };

  return (
    <div className="mt-5 flex justify-center items-center">
      <div className="text-white border border-secondary max-w-sm p-6 w-full rounded-2xl overflow-hidden flex justify-center items-center flex-col m-7">
        <p className="text-2xl py-4">
          <span className="text-xl">
            <b>Login</b>
          </span>{" "}
          <span className="text-secondary font-bold">YT-HUB</span>
        </p>
        <p className="text-xl font-extralight">Login</p>
        <form
          className="flex justify-center flex-col w-full"
          onSubmit={handleLogin}
        >
          <table className="my-3 border-collapse w-full">
            <tbody>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="email">Email :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="border border-secondary rounded-md mx-2 px-2 my-2 text-base w-full text-black"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="username">Username :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="username"
                    id="name"
                    type="text"
                    className="text-black border border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                    value={data.username}
                    onChange={handleOnChange}
                    required
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="password">Password :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="text-black border border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                    value={data.password}
                    onChange={handleOnChange}
                    required
                  />
                </td>
              </tr>

              <tr className="my-3">
                <td colSpan="2" className="text-center">
                  <button
                    type="submit"
                    className="border w-full bg-secondary hover:bg-secondary2 border-secondary rounded-md my-4 mx-2 px-4 py-1 text-base text-white"
                  >
                    Login
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p>
          Don't have an Account?{" "}
          <Link to="/register" className="hover:text-secondary2 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
