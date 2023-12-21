import "./App.css";
import CategoriesMain from "./components/categories/categoriesMain";
import MainFooter from "./components/footer/mainFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import { Route, Routes, useLocation, HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import SidebarContextProvider from "./store/sidebarContextProvider";
import ContactUsPage from "./pages/ContactUsPage";
import ForgotPassPage from "./pages/ForgotPass/ForgotPassPage";
import ForgotPassIDPage from "./pages/ForgotPass/ForgotPassIDPage";
import ForgotPassConfirmPage from "./pages/ForgotPass/ForgotPassConfirmPage";
import UpdateDetail from "./pages/UpdateDetail";
import Errorpage from "./pages/Errorpage";
import Cart from "./pages/cart";
import ProductDetail from "./pages/productDetail";
import DataContextProvider from "./store/dataContextProvider";
import ProductPage from "./pages/productPage";
import TeamPage from "./pages/teamPage";
import TrackPage from "./pages/Trackpage";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

// export const ToLink = "https://cp29bd07-8000.inc1.devtunnels.ms";
// export const ImageLink = "http://127.0.0.1:5000/image/";
export const ImageLink = "https://get-image.onrender.com/image/";
export const ToLink = 'https://ecommerce-web-lwxy.onrender.com';
// export const ToLink = "http://127.0.0.1:8000";
export const FromLink = "https://swiftshop-ecommerce.netlify.app/#/";



function RoutesWithAnimation() {
  const location = useLocation();
  console.log(location);
  return (
    <AnimatePresence mode="wait">
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
    </AnimatePresence>
  );
}
function App() {
  return (
    <>
      <HashRouter>
        <DataContextProvider>
          <SidebarContextProvider>
            <div className="h2 d-flex align-item-center justify-content-center" style={{ backgroundColor: '#f6f6f6', marginBottom: '0px' }}>𝕾𝖜𝖎𝖋𝖙𝕾𝖍𝖔𝖕
            </div>
            <Navbar />
            <CategoriesMain></CategoriesMain>
            <RoutesWithAnimation />
          </SidebarContextProvider>
        </DataContextProvider>
        <MainFooter></MainFooter>
      </HashRouter>
    </>
  );
}

export default App;
