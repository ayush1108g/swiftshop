import classes from "./Navbar.module.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import SidebarContext from "../store/sidebar-context";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import axios from 'axios';
import { ToLink } from '../App';
import { useRef } from "react";


const Navbar = (params) => {
  const sidebarCtx = useContext(SidebarContext);
  const searchinputref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname;
  const [lengthx, setLengthx] = useState(0);

  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;
  let name = '-';
  if (isLoggedIn) {
    name = localStorage.getItem("name") || 'xyz';
  }
  const letter = name[0];

  const sidebarHandler = () => {
    sidebarCtx.toggleSidebar();
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
    {sidebarCtx.isSidebarOpen && <Sidebar />}
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
      <div className="d-flex justify-content-center" onClick={CartHandler}>
        <FaShoppingCart style={{ fontSize: '2em' }} /><b style={{ color: 'red', }}>{lengthx === 0 ? ' ' : lengthx}</b>
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
              <li className="dropdown-item" onClick={() => { navigate('/team') }}>Our Team</li>
              <li onClick={LogoutHandler} className="dropdown-item" >Logout</li>
            </div>
          </div>
        </>}

    </div >
  </>
  );
};
export default Navbar;
