import React, { useEffect, useState, Fragment } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/user.json";
import { FaUserCircle, FaUnlockAlt } from "react-icons/fa";
const user = () => {
  const [user, setuser] = useState("");
  const [pw, setpw] = useState("");
  const [rpw, setrpw] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const ur = document.getElementById("user").value;
      const pass = document.getElementById("password").value;
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
      <body id="createuser1">
        <Lottie animationData={animationData} />
        <div className="wrapper1">
          <div className="form-box">
            <h2>Create New User</h2>
            <form action="#">
              <br />
              <div className="input-box1">
                <FaUserCircle className="icon1" />

                <input
                  type="Text"
                  id="user"
                  onChange={(e) => setuser(e.target.value)}
                  required
                />
                <label>UserName</label>
              </div>
              <br />
              <div className="input-box1">
                <FaUnlockAlt className="icon1" />

                <input
                  type="password"
                  id="password"
                  onChange={(e) => setpw(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              <br />
              <div className="input-box1">
                <FaUnlockAlt className="icon1" />

                <input
                  type="password"
                  id="re-password"
                  onChange={(e) => setrpw(e.target.value)}
                  required
                />
                <label>Re-Password</label>
              </div>
              <br />
              <button
                id="btn1"
                className="hover:text-2xl"
                onClick={handlesubmit}
              >
                Create
              </button>
            </form>
          </div>
        </div>{" "}
      </body>
    </>
  );
};

export default user;
