import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link className="navbar-logo" to={"/all-notes"}>Logo</Link>
      <span className="welcome-text">Welcome User</span>
    </div>
  );
};

export default NavBar;