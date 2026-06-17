import React from "react";
import MainNavbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <MainNavbar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
