import { useState, useEffect } from "react";
import LoginContext from "./login-context";
import axios from "axios";
import { ToLink } from "../../constants";
import verifyToken from "../utils/verifyToken";
import { useCookies } from "react-cookie";

const LoginContextProvider = (props) => {
  const [cookie] = useCookies(["token"]);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);

  const loginHandler = (token, name) => {
    setToken(token);
    setIsLoggedIn(true);
    setName(name);
  };
  const logoutHandler = () => {
    setToken(null);
    setIsLoggedIn(false);
    setName(null);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const token = cookie.token;
        const response = await verifyToken(token);
        console.log("response: ", response);
        if (response.isLoggedin === true) {
          setToken(token);
          setIsLoggedIn(true);
          setName(response.name);
        }
      } catch (err) {
        console.log(err);
      }
    };
    asyncFunc();
  }, []);

  const context = {
    token: token,
    isLoggedIn: isLoggedIn,
    name: name,
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
