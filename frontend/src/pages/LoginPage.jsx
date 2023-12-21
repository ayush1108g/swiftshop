import Signin from "../components/Signin";
const LoginPage = () => {

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-nowrap"
      style={{ height: "90vh" }}
    >
      <Signin pagename={"Login"} />
    </div>
  );
};
export default LoginPage;
