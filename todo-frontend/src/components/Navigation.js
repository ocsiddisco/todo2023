import React from "react";
import profileIcon from "../Images/icons8-customer-60.png";
import goBackIcon from "../Images/icons8-arrow-60.png";
import { NavLink, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <nav className="navigation profile">
        <NavLink className="" to="/logout">
          <img
            className="imgNav"
            src={profileIcon}
            alt="log out icon"
            width="25px"
            height="25px"
          />
        </NavLink>
      </nav>
    );
  } else if (location.pathname === "/logout") {
    return (
      <nav className="navigation">
        <NavLink className="" to="/">
          <img
            className="imgNav goBackIcon"
            src={goBackIcon}
            alt="go back icon"
            width="25px"
            height="25px"
          />
        </NavLink>
        <NavLink className="" to="/logout">
          <img
            className="imgNav"
            src={profileIcon}
            alt="log out icon"
            width="25px"
            height="25px"
          />
        </NavLink>
      </nav>
    );
  } else {
    return <div className="placeholder-nav"></div>;
  }
}

export default Navigation;
