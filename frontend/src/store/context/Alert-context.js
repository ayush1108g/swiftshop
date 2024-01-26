import React, { createContext, useContext, useState } from "react";
import Alert from "./../../components/alert.jsx";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && <Alert type={alert.type} message={alert.message} />}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  return useContext(AlertContext);
};

export { AlertProvider, useAlert };
