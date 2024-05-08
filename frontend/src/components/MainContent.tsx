import React,{useContext,useState,useEffect} from "react";
import { FaArrowUp } from "react-icons/fa";
import { useSelector } from "react-redux";

import Navbar from "./Navbar.tsx";
import FullAuthLoader from "./FullAuthLoader.js";
import  { HeaderMain } from "../pages/HomePage.tsx";
import CategoriesMain from "./categories/categoriesMain.jsx";
import RoutesComponent from "./RoutesComponent.tsx";

import { RootState } from "../store/utils/index.ts";
import LoginContext from "../store/context/login-context.js";

interface navStyle {
    backgroundColor: string;
    backdropFilter: string;
    transition: string;
  }

const MainContent: React.FC = () => {
    const loginCtx = useContext(LoginContext);
    const color = useSelector((state: RootState) => state.themeMode.color);
    const [isScrolled, setIsScrolled] = useState < boolean > (false);

    const handleScroll = (): void => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }
    const navStyle: navStyle = {
        backgroundColor: isScrolled ? '' : color.navbg,
        backdropFilter: isScrolled ? 'blur(10px)' : '',
        transition: '0.5s'
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div style={{ color: color.bodyText, backgroundColor: color.belowNavbg2 }}>
            {loginCtx.loading && <FullAuthLoader />}
            <HeaderMain navStyle={navStyle} />
            <Navbar navStyle={navStyle} />
            <CategoriesMain />
            <RoutesComponent />
            <div>
                <div style={{ position: 'fixed', right: '20px', bottom: '20px', height: "40px", width: '40px', backgroundColor: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <FaArrowUp style={{ color: 'white', fontSize: '30px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
                </div>
            </div>
        </div>
    );
}

export default MainContent;