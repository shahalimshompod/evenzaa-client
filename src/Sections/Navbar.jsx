import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import logoBlack from "../../public/assets/logo/logo-black.png";
import logoWhite from "../../public/assets/logo/logo-white.png";
import { FaUserCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { motion, AnimatePresence } from "framer-motion";
import { StateManagementContext } from "../Contexts/StateContext";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUser from "../Hooks/userUser";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // axiosPublic instance
  const axiosPublic = useAxiosPublic();

  // axiosSecure instance
  const axiosSecure = useAxiosSecure();

  //   getting user
  const { isLoggedIn } = useAuth();

  // getting user data
  const { userData } = useUser();

  console.log(userData);

  const user = isLoggedIn;

  console.log(user);

  const path = location.pathname;
  const role = userRole?.role;

  const data = useContext(StateManagementContext);
  const { setIsLoginModalOpen, setIsLoggedIn } = data;

  // fetch all events data
  const fetchUserData = async () => {
    const res = await axiosPublic.get(`/users?email=${user?.email}`);
    if (res?.data) {
      setUserRole(res?.data);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserData();
    }
  }, [user, axiosPublic]);

  // handle log out
  const handleLogout = async () => {
    try {
      const res = await axiosSecure.post("/logout");
      if (res?.data.token === null) {
        localStorage.removeItem("user_access_token");
        toast.success(`${res?.data.message}`);
        setIsLoggedIn(!!localStorage.getItem("user_access_token"));
      }
    } catch (error) {
      toast.error(`${error}`);
    }

    setMenuOpen(false);
  };

  // handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Toggle hamburger menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Toggle search modal
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (!searchOpen) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchOpen && e.target.closest(".search-modal") === null) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Define routes
  const routes = [
    { path: "/", label: "Home" },
    ...(user
      ? [
          { path: "/events", label: "Events" },
          { path: "/my-events", label: "My Events" },
          { path: "/add-event", label: "Add Event" },
        ]
      : []),
    { path: "/about-us", label: "About Us" },
  ];

  // Dynamic styles
  const isHome = path === "/";
  const bgClass = isHome && !scrolled ? "bg-transparent" : "bg-white";
  const textColor = isHome && !scrolled ? "text-white" : "text-black";

  return (
    <div className="shadow-sm">
      {/* Search Overlay Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="search-modal w-full max-w-2xl"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="w-full bg-transparent text-white text-2xl md:text-4xl font-light pb-2 border-b-2 border-white/50 focus:border-[#FE3E01] focus:outline-none placeholder-white/70"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-2 text-white hover:text-[#FE3E01] transition-colors"
                >
                  <FaSearch size={24} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div
        className={`fixed top-0 left-0 right-0 z-40 py-4 transition duration-300 ${bgClass}`}
      >
        <div className="navbar container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              className="w-10"
              src={isHome && !scrolled ? logoWhite : logoBlack}
              alt="Eventora logo"
            />
            <span className={`text-3xl marcel ${textColor}`}>
              EVEN<span className="text-[#FE3E01]">T</span>ORA
            </span>
          </Link>

          {/* Desktop menu */}
          <ul
            className={`hidden lg:flex menu-horizontal sand text-base md:text-lg gap-6 ${textColor}`}
          >
            {routes.map(({ path: routePath, label }) => (
              <li key={routePath}>
                <NavLink
                  to={routePath}
                  className={({ isActive }) =>
                    isActive
                      ? isHome && !scrolled
                        ? "font-bold text-[#FE3E01]"
                        : "font-bold text-[#FE3E01]"
                      : isHome && !scrolled
                      ? "hover:bg-white/20 px-3 py-1 rounded-md transition text-white"
                      : "hover:bg-black/10 px-3 py-1 rounded-md transition text-black"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Hamburger and profile */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button
              onClick={toggleSearch}
              className={`text-xl ${textColor} hover:text-[#FE3E01] transition-colors`}
              aria-label="Search"
            >
              <FaSearch />
            </button>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden text-2xl ${textColor}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Profile Dropdown */}
            {user ? (
              <div className="dropdown dropdown-end relative">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn bg-transparent btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {userData?.image ? (
                      <img alt="Profile" src={userData?.image} />
                    ) : (
                      <FaUserCircle className={`${textColor}`} size={38} />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-fit p-2 z-50"
                >
                  <li className="p-2">
                    <h1 className="font-black text-lg truncate sand">
                      {userData?.name}
                    </h1>
                    <h4 className="font-semibold text-sm truncate sand">
                      {userData?.email}
                    </h4>
                  </li>
                  <div className="divider my-2"></div>
                  <li>
                    <NavLink
                      to="/my-profile"
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive ? "bg-amber-100" : ""
                      }
                    >
                      <span className="text-lg sand">Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <p className="cursor-pointer" onClick={handleLogout}>
                      <span className="text-lg sand">Logout</span>
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="sand btn border-none shadow-none hover:bg-[#FE3E01] text-black bg-white rounded-none transition ease-in duration-300 hover:text-white"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white text-black px-6 py-4">
            <ul className="flex flex-col gap-4 quick font-semibold text-base sand">
              {routes.map(({ path: routePath, label }) => (
                <li key={routePath}>
                  <NavLink
                    to={routePath}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#FE3E01]/80 text-white rounded-md px-3 py-1 block"
                        : "hover:bg-white/20 px-3 py-1 rounded-md block transition"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              {user && (
                <li>
                  <NavLink
                    to="/my-profile"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#FE3E01]/80 text-white rounded-md px-3 py-1 block"
                        : "hover:bg-white/20 px-3 py-1 rounded-md block transition"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="w-full btn quick border-none text-[#FE3E01]"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
