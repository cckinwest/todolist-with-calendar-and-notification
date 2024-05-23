import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const token = localStorage.getItem("token");
  let user;

  if (token) {
    user = jwtDecode(token);
  }

  return (
    <header>
      <div>
        <ul className="menuList">
          <li className="menuItem">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="menuItem">
            <Link to="/login">Login</Link>
          </li>
          {user && (
            <li className="menuItem">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
