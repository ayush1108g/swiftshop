import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import classes from "./ForgotPass.module.css";
import { ToLink } from "../../constants.js";

const ForgotPassPage: React.FC = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const [isLoading, setIsLoading] = useState <boolean> (false);
  const [errormsg, setErrormsg] = useState <string> ("");

  // Function to handle the back button
  const loginpageHandler = () => {
    navigate(-1);
  };

  // Function to handle the reset password button
  const proceedtoResethandler = async (event) => {
    event.preventDefault();
    const emailEntered = emailInputRef?.current?.value;

    // Check if the email is empty
    if (emailEntered.trim().length === 0) {
      return setErrormsg("Please provide all the details");
    }
    const body = {
      emailid: emailEntered,
    };
    try {
      setIsLoading(true);
      const resp = await axios.post(`${ToLink}/user/forgotpassword`,body,{ timeout: 30000 });
      if (resp.data.status === "success") {
        setErrormsg(`Password reset email sent to ${emailEntered}`);
        localStorage.setItem("Passcode", "1");
        navigate(`fpass987-${emailEntered}`);
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        setErrormsg("Email not found");
      } else {
        setErrormsg("Something went wrong. Please try again");
      }
    }
    setIsLoading(false);
  };

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
        <motion.form
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`border-bottom-0 ${classes.form}`}>
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
          <p>Enter your email to reset your password.</p>
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="email"
              id="email"
              autoComplete="on"
              placeholder="email-id"
              ref={emailInputRef}
              title="Please enter a valid email address in the format user@example.com"
              required
            />
          </div>

          <div className={classes.buttons}>
            <button
              className="btn btn-primary w-100"
              type="submit"
              onClick={proceedtoResethandler}
            >
              Proceed
            </button>
          </div>

          <div className={classes.pagechange}>
            <b>
              <p onClick={loginpageHandler} className={"small font-monospace text-center row text-dark " + classes.signin}>
                Back to Login?
              </p>
            </b>
          </div>
        </motion.form>
      </div>
    </>
  );
};
export default ForgotPassPage;
