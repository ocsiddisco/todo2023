import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  //   Default active class
  // By default, an active class is added to a <NavLink> component when it is active so you can use CSS to style it.

  // <nav id="sidebar">
  //   <NavLink to="/messages" />
  // </nav>
  // #sidebar a.active {
  //   color: red;
  // }

  // style
  // The style prop works like a normal style prop, but you can also pass it a function to customize the styles applied based on the active and pending state of the link.

  // <NavLink
  //   to="/messages"
  //   style={({ isActive, isPending }) => {
  //     return {
  //       fontWeight: isActive ? "bold" : "",
  //       color: isPending ? "red" : "black",
  //     };
  //   }}
  // >
  //   Messages
  // </NavLink>

  return (
    <nav className="navForm">
      <div className="container-a">
        <NavLink className="navlink register" to="/register">
          Register
        </NavLink>
      </div>
      <div className="container-a">
        <NavLink className="navlink signin" to="/signin">
          Sign In
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
