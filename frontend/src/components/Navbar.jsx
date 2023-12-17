import classes from "./Navbar.module.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import SidebarContext from "../store/sidebar-context";
import { useContext } from "react";
// import { useState } from 'react';
import { useRef } from "react";
const Navbar = (params) => {
  const sidebarCtx = useContext(SidebarContext);
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname;
  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;
  const searchinputref = useRef();

  let name = '-';
  if (isLoggedIn) {
    name = localStorage.getItem("name") || 'xyz';
  }
  const letter = name[0];

  const sidebarHandler = () => {
    sidebarCtx.toggleSidebar();
    console.log(sidebarCtx);
  };
  console.log(sidebarCtx);



  const LoginPageHandler = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };
  const HomePageHandler = () => {
    navigate("/");
  }
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

  const searchHandler = () => {
    const search = searchinputref.current.value;
    console.log(search);
    navigate(`/page/?search=${search.split(" ").join('+')}&page=1&limit=20&sort=null`);
    searchinputref.current.value = '';
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchHandler();
    }
  };
  return (
    <div className={classes.navbar}>
      <GiHamburgerMenu onClick={sidebarHandler} />
      <div className="input-group" style={{ maxWidth: '50vw' }}>
        <input ref={searchinputref} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onKeyPress={handleKeyPress} />
        <button onClick={searchHandler} type="button" className="btn btn-outline-primary" data-mdb-ripple-init>Search</button>

      </div>
      {!isLoggedIn && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={classes.nav1}
          onClick={LoginPageHandler}
        >
          Login / Signup
        </motion.div>
      )}
      {locationPath !== "/" && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={classes.nav1}
          onClick={HomePageHandler}
        >
          Home Page
        </motion.div>
      )}
      <div className="d-flex justify-content-center">
        <FaShoppingCart style={{ fontSize: '2em' }} />
        <h3 style={{ userSelect: 'none' }}>Cart</h3>
      </div>
      {isLoggedIn &&
        <>
          <div className="dropdown" >
            <button className="btn"
              // style={{ backgroundColor: 'rgba(160,204,216,255)' }} 
              type="button" id="dropdownMenuButton" data-toggle="dropdown" >
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
