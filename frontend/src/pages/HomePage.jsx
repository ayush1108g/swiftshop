import { Outlet } from "react-router";
// import classes from "./HomePage.module.css";
// import SidebarContext from "../store/sidebar-context";
// import { useContext } from "react";
// import { motion } from "framer-motion";
// import Sidebar from "../components/sidebar";
import MainItems from "../components/items/itemsMain";
export default function HomePage() {


  return (
    < div >
      <MainItems />
      <Outlet />
    </div >
  );
}
