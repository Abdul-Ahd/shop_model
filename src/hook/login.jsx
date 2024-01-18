import React, { useEffect, useState } from "react";
import Main from "../component/main";
async function auth(ps, ur) {
  const response = await fetch("http://localhost:3000/task", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  const found = data.find((item) => item.user === ur);
  if (!found) {
    console.log("Incorrect user");
    return 0;
  } else {
    const { user, pw } = found;

    if (pw === ps) {
      console.log("login aproved");
      return 1;
    } else {
      console.log("incorrect Password");
      return 0;
    }
  }
}
async function dupilate(ur) {
  const response = await fetch("http://localhost:3000/task", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  data.find((item) => item.user === ur);
  item.user && alert("user already taken");
}

export { dupilate, auth };
