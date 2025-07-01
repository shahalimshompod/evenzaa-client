import React from "react";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
import logoWhite from "../../public/assets/logo/logo-white.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Brand Name */}
        <div className="text-2xl font-semibold">
          <Link to="/" className="flex items-center gap-3">
            <img className="w-10" src={logoWhite} alt="Eventora logo" />
            <span className={`text-3xl marcel text-white`}>
              EVEN<span className="text-[#FE3E01]">T</span>ORA
            </span>
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4 md:mt-0 sand">
          &copy; 2025 Eventora. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="#"
            className="text-white hover:text-yellow-400 transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="text-white hover:text-yellow-400 transition-colors"
          >
            <FaXTwitter />
          </a>
          <a
            href="#"
            className="text-white hover:text-yellow-400 transition-colors"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
