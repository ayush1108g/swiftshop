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

    useClickAway(sidebarRef, () => {
        console.log("clicked outside");
        return sidebarCtx.toggleSidebar();
    });


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
                        <motion.li className={styles.li} style={{ color: color.text }} onClick={xyzHandler}>{isLoggedIn === '1' ? 'Update Detail' : 'Login/Signup'}</motion.li>
                        <motion.li className={styles.li} onClick={cartHandler} style={{ color: color.text }}>Cart</motion.li>
                        <motion.li className={styles.li} onClick={contactUsHandler} style={{ color: color.text }}>Contact Us</motion.li>
                        <motion.li className={styles.li} onClick={logoutHandler} style={{ color: color.text }}>Logout</motion.li>
                        <motion.li className={styles.li} onClick={() => { sidebarCtx.toggleSidebar() }} style={{ color: color.text }}>Close</motion.li>
                    </motion.ul>
                </motion.div>)}
        </AnimatePresence >
    </div>
    );
};

export default Sidebar;