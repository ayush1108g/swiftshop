import { useParams } from "react-router";
import classes from "./ForgotPass.module.css";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToLink } from "../../App";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
const ForgotPassIDPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const passwordref = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id.includes('-') || id.split("-").length !== 2 || !id.includes('@')) {
    return <Navigate to={`/*?error=Not%20Authorised`} />;
  }
  const idw = id.split("-")[1];
  const loginpageHandler = () => {
    navigate(-2);
  };

  const proceedtoConfirmhandler = async (event) => {
    event.preventDefault();
    const passwordEntered = passwordref.current.value;
    if (passwordEntered.trim().length === 0) {
      setErrormsg("Please provide all the details");
      return;
    }
    const body = {
      code: passwordEntered,
    };
    try {
      setErrormsg("");
      setIsLoading(true);
      const resp = await axios.post(`${ToLink}/user/verifycode`, body, {
        timeout: 30000,
      });
      if (resp.data.status === "success") {
        localStorage.setItem("Passcode2", "1");
        navigate(`/login/forgotpassword/fpass987-${idw}-${body.code}/confirm`);
      }
    } catch (error) {
      if (error.response.data.message) setErrormsg(error.response.data.message);
      else setErrormsg("Something went wrong. Please try again");
    }
    setIsLoading(false);
  };
  const isValid = localStorage.getItem("Passcode");
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
        {!isValid && <p className="h1 d-flex align-items-center justify-content-center">Not Authorised</p>}
        {isValid === "1" && <motion.form className={`border-bottom-0 ${classes.form}`}>
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
          <p className="h2">Forgot Password</p>
          <p>Password reset email sent to {idw}</p>
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              id="code"
              autoComplete="on"
              placeholder="Reset-Code"
              ref={passwordref}
              title="Please enter a code sent to your email address"
              required
            />
          </div>

          <div className={classes.buttons}>
            <button
              className="btn btn-primary w-100"
              type="submit"
              onClick={proceedtoConfirmhandler}
            >
              Reset Password
            </button>
          </div>

          <div className={classes.pagechange}>
            <b>
              <p
                onClick={loginpageHandler}
                className="small font-monospace text-center row text-dark "
              >
                Back to Login?
              </p>
            </b>
          </div>
        </motion.form>}
      </div>
    </>
  );
};
export default ForgotPassIDPage;
