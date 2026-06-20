import React from "react";
import MainNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <MainNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
