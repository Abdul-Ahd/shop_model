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
import { FaUserCircle, FaLock } from "react-icons/fa";

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
      <body className="bodylog">
        <div className="wrapper">
          <div className="form-box login">
            <h2>Welcome</h2>
            <form action="#">
              <br />
              <div className="input-box">
                <FaUserCircle className="icon" />

                <input
                  type="Text"
                  id="user"
                  onChange={(e) => setuser(e.target.value)}
                  required
                />
                <label>UserName</label>
              </div>
              <br />
              <div className="input-box">
                <FaLock className="icon" />

                <input
                  type="password"
                  id="password"
                  onChange={(e) => setpw(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              <br />

              <button id="btn1" className="hover:text-2xl" onClick={check}>
                LogIn
              </button>
            </form>
          </div>
        </div>
      </body>
    </>
  );
};
export default Login;
