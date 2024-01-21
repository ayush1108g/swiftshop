import React,{ ReactNode } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from "react";
import { Route, Routes, useLocation, HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Cart from "./pages/cart.tsx";
import HomePage, { HeaderMain } from "./pages/HomePage.tsx";
import Errorpage from "./pages/Errorpage.tsx";
import LoginPage from "./pages/LoginPage.jsx";
import UpdateDetail from "./pages/UpdateDetail.tsx";
import ForgotPassPage from "./pages/ForgotPass/ForgotPassPage.jsx";
import ForgotPassConfirmPage from "./pages/ForgotPass/ForgotPassConfirmPage.jsx";
import ForgotPassIDPage from "./pages/ForgotPass/ForgotPassIDPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.tsx";
import ProductDetail from "./pages/productDetail.tsx";
import ProductPage from "./pages/productPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import TrackPage from "./pages/Trackpage.jsx";
import TeamPage from "./pages/teamPage.tsx";
import { ToLink } from "./constants.js";

import CategoriesMain from "./components/categories/categoriesMain.jsx";
import MainFooter from "./components/footer/mainFooter.jsx";
import Navbar from "./components/Navbar.tsx";

import DataContextProvider from "./store/context/dataContextProvider.js";
import SidebarContextProvider from "./store/context/sidebarContextProvider.js";
import CartContextProvider from "./store/context/cartContextProvider.js";
import LoginContextProvider from "./store/context/loginContextProvider.js";
import { RootState } from "./store/utils/index.ts";
import LoginContext from "./store/context/login-context.js";

library.add(fas);


interface navStyle{
  backgroundColor: string;
  backdropFilter: string;
  transition: string;
}
interface LocationProviderProps {
  children: ReactNode;
}

const LocationProvider:React.FC<LocationProviderProps> = ({ children }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
}

const RoutesWithAnimation:React.FC = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Routes location={location} key={location.key}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/forgotpassword" element={<ForgotPassPage />} />
      <Route path="/login/forgotpassword/:id" element={<ForgotPassIDPage />} />
      <Route path="/login/forgotpassword/:id/confirm" element={<ForgotPassConfirmPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/page" element={<ProductPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/updatedetail" element={<UpdateDetail />} />
      <Route path="/:productid" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/track" element={<TrackPage />} />
      <Route path="/contactUs" element={<ContactUsPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
}

const App:React.FC = ()=> {
  const color = useSelector((state: RootState) => state.themeMode.color);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = ():void => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }
  useEffect(() => {
    console.log('useeffect');
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navStyle:navStyle = {
    backgroundColor: isScrolled ? '' : color.navbg,
    backdropFilter: isScrolled ? 'blur(10px)' : '',
    transition: '0.5s'
  }


  return (
    <>
      <HashRouter>
        <LoginContextProvider>
        <LocationProvider >
          <CartContextProvider>
          <DataContextProvider>
            <SidebarContextProvider>
              <div style={{ color: color.bodyText, backgroundColor: color.belowNavbg2 }}>
                <HeaderMain navStyle={navStyle} />
                <Navbar navStyle={navStyle} />
                <CategoriesMain></CategoriesMain>
                <RoutesWithAnimation />
              </div>
            </SidebarContextProvider>
          </DataContextProvider>
          </CartContextProvider>
        </LocationProvider>
        <MainFooter></MainFooter>
        </LoginContextProvider>
      </HashRouter >
    </>
  );
}

export default App;
