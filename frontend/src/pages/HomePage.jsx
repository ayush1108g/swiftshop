import { Outlet } from "react-router";
// import classes from "./HomePage.module.css";
// import SidebarContext from "../store/sidebar-context";
// import { useContext } from "react";
// import { motion } from "framer-motion";
// import Sidebar from "../components/sidebar";
import MainItems from "../components/items/itemsMain";
import { useDispatch, useSelector } from "react-redux";
// import { setColor } from "../store/utils/ColorRedux";
import { setThemeMode } from "../store/utils/ThemeMode";

export default function HomePage() {
  // const dispatch = useDispatch();
  const color = useSelector((state) => state.themeMode.color);
  console.log(color);


  return (
    < div >
      <MainItems />
      <Outlet />
    </div >
  );
}
