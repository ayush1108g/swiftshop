import styles from './sidebar.module.css';
import SidebarContext from "../store/sidebar-context";
import { useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useClickAway } from "react-use";
const Sidebar = () => {
    const color = useSelector(state => state.themeMode.color);
    const location = useLocation();
    const navigate = useNavigate();
    const sidebarCtx = useContext(SidebarContext);
    const isLoggedIn = localStorage.getItem("isLoggedIn") || false;
    const sidebarRef = useRef(null);

    useClickAway(sidebarRef, () => sidebarCtx.toggleSidebar());


    const animateVariants = {
        show: {
            x: [-250, 0],
            transition: {
                times: [0, 1],
                duration: 0.5,
            },
        },
        exit: {
            x: [0, -250],
            transition: {
                times: [0, 1],
                duration: 0.5,
            },
        },
        onAnimationComplete: () => console.log("Show animation completed"),
    };
    const logoutHandler = () => {
        localStorage.clear();
        window.location.reload();
    };
    const cartHandler = () => {
        const userid = localStorage.getItem("id");
        console.log(userid);
        if (userid === null || userid === undefined || userid === '')
            return;
        navigate(`/${userid}/cart`);
        sidebarCtx.toggleSidebar()
    };
    const xyzHandler = () => {
        const userid = localStorage.getItem("id");
        console.log(userid);
        if (userid === null || userid === undefined || userid === '')
            navigate('/login');
        else
            navigate(`/${userid}/updatedetail`);

        sidebarCtx.toggleSidebar()
    };
    const contactUsHandler = () => {
        navigate('/contactUs');
        sidebarCtx.toggleSidebar()
    }
    return (
        <AnimatePresence>
            <motion.div
                key={location.pathname}
                id="sidebar#"
                variants={animateVariants}
                animate="show"
                exit="exit"
                ref={sidebarRef}
                className={`${styles.sidebar} ${sidebarCtx.isSidebarOpen ? styles.open : ''}`}
                style={{ backgroundColor: color.navbg, color: color.bodyText }}
            >
                <ul style={{ listStyle: 'none', color: color.text }}>
                    <li className={styles.li} onClick={() => {
                        navigate('/team');
                        sidebarCtx.toggleSidebar()
                    }} style={{ color: color.text }}>Our Team</li>
                    <li className={styles.li} style={{ color: color.text }} onClick={xyzHandler}>{isLoggedIn === '1' ? 'Update Detail' : 'Login/Signup'}</li>
                    <li className={styles.li} onClick={cartHandler} style={{ color: color.text }}>Cart</li>
                    <li className={styles.li} onClick={contactUsHandler} style={{ color: color.text }}>Contact Us</li>
                    <li className={styles.li} onClick={logoutHandler} style={{ color: color.text }}>Logout</li>
                    <li className={styles.li} onClick={() => { sidebarCtx.toggleSidebar() }} style={{ color: color.text }}>Close</li>
                </ul>
            </motion.div>
        </AnimatePresence >
    );
};

export default Sidebar;
