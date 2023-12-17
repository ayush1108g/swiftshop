// import { useNavigate } from "react-router";
import Signin from "../components/Signin";
const LoginPage = () => {
  // const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-nowrap"
      style={{ height: "90vh" }}
    >
      <Signin pagename={"Login"} />
      {/* <button onClick={() => navigate('/signup')}> Signup page </button> */}
    </div>
    );
};
export default LoginPage;
