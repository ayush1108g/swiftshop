import { useState } from "react";
import LoginContext from "./login-context";
// import axios from "axios";
// import { ToLink } from "../../constants";
// import verifyToken from "../utils/verifyToken";
import { useCookies } from "react-cookie";

const LoginContextProvider = (props) => {
  const [cookie, setCookie] = useCookies(["AccessToken", "RefreshToken"]);
  const [loading, setLoading] = useState(false);
  const [AccessToken, setAccessToken] = useState(null);
  const [RefreshToken, setRefreshToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);

  const loginHandler = (AccessToken, RefreshToken, name) => {
    setAccessToken(AccessToken);
    setRefreshToken(RefreshToken);
    setIsLoggedIn(true);
    setName(name);
  };
  const logoutHandler = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsLoggedIn(false);
    setName(null);
  };
  const updateAccessToken = (newAccessToken) => {
    console.log(newAccessToken);
    setCookie("AccessToken", newAccessToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 1 * 1.5,
    });
    setAccessToken(newAccessToken);
  };
  const updateRefreshToken = (newRefreshToken) => {
    console.log(newRefreshToken);
    setCookie("RefreshToken", newRefreshToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 2 * 1.4,
    });
    setRefreshToken(newRefreshToken);
  };

  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     try {
  //       const token = cookie.token;
  //       const response = await verifyToken(token);
  //       if (response.isLoggedin === true) {
  //         setToken(token);
  //         setIsLoggedIn(true);
  //         setName(response.name);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   asyncFunc();
  // }, []);

  const context = {
    name: name,
    isLoggedIn: isLoggedIn,
    loading: loading,
    AccessToken: AccessToken,
    RefreshToken: RefreshToken,
    setLoading: setLoading,
    setAccessToken: updateAccessToken,
    setRefreshToken: updateRefreshToken,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
