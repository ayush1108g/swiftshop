import React,{ useState, useRef, useContext } from "react";
import { useParams, Navigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";

import classes from "./ForgotPass.module.css";
import { ToLink } from "../../constants.js";
import { useAlert } from "../../store/context/Alert-context.js";
import LoginContext from "../../store/context/login-context.js";


const ForgotPassConfirmPage:React.FC = () => {
  const loginctx = useContext(LoginContext);
  const alertCtx = useAlert();
  const [, setCookie] = useCookies(["AccessToken", "RefreshToken"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();
  const passwordref = useRef();
  const Confpasswordref = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  if (!id?.includes('-') || id.split("-").length !== 3 || !id.includes('@')) {
    return <Navigate to={`/*?error=Not%20Authorised`} />;
  }
  const idw = id.split("-")[1];
  const code = id.split("-")[2];
  const proceedtoLogin = async (event) => {
    event.preventDefault();
    const passwordEntered = passwordref?.current?.value;
    const ConfpasswordEntered = Confpasswordref?.current?.value;
    if (
      passwordEntered.trim().length === 0 ||
      ConfpasswordEntered.trim().length === 0
    ) {
      return setErrormsg("Please provide all the details");
    }
    if (passwordEntered !== ConfpasswordEntered) {
      return setErrormsg("Passwords do not match");
    }
    if (passwordEntered.length < 8) {
      return setErrormsg("Password must be at least 8 characters long");
    }
    const body = {password: passwordEntered};
    try {
      setErrormsg("");
      setIsLoading(true);
      const resp = await axios.patch(`${ToLink}/user/resetpassword/${code}`,body,{timeout: 30000,});
      setCookie("AccessToken", resp.data.AccessToken, { path: "/", maxAge: 60 * 60 * 24 * 1 * 1.5 }); // 1.5 days
      setCookie("RefreshToken", resp.data.RefreshToken, { path: "/", maxAge: 60 * 60 * 24 * 30 * 1.4 }); // 42 days
      loginctx.login(resp.data.AccessToken, resp.data.RefreshToken, resp.data.name);
      if (resp.data.status === "success") {
        localStorage.removeItem("Passcode");
        localStorage.removeItem("Passcode2");
        alertCtx.showAlert('success', 'Password changed successfully');
        navigate(`/login`);
      }
    } catch (error) {
      setErrormsg("Something went wrong. Please try again");
    }
    setIsLoading(false);
  };

  const isValid = localStorage.getItem("Passcode2");

  // Animation Variants
  const animateVariants = {
    show: {
      scale: [15, 0],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.5,
      },
    },
    hide: {
      scale: 0,
    },
    exit: {
      scale: [0, 15],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <div className={`row d-flex align-items-center ${classes.container}`}>
        {!isValid && (
          <p className="h1 d-flex align-items-center justify-content-center">
            Not Authorised
          </p>
        )}
        <AnimatePresence>
          {isValid === "1" && (
            <motion.form className={`border-bottom-0 ${classes.form}`}>
              {!isLoading && <p className={classes.loading}> {errormsg}</p>}
              {isLoading && (
                <div className="spinner-border text-danger" role="status">
                  {/* <span className="sr-only">Loading...</span> */}
                </div>
              )}
              <motion.div
                variants={animateVariants}
                animate="show"
                exit="exit"
                className={classes.box}
              ></motion.div>
              <p className="h2" >Forgot Password</p>
              <p>Enter new Password for {idw}</p>
              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={!showPassword ? " · · · · · · · ·  " : "New-Password"}
                  className="form-control"
                  id="code"
                  autoComplete="on"
                  ref={passwordref}
                  pattern=".{8,}"
                  title="Password must be at least 8 characters long"
                  required
                />
                <span
                  className="input-group-text"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                </span>
              </div>
              <div className="input-group mb-3">
                <input
                  type={showPassword2 ? "text" : "password"}
                  placeholder={
                    !showPassword2 ? " · · · · · · · ·  " : "Confirm-Password"
                  }
                  className="form-control"
                  id="code2"
                  ref={Confpasswordref}
                  pattern=".{8,}"
                  title="Password must be at least 8 characters long"
                  required
                />
                <span
                  className="input-group-text"
                  onClick={() => {
                    setShowPassword2(!showPassword2);
                  }}
                >
                  {showPassword2 ? <RiEyeOffFill /> : <RiEyeFill />}
                </span>
              </div>

              <div className={classes.buttons}>
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  onClick={proceedtoLogin}
                >
                  Confirm Password
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default ForgotPassConfirmPage;
