import classes from "./Navbar.module.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import SidebarContext from "../store/sidebar-context";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import axios from 'axios';
import { ToLink } from '../App';
import { useRef } from "react";
import ToggleTheme from "../store/utils/ToggleTheme";

import { useSelector } from "react-redux";

const Navbar = ({ navStyle }) => {
  const color = useSelector((state) => state.themeMode.color);
  const sidebarCtx = useContext(SidebarContext);
  const searchinputref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname;
  const [lengthx, setLengthx] = useState(0);
  const [clicked, setClicked] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;
  let name = '-';
  if (isLoggedIn) {
    name = localStorage.getItem("name") || 'xyz';
  }
  const letter = name[0];

  const sidebarHandler = (event) => {
    setClicked((prev) => !prev);
    !clicked && sidebarCtx.toggleSidebar();
  };

  useEffect(() => {
    const send = async () => {
      const userid = localStorage.getItem("id");
      if (userid === null || userid === undefined || userid === '')
        return;

      try {
        const resp = await axios.get(`${ToLink}/cart/${userid}`);
        let length = 0;
        resp.data.data.cart.forEach((item) => {
          length += item.quantity;
        });
        setLengthx(length);
      } catch (err) {
        console.log(err);
      }
    }
    send();
  }, []);
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
    navigate(`/page/?search=${search.split(" ").join('+')}&page=1&limit=20&sort=null`);
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchHandler();
    }
  };
  const CartHandler = () => {
    const userid = localStorage.getItem("id");
    if (userid) {
      navigate(`/${userid}/cart`);
    } else {
      navigate("/login");
    }
  }

  return (<>
    <AnimatePresence>
      {sidebarCtx.isSidebarOpen && <Sidebar />}
    </AnimatePresence>
    <div className={classes.navbar} style={{ ...navStyle, backgroundColor: color.navbg, gap: '10px' }}>
      <GiHamburgerMenu onClick={(e) => sidebarHandler(e)} style={{ minWidth: '24px' }} />
      <div className="input-group" style={{ maxWidth: '50vw', backgroundColor: color.navbg }}>
        <input ref={searchinputref} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onKeyPress={handleKeyPress} style={{
          color: color.text,
          borderColor: 'black', backgroundColor: color.navbg,
        }} />
        <button onClick={searchHandler} type="button" className="d-none d-md-block btn btn-outline-primary d-block " data-mdb-ripple-init>Search</button>

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
      <div className="d-flex justify-content-center" onClick={CartHandler}>
        <FaShoppingCart style={{ fontSize: '2em', color: color.itembg1 }} /><b><sup style={{ color: color.cartCount, }}>{lengthx === 0 ? ' ' : lengthx}</sup></b>
        <h3 style={{ userSelect: 'none', color: color.itembg1 }}>Cart</h3>
      </div>
      <ToggleTheme />
      {isLoggedIn &&
        <>
          <div className="dropdown" >
            <button className="btn"
              // style={{ backgroundColor: 'rgba(160,204,216,255)' }} 
              type="button" id="dropdownMenuButton" data-toggle="dropdown">
              <div className={classes.circle} style={{ background: color.itembg1 }}> <span className={classes.initial} >{letter}</span></div>
            </button>
            <div className="dropdown-menu bg-light" aria-labelledby="dropdownMenuButton"
              style={{ backgroundColor: color.itembg3, color: color.text, padding: '0px' }}
            >
              <li onClick={updateDetailHandler} className="dropdown-item" style={{ backgroundColor: color.itembg3, color: color.text }}>Update Details</li>
              <li onClick={contactUSHandler} className="dropdown-item" style={{ backgroundColor: color.itembg3, color: color.text }}>Contact Us</li>
              <li className="dropdown-item" onClick={() => { navigate('/team') }} style={{ backgroundColor: color.itembg3, color: color.text }}>Our Team</li>
              <li onClick={LogoutHandler} className="dropdown-item" style={{ backgroundColor: color.itembg3, color: color.text }}>Logout</li>
            </div>
          </div>
        </>}

    </div >
  </>
  );
};
export default Navbar;
