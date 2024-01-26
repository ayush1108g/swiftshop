import React from 'react';
import styles from './sidebar.module.css';
import SidebarContext from "../store/context/sidebar-context";
import { useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useClickAway } from "react-use";
import { RootState } from '../store/utils';
import CartContext from '../store/context/cart-context';
import LoginContext from '../store/context/login-context';
import WishContext from '../store/context/wish-context';
import { useCookies } from 'react-cookie';
import { useAlert } from '../store/context/Alert-context';


const Sidebar:React.FC = () => {
    const Alertctx = useAlert();
    const wishCtx = useContext(WishContext);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const color = useSelector((state:RootState) => state.themeMode.color);
    const navigate = useNavigate();
const cartCtx = useContext(CartContext);
    const sidebarCtx = useContext(SidebarContext);
    const loginCtx = useContext(LoginContext);
    const isLoggedIn = loginCtx.isLoggedIn;
    const sidebarRef = useRef<HTMLDivElement>(null);

    useClickAway(sidebarRef, () => {
        console.log("clicked outside");
        return sidebarCtx.toggleSidebar();
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
        sidebarCtx.toggleSidebar()
    };
    const xyzHandler = () => {
        if (!isLoggedIn)
            navigate('/login');
        else
            navigate(`/updatedetail`);

        sidebarCtx.toggleSidebar()
    };
    const contactUsHandler = () => {
        if(!isLoggedIn) return Alertctx.showAlert('error', 'Please login to continue');
        navigate('/contactUs');
        sidebarCtx.toggleSidebar()
    }

    const framerSidebarPanel = {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '100%', transition: { duration: 0.3 } },
        transition: { duration: 0.3 },
    }

    return (<div>

        <AnimatePresence mode='wait'>
            {sidebarCtx.isSidebarOpen && (
                <motion.div
                    key="open"

                    id="sidebar#"
                    // variants={animateVariants}
                    // animate="show"
                    // exit="exit"
                    {...framerSidebarPanel}
                    ref={sidebarRef}
                    className={`${styles.sidebar} ${sidebarCtx.isSidebarOpen ? '' : ''}`}
                    style={{ backgroundColor: color.navbg, color: color.bodyText }}
                >
                    <motion.ul style={{ listStyle: 'none', color: color.text }}>
                        <motion.li className={styles.li} onClick={() => {
                            navigate('/team');
                            sidebarCtx.toggleSidebar()
                        }} style={{ color: color.text }}>Our Team</motion.li>
                        <motion.li className={styles.li} style={{ color: color.text }} onClick={xyzHandler}>{isLoggedIn ? 'My Profile' : 'Login/Signup'}</motion.li>
                        <motion.li className={styles.li} onClick={cartHandler} style={{ color: color.text }}>Cart</motion.li>
                        <motion.li className={styles.li} onClick={contactUsHandler} style={{ color: color.text }}>Contact Us</motion.li>
                      {isLoggedIn && <motion.li className={styles.li} onClick={logoutHandler} style={{ color: color.text }}>Logout</motion.li>}
                        <motion.li className={styles.li} onClick={() => { sidebarCtx.toggleSidebar() }} style={{ color: color.text }}>Close</motion.li>
                    </motion.ul>
                </motion.div>)}
        </AnimatePresence >
    </div>
    );
};

export default Sidebar;