import { Outlet } from "react-router";
import classes from "./HomePage.module.css";
import SidebarContext from "../store/sidebar-context";
import { useContext } from "react";
import { motion } from "framer-motion";
export default function HomePage() {
  const sidebarCtx = useContext(SidebarContext);

  return (
    <div>
      {/* <AnimatePresence> */}
      {sidebarCtx.isSidebarOpen && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={` ${classes.sidebar}`}
        ></motion.div>
      )}
      <Outlet />
      {/* </AnimatePresence> */}
    </div>
  );
}
