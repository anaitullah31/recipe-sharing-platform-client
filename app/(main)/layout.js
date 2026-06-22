import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getUserSession } from "../lib/core/session";

const MainLayout = async({ children }) => {
  const user = await getUserSession();
  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
