import React from "react";
import Signin from "../components/Signin";

const LoginPage:React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-nowrap"
      style={{ height: "90vh" }} >
      <Signin pagename={"Login"} />
    </div>
  );
};
export default LoginPage;
