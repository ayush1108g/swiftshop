import React, { useState } from 'react';
import styles from './sidebar.module.css';
import SidebarContext from "../store/sidebar-context";
import { useContext } from "react";

const Sidebar = () => {
    const sidebarCtx = useContext(SidebarContext);
    const [isOpen, setIsOpen] = useState(sidebarCtx.isSidebarOpen);

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </div>
    );
};

export default Sidebar;
