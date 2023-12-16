import classes from "./Navbar.module.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import SidebarContext from "../store/sidebar-context";
import { useContext } from "react";
// import { useState } from 'react';
const Navbar = (params) => {
  const sidebarCtx = useContext(SidebarContext);
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname;
  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;

  let name = '-';
  if (isLoggedIn) {
    name = localStorage.getItem("name") || 'xyz';
  }
  const letter = name[0];

  const sidebarHandler = () => {
    sidebarCtx.toggleSidebar();
  };
  console.log(sidebarCtx);
  const LoginPageHandler = () => {
    if (locationPath === "/") {
      navigate("/login");
    } else {
      navigate("/");
    }
  };
  const LogoutHandler = () => {
    localStorage.clear();
    navigate("/");
  }
  const contactUSHandler = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    else {
      navigate("/contactUs");
    }
  }
  const updateDetailHandler = () => {
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/login");
    }
    navigate(`/${id}/updatedetail`);
  }

  return (
    <div className={classes.navbar}>
      <GiHamburgerMenu onClick={sidebarHandler} />
      <h1>Navbar</h1>
      {/* <div>Contact Us</div> */}
      {/* <motion.div> */}
      {locationPath === "/" && (
        <motion.button
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`nav-link`}
          onClick={LoginPageHandler}
        >
          Login Page
        </motion.button>
      )}
      {locationPath !== "/" && (
        <motion.button
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="nav-link"
          onClick={LoginPageHandler}
        >
          Home Page
        </motion.button>
      )}
      {/* </motion.div> */}

      {isLoggedIn &&
        <>
          <div className="dropdown" >
            <button className="btn btn-secondary" style={{ backgroundColor: 'rgba(160,204,216,255)' }} type="button" id="dropdownMenuButton" data-toggle="dropdown" >
              <div className={classes.circle}> <span className={classes.initial}>{letter}</span></div>
            </button>
            <div className="dropdown-menu bg-light" aria-labelledby="dropdownMenuButton">
              <li onClick={updateDetailHandler} className="dropdown-item" >Update Details</li>
              <li onClick={contactUSHandler} className="dropdown-item">Contact Us</li>
              <li onClick={LogoutHandler} className="dropdown-item" >Logout</li>
            </div>
          </div>
        </>}
    </div>

  );
};
export default Navbar;
