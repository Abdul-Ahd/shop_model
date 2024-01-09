import React, { useEffect, useState, Fragment } from "react";
import Main from "./main";
import "./login.css";
import Lottie from "lottie-react";
import ani from "../assets/back.json";
import { auth } from "../hook/login";
import { log } from "../hook/auth";
import { Dialog, Transition } from "@headlessui/react";
import { CookiesProvider, useCookies } from "react-cookie";
import App from "../App";

const Login = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const { tag1, set1 } = log();
  const [user, setuser] = useState("");
  const [pw, setpw] = useState("");
  const check = async (e) => {
    e.preventDefault();
    const result = await auth(pw, user);
    if (result === 1) {
      set1((tag1) => !tag1);
      setCookie("user", user, { expires: new Date("2025-01-01") });
    } else if (result === 0) {
      nouser();
    }
  };
  if (tag1) {
    return (
      <>
        <Main />
      </>
    );
  }
  return (
    <>
      <div id="main">
        <div align="center" margin-top="850" id="fm">
          <form id="f1">
            <h1 className="text-3xl font-bold text-black-100">Welcome</h1>
            <br />
            <label hrmlfor="user" className="text-2xl font-semibold">
              Username:{" "}
            </label>
            <input
              className=" text-justify text-2xl"
              type="text"
              name="user"
              id="user"
              onChange={(e) => setuser(e.target.value)}
            />
            <br />
            <br />
            <label className="text-2xl font-semibold" hrmlfor="password">
              Password:{" "}
            </label>
            <input
              className=" text-justify text-2xl "
              type="password"
              name="password"
              id="password"
              onChange={(e) => setpw(e.target.value)}
            />
            <br />
            <br />
            <button id="btn1" className="hover:text-2xl" onClick={check}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
