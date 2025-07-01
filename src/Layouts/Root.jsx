import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import LoginModal from "../Components/Modals/LoginModal";
import StateContext from "../Contexts/StateContext";

const Root = () => {
  // data aos setup
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animate only once per scroll
    });
  }, []);

  const { pathname } = useLocation();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <StateContext>
      <div>
        <Toaster />
        <Navbar />
        <Outlet />
        <Footer />
        <LoginModal />
      </div>
    </StateContext>
  );
};

export default Root;
