// import { useNavigate } from "react-router";
import Signin from "../components/Signin";
const SignupPage = () => {
    // const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-center align-items-center flex-nowrap" style={{height:'90vh'}}>
            <Signin pagename={"Signup"} />
            {/* <button onClick={() => navigate('/login')}> Login page </button> */}
        </div>
    );
}
export default SignupPage;