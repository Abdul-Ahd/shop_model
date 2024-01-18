import React, { useEffect, useState } from "react";
import { log, getCookie } from "../hook/auth";

import Login from "./login";
import Sidebar from "./menu/sidebar";
import Dashborad from "./menu/dashborad";
import Item from "./menu/item";
import User from "./menu/user";
import Sale from "./menu/sale";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import "./main.css";
const main = () => {
  const { tag1, set1 } = log();
  const [cookie, , removeCookie] = useCookies(["user"]);
  const user = getCookie("user");
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      alert("Loged OUT");
      set1((tag1) => !tag1);

      removeCookie("user");
    } catch (error) {
      alert(error);
    }
  };
  const [count, setCount] = useState(0);
  if (tag1) {
    return <Login />;
  } else {
    return (
      <>
        <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route path="/dashborad" element={<Dashborad />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/item" element={<Item />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </Sidebar>
        </BrowserRouter>
      </>
    );
  }
};

export default main;
