import React, { useState } from "react";
import { FaTh, FaUserEdit, FaBars } from "react-icons/fa";
import { MdOutlineInventory, MdOutlinePointOfSale } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { log, getCookie } from "../../hook/auth";
import { CiMenuKebab, CiLogout } from "react-icons/ci";
import { CookiesProvider, useCookies } from "react-cookie";

const sidebar = ({ children }) => {
  const [cookie, , removeCookie] = useCookies(["user"]);
  const [isopen, setisopen] = useState(false);
  const { tag1, set1 } = log();
  const toggle = () => setisopen(!isopen);
  const user = getCookie("user");
  function refreshPage() {
    window.location.reload(false);
  }
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      alert("Loged OUT");
      set1((tag1) => !tag1);

      removeCookie("user");
      refreshPage();
    } catch (error) {
      alert(error);
    }
  };
  const menuItem = [
    {
      path: "/dashborad",
      name: "DashBorad",
      icon: <FaTh />,
    },
    {
      path: "/Sale",
      name: "Sale's",
      icon: <MdOutlinePointOfSale />,
    },
    {
      path: "/item",
      name: "Item",
      icon: <MdOutlineInventory />,
    },
    {
      path: "/user",
      name: "User",
      icon: <FaUserEdit />,
    },
    {
      path: "/test",
      name: "Test",
      icon: <FaUserEdit />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isopen ? "200px" : "50px" }} className="sidebar">
        <div className="topsection">
          <h1 style={{ display: isopen ? "block" : "none" }} className="logo">
            {user}
          </h1>
          <div style={{ marginLeft: isopen ? "60px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activecalssname="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isopen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <button
          className="btn"
          onClick={handleLogout}
          style={{ display: isopen ? "block" : "none" }}
        >
          Logout
        </button>
      </div>
      <main>{children}</main>
    </div>
  );
};
export default sidebar;
