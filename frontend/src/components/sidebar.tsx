import React from 'react';
import styles from './sidebar.module.css';
import SidebarContext from "../store/context/sidebar-context";
import { useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate} from 'react-router-dom';
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import { useSelector } from 'react-redux';
import { useClickAway } from "react-use";
import { RootState } from '../store/utils';
import CartContext from '../store/context/cart-context';
import LoginContext from '../store/context/login-context';
import WishContext from '../store/context/wish-context';
import { useCookies } from 'react-cookie';
import { useAlert } from '../store/context/Alert-context';
import ToggleTheme from '../store/utils/ToggleTheme.tsx';


const Sidebar:React.FC = () => {
    const Alertctx = useAlert();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const wishCtx = useContext(WishContext);
    const [isopen, setisopen] = React.useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const color = useSelector((state:RootState) => state.themeMode.color);
    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);
    const sidebarCtx = useContext(SidebarContext);
    const loginCtx = useContext(LoginContext);

    const isLoggedIn = loginCtx.isLoggedIn;
    const lengthx = cartCtx.cartItemNumber;

    useClickAway(sidebarRef, () => {
        console.log("clicked outside");
        return closeSidebarHandler();
    });


    const logoutHandler = ():void => {
        removeCookie('token');
        localStorage.clear();
        cartCtx.clear();
        loginCtx.logout();
        wishCtx.clear();
        navigate("/");
        Alertctx.showAlert('success', 'Logged out successfully');
    };
    const cartHandler = () => {
       if(!isLoggedIn)
        Alertctx.showAlert('error', 'Please login to continue');
        else
        navigate(`/cart`);
        closeSidebarHandler();
    };
    const xyzHandler = () => {
        if (!isLoggedIn)
            navigate('/login');
        else
            navigate(`/updatedetail`);

        closeSidebarHandler();
    };
    const contactUsHandler = () => {
        if(!isLoggedIn) return Alertctx.showAlert('error', 'Please login to continue');
        navigate('/contactUs');
        closeSidebarHandler();
    }

    const closeSidebarHandler = () => {
        setisopen(false);
        setTimeout(() => {
            console.log("closing sidebar");
        sidebarCtx.toggleSidebar();
        }, 450);
    }

    const framerSidebarPanel = {
        initial: { x: '-150%' },
        animate: { x: 0 },
        exit: { x: '-150%', transition: { duration: 0.5 } },
        transition: { duration: 0.5 },
    }

    return (<div>

        <AnimatePresence mode='wait'>
            {sidebarCtx.isSidebarOpen && (
                <motion.div
                    key={isopen ? 'open' : 'closed'}
                    id="sidebar#"
                    {...framerSidebarPanel}
                    ref={sidebarRef}
                    className={`${styles.sidebar} ${sidebarCtx.isSidebarOpen ? '' : ''}`}
                    style={{ backgroundColor: color.navbg, color: color.bodyText }}
                >
                    <ul style={{ listStyle: 'none', color: color.text }}>
                        <li className={styles.li} style={{ color: color.text }} onClick={xyzHandler}>{isLoggedIn ? 'My Profile' : 'Login/Signup'}</li>
                        <li className={`d-block d-md-none d-flex align-items-center ${styles.li}`} onClick={cartHandler} style={{ color: color.text }}>Cart &nbsp;<FaShoppingCart/><sup style={{ color: color.cartCount}}>{lengthx === 0 ? ' ' : lengthx}</sup></li>
                        <li className={styles.li} onClick={contactUsHandler} style={{ color: color.text }}>Contact Us</li>
                        <li className={`d-block d-sm-none d-flex align-items-center ${styles.li}`} style={{ color: color.text }}> Theme&nbsp; <ToggleTheme />
                        </li>
                      {isLoggedIn && <li className={styles.li} onClick={logoutHandler} style={{ color: color.text }}>Logout</li>}
                    </ul>
                </motion.div>)}
        </AnimatePresence >
    </div>
    );
};

export default Sidebar;
