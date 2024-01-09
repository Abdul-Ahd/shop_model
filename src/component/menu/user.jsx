import React, { useEffect, useState, Fragment } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/user.json";
const user = () => {
  const [user, setuser] = useState("");
  const [pw, setpw] = useState("");
  const [rpw, setrpw] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const ur = document.getElementById("user2").value;
      const pass = document.getElementById("pass").value;
      if (!ur.trim() || !pw.trim()) {
        alert("Enter Data First");
      } else {
        const newuser = { user, pw };
        const res = await fetch("http://localhost:3000/task");

        if (res.ok) {
          const response = await fetch("http://localhost:3000/task", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();

          if (data.find((item) => item.user === ur)) {
            alert("User Name Already Taken");
          } else {
            if (pw === rpw) {
              const response = await fetch("http://localhost:3000/task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newuser),
              });
              const data1 = await response.json();
              console.log(data1);
              alert("user created");
            } else {
              alert("Password does not match ");
            }
          }
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div id="createuser1">
        <div
          margin-top="850"
          id="cuser"
          className="text-center sapce-y-4  backdrop-blur-2 "
        >
          <form action="">
            <h1 className="text-3xl font-bold text-black-100">
              Create New User
            </h1>
            <br />
            <label hrmlfor="user2" className="text-2xl font-semibold">
              Username:{"   "}
            </label>
            <input
              className=" text-justify text-2xl"
              type="text"
              name="user2"
              id="user2"
              onChange={(e) => setuser(e.target.value)}
            />
            <br />
            <br />
            <label className="text-2xl font-semibold" hrmlfor="Pass">
              Password:{"   "}
            </label>
            <input
              className=" text-justify text-2xl "
              type="password"
              name="pass"
              id="pass"
              onChange={(e) => setpw(e.target.value)}
            />
            <br />
            <br />
            <label className="text-2xl font-semibold" hrmlfor="Re-Pass">
              Re-Password:{" "}
            </label>
            <input
              className=" text-justify text-2xl "
              type="password"
              name="re-password"
              id="re-password"
              onChange={(e) => setrpw(e.target.value)}
            />
            <br />
            <br />
            <button id="btn1" className="hover:text-2xl" onClick={handlesubmit}>
              create
            </button>
          </form>
        </div>{" "}
        <Lottie animationData={animationData} id="ani2" />
      </div>
    </>
  );
};

export default user;
