import React, { useState } from 'react';
import styles from './sidebar.module.css';
import SidebarContext from "../store/sidebar-context";
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = () => {
    const sidebarCtx = useContext(SidebarContext);
    // const [isOpen, setIsOpen] = useState(sidebarCtx.isSidebarOpen);

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };
    const animateVariants = {
        show: {
            x: [-250, 0],
            transition: {
                times: [0, 1],
                ease: "easeInOut",
                duration: 0.5,
            },
        },
        // hide: {
        //     scale: 0,
        // },
        exit: {
            x: [0, -250],
            transition: {
                times: [0, 1],
                ease: "easeInOut",
                duration: 0.5,
            },
        },
    };
    return (
        <AnimatePresence>
            <motion.div
                variants={animateVariants}
                animate="show"
                exit="exit"
                className={`${styles.sidebar} ${sidebarCtx.isSidebarOpen ? styles.open : ''}`}>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </motion.div>
        </AnimatePresence >
    );
};

export default Sidebar;
