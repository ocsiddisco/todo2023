import React from "react";
import Navigation from "./Navigation";
import { Toaster } from "react-hot-toast";

function Header() {
  return (
    <header>
      <Navigation />
      <h1 className="title">My personal Todo List</h1>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </header>
  );
}

export default Header;
