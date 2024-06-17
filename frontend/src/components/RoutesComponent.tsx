import React,{ useEffect,useContext } from "react";
import { Route, Routes, useLocation} from "react-router-dom";
import { useCookies } from "react-cookie";

import Cart from "../pages/cart.tsx";
import HomePage from "../pages/HomePage.tsx";
import Errorpage from "../pages/Errorpage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import UpdateDetail from "../pages/UpdateDetail.tsx";
import ForgotPassPage from "../pages/ForgotPass/ForgotPassPage.tsx";
import ForgotPassConfirmPage from "../pages/ForgotPass/ForgotPassConfirmPage.tsx";
import ForgotPassIDPage from "../pages/ForgotPass/ForgotPassIDPage.tsx";
import ContactUsPage from "../pages/ContactUsPage.tsx";
import ProductDetail from "../pages/productDetail.tsx";
import ProductPage from "../pages/productPage.tsx";
import Wishlist from "../pages/Wishlist.tsx";
import SignupPage from "../pages/SignupPage.tsx";
import TrackPage from "../pages/Trackpage.tsx";
import TeamPage from "../pages/teamPage.tsx";
import AddProduct from "./AddProduct.tsx";

import LoginContext from "../store/context/login-context.js";
import { refreshAccessToken } from "../store/utils/refreshAccessToken.js";
import verifyToken from "../store/utils/verifyToken.js";

// This component is used to animate the routes
const RoutesComponent: React.FC = () => {
    const location = useLocation();
    console.log(location);
    const [cookie] = useCookies(["AccessToken", "RefreshToken"]);
    const authCtx = useContext(LoginContext);
  
    useEffect(() => {
        // Function to verify the token and refresh the token if it is expired
      const asyncFunc = async (AccessToken) => {
        try {
          const token = AccessToken;
          if(!token) return refreshAccessToken(asyncFunc, authCtx,cookie.RefreshToken);
          const response = await verifyToken(token);
          if (response?.isLoggedin === true) {
            authCtx.login(token, cookie?.RefreshToken, response?.name);
          }
        } catch (err) {
          if (err.message === "jwt expired" || err?.response?.data?.message === "jwt expired") {
            console.log("jwt expired");
            return refreshAccessToken(asyncFunc, authCtx,cookie.RefreshToken);
          }
          console.log(err);
        }
      };
      asyncFunc(cookie.AccessToken);
    }, []);
  
    return (
      <>
        <Routes location={location} key={location.key}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/forgotpassword" element={<ForgotPassPage />} />
          <Route path="/login/forgotpassword/:id" element={<ForgotPassIDPage />} />
          <Route path="/login/forgotpassword/:id/confirm" element={<ForgotPassConfirmPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/page" element={<ProductPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/updatedetail" element={<UpdateDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/contactUs" element={<ContactUsPage />} />
          <Route path="/:productid" element={<ProductDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </>
    );
  }

  export default RoutesComponent;