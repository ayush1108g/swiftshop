import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from "react";
import { Route, Routes, useLocation, HashRouter, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Cart from "./pages/cart";
import HomePage, { HeaderMain } from "./pages/HomePage";
import Errorpage from "./pages/Errorpage";
import LoginPage from "./pages/LoginPage";
import UpdateDetail from "./pages/UpdateDetail";
import ForgotPassPage from "./pages/ForgotPass/ForgotPassPage";
import ForgotPassConfirmPage from "./pages/ForgotPass/ForgotPassConfirmPage";
import ForgotPassIDPage from "./pages/ForgotPass/ForgotPassIDPage";
import ContactUsPage from "./pages/ContactUsPage";
import ProductDetail from "./pages/productDetail";
import ProductPage from "./pages/productPage";
import SignupPage from "./pages/SignupPage";
import TrackPage from "./pages/Trackpage";
import TeamPage from "./pages/teamPage";

import CategoriesMain from "./components/categories/categoriesMain";
import MainFooter from "./components/footer/mainFooter";
import Navbar from "./components/Navbar";

import DataContextProvider from "./store/dataContextProvider";
import SidebarContextProvider from "./store/sidebarContextProvider";
library.add(fas);

// export const ImageLink = "http://127.0.0.1:8000/image/";
// export const ToLink = "http://127.0.0.1:8000";
export const ToLink = 'https://ecommerce-web-lwxy.onrender.com';
export const ImageLink = 'https://ecommerce-web-lwxy.onrender.com/image/';
export const FromLink = "https://ayush1108g.github.io/winter_code_week_2/#/";
// export const ImageLink = "https://get-image.onrender.com/image/";


function LocationProvider({ children }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

function RoutesWithAnimation() {
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
      <Route path="/:id/updatedetail" element={<UpdateDetail />} />
      <Route path="/:productid" element={<ProductDetail />} />
      <Route path="/:id/cart" element={<Cart />} />
      <Route path="/:id/track" element={<TrackPage />} />
      <Route path="/contactUs" element={<ContactUsPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
}
function App() {
  const color = useSelector((state) => state.themeMode.color);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
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
  const navStyle = {
    backgroundColor: isScrolled ? '' : color.navbg,
    backdropFilter: isScrolled ? 'blur(10px)' : '',
    transition: '0.5s'
  }

  return (
    <>
      <HashRouter>
        <LocationProvider >
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
        </LocationProvider>
        <MainFooter></MainFooter>
      </HashRouter >
    </>
  );
}

export default App;
