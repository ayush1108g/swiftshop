import * as React from "react";
import classes from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import SidebarContext from "../store/context/sidebar-context.js";
import CartContext from "../store/context/cart-context.js";
import LoginContext from "../store/context/login-context.js";
import { useContext,useState } from "react";
import Sidebar from "./sidebar.tsx";
import { useRef } from "react";
import ToggleTheme from "../store/utils/ToggleTheme.tsx";

import { useSelector } from "react-redux";
import { RootState } from "../store/utils/index.ts";
import MeterComp from "./MeterComp.tsx";
// import { useCookies } from "react-cookie";
// import verifyToken from "../store/utils/verifyToken.js";


interface NavStyle {
  backgroundColor: string,
    backdropFilter: string,
    transition: string,
}
interface NavbarProps {
  navStyle: NavStyle;
}
interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar :React.FC<NavbarProps> = ({ navStyle }) => {
  const color = useSelector((state : RootState) => state.themeMode.color);
  const cartCtx = useContext(CartContext);
  const loginCtx = useContext(LoginContext);
  const sidebarCtx = useContext<SidebarContextType>(SidebarContext);
  const searchinputref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState<boolean>(false);
  const isChecked = sidebarCtx.isSidebarOpen;
  const lengthx = cartCtx.cartItemNumber;


  let isLoggedIn = loginCtx.isLoggedIn;
  // = Boolean(localStorage.getItem("isLoggedIn")) || false;
  // let name:string = '-';
  // if (isLoggedIn) {
  //   name = localStorage.getItem("name") || 'xyz';
  // }
  console.log(loginCtx);
  const letter:any = isLoggedIn ? loginCtx.name?.[0] : '-';

  const sidebarHandler = ():void => {
    setClicked((prev) => !prev);
    !clicked && sidebarCtx.toggleSidebar();
  };

  const LoginPageHandler = ():void => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };
  
  const LogoutHandler = ():void => {
    localStorage.clear();
    cartCtx.clear();
    loginCtx.logout();
    navigate("/");
  }
  const contactUSHandler = ():void => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    else {
      navigate("/contactUs");
    }
  }
  const updateDetailHandler = ():void => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    navigate(`/updatedetail`);
  }

  const searchHandler = () => {
    const search: string|undefined = searchinputref.current?.value;
    if (!search) {
      return;
    }
    navigate(`/page/?search=${search.split(" ").join('+')}&page=1&limit=20&sort=null`);
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchHandler();
    }
  };
  const CartHandler = () => {
    if (isLoggedIn) {
      navigate(`/cart`);
    } else {
      navigate("/login");
    }
  }

  return (<>
    <AnimatePresence>
      {sidebarCtx.isSidebarOpen && <Sidebar />}
    </AnimatePresence>

    <div className={classes.navbar} style={{ ...navStyle, backgroundColor: color.navbg, gap: '10px' }}>
      <input
      type="checkbox"
      role="button"
      aria-label="Display the menu"
      className={classes.menu}
      checked={isChecked}
      onClick={(e) => sidebarHandler()}
      id="menuCheckbox"
    />
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
    <MeterComp/>
  </>
  );
};
export default Navbar;
