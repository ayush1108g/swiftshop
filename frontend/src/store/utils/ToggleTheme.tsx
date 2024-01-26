import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setThemeMode } from "./ThemeMode.ts";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useState } from "react";
import { RootState } from "./index.ts";
import { useAlert } from "../context/Alert-context.js";
const ToggleTheme: React.FC = () => {
  const Alertctx = useAlert();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state : RootState) => state.themeMode.mode);
  const [color1, setColor1] = useState<string>(currentTheme);
  const [color2, setColor2] = useState<string>(currentTheme);

  const toggleTheme = ():void => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    console.log("newTheme", newTheme);
    Alertctx.showAlert('success',"Theme changed to " + newTheme);
    dispatch(setThemeMode.setThemeMode(newTheme));
  };

  const variants = {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24 },
  };
  const changeColor1 = ():void => {
    setColor1((prev) => (prev === "black" ? "white" : "black"));
  }
  const changeColor2 = ():void => {
    setColor2((prev) => (prev === "" ? "white" : ""));
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.button
        key={currentTheme}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.25 }}
        onClick={toggleTheme}
        style={{
          display: "flex",
          alignItems: "center",
          minWidth: 24,
          overflow: "hidden",
          backgroundColor: "transparent",
          padding: 0,
          transformOrigin: "center",
          border: `1px solid black`,
          // border: "none",
        }}
      >
        {currentTheme === "light" ? (
          <>
            <CiLight onMouseEnter={changeColor1} onMouseLeave={changeColor1} size={24} style={{ color: color1 === "black" ? 'white' : 'black', backgroundColor: color1 }} />
          </>
        ) : (
          <>
            <MdDarkMode onMouseEnter={changeColor2} onMouseLeave={changeColor2} size={24} style={{ backgroundColor: color2, color: color2 === "white" ? "black" : '' }} />
          </>
        )}
      </motion.button>
    </AnimatePresence >
  );
};

export default ToggleTheme;
