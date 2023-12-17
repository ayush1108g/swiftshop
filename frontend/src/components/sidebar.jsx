// import React, { useState } from 'react';
import styles from './sidebar.module.css';
import SidebarContext from "../store/sidebar-context";
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate = useNavigate();
    const sidebarCtx = useContext(SidebarContext);
    // const [isOpen, setIsOpen] = useState(sidebarCtx.isSidebarOpen);

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };
    const isLoggedIn = localStorage.getItem("isLoggedIn") || false;
    const animateVariants = {
        show: {
            x: [-250, 0],
            transition: {
                times: [0, 1],
                ease: "easeInOut",
                duration: 0.5,
            },
            exit: {
                x: [0, -250],
                transition: {
                    times: [0, 1],
                    ease: "easeInOut",
                    duration: 0.5,
                },
            },
        },
    };
    const logoutHandler = () => {
        localStorage.clear();
        window.location.reload();
    };
    const cartHandler = () => {
        const userid = localStorage.getItem("id");
        if (userid === null || userid === undefined || userid === '')
            return;
        navigate(`/${userid}/cart`);
    };
    const xyzHandler = () => {
        const userid = localStorage.getItem("id");
        if (userid === null || userid === undefined || userid === '')
            return;
        if (isLoggedIn) {
            navigate(`/${userid}/updatedetail`);
        } else {
            navigate('/signin');
        }
    };
    const contactUsHandler = () => {
        navigate('/contactUs');
    }
    return (
        <AnimatePresence>
            <motion.div
                variants={animateVariants}
                animate="show"
                exit="exit"
                className={`${styles.sidebar} ${sidebarCtx.isSidebarOpen ? styles.open : ''}`}>
                <ul style={{ listStyle: 'none' }}>
                    <li className={styles.li}><Link to="/team">Our Team</Link></li>
                    <li className={styles.li} onClick={xyzHandler}>{isLoggedIn === '1' ? 'Update Detail' : 'Login/Signup'}</li>
                    <li className={styles.li} onClick={cartHandler}>Cart</li>
                    <li className={styles.li} onClick={contactUsHandler}>Contact Us</li>
                    <li className={styles.li} onClick={logoutHandler}>Logout</li>
                    <li className={styles.li} onClick={() => { sidebarCtx.toggleSidebar() }}>Close</li>
                </ul>
            </motion.div>
        </AnimatePresence >
    );
};

export default Sidebar;
