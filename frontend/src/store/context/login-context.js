import React from "react";

const LoginContext = React.createContext({
  token: null,
  isLoggedIn: false,
  name: null,
  login: () => {},
  logout: () => {},
});

export default LoginContext;
