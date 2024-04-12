import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <ul className="nav-link">
        <li className="nav-item">
          <Link to="/">Posts List</Link>
        </li>
        <li>
          <Link to="/new">New Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
