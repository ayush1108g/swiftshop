import React from "react";
import Signin from "../components/Signin";

const SignupPage:React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-nowrap" style={{ height: '90vh' }}>
            <Signin pagename={"Signup"} />
        </div>
    );
}
export default SignupPage;