import React from "react";

const LoginContext = React.createContext({
  AccessToken: null,
  RefreshToken: null,
  loading: false,
  isLoggedIn: false,
  name: null,
  login: () => {},
  logout: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  setLoading: () => {},
});

export default LoginContext;
