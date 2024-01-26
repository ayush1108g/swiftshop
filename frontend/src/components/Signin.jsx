import classes from "./Signin.module.css";
import axios from "axios";
import CartContext from "../store/context/cart-context.js";
import LoginContext from "../store/context/login-context.js";
import { useNavigate } from "react-router";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { ToLink } from "../constants.js";
import { useCookies } from "react-cookie";
import { useAlert } from "../store/context/Alert-context.js";

const Signin = (props) => {
  const alertCtx = useAlert();
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [errormsg, setErrormsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const addressInputRef = useRef();
  const cartCtx = useContext(CartContext);
  const loginCtx = useContext(LoginContext);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const loginpageHandler = () => {
    if (props.pagename === "Signup") {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };
  const forgotPasswordHandler = () => {
    navigate("forgotpassword");
  };
  if (loginCtx.isLoggedIn) {
    navigate("/");
  }



  const signupLoginHandler = async (e) => {
    e.preventDefault();
    let enteredName = "";
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (enteredEmail.trim().length === 0 || enteredPassword.trim().length === 0)
      return setErrormsg("Please enter all the fields");
    const data = {
      emailid: enteredEmail,
      password: enteredPassword,
    };
    if (props.pagename === "Signup") {
      enteredName = nameInputRef.current.value;
      data.name = enteredName;
      const enteredPhone = phoneInputRef.current.value;
      data.phoneno = enteredPhone;
      const enteredAddress = addressInputRef.current.value;
      data.address = enteredAddress;
      if (enteredName.trim().length === 0 || enteredPhone.trim().length === 0) { return setErrormsg("Please enter all the fields"); }
      if (enteredEmail.trim().length === 0) { return setErrormsg("Please enter all the fields"); }
    } else {
    }
    const page = props.pagename.toLowerCase();

    try {
      setIsLoading(true);
      let resp;
      resp = await axios.post(`${ToLink}/user/${page}`, data,
        { withCredentials: true },
        { timeout: 30000, });

      if (resp.status === 201 || resp.status === 200) {

        if (props.pagename === "Login") {
        }
        if (props.pagename === "Signup") {
          nameInputRef.current.value = "";
          phoneInputRef.current.value = "";
          addressInputRef.current.value = "";
        }
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        console.log(resp.data.data.user.name);
        setCookie("token", resp.data.token, { path: "/", maxAge: 60 * 60 * 24 * 30 * 1.4 });
        loginCtx.login(resp.data.token, resp.data.data.user.name);
        setErrormsg("Success");
        // setTimeout(() => {
        // }, 1000);
        alertCtx.showAlert("success", "Logged In Successfully");
        setTimeout(() => {
          cartCtx.refresh();
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) setErrormsg(error.response.data.message);
      else if (error.code === "ERR_BAD_REQUEST") setErrormsg("Email already in use");
      else if (error.code === "ERR_BAD_RESPONSE")
        setErrormsg("Server Not Responding...");
      else setErrormsg("An error occurred. Please try again.");
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
          key={props.pagename}
          className={`border-bottom-0 ${classes.form}`}
        >
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
          {props.pagename === "Signup" && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-100"
            >
              <h3>Sign Up</h3>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  placeholder="Name"
                  autoComplete="on"
                  ref={nameInputRef}
                  pattern=".{4,}"
                  title="Username must be at least 4 characters long"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="number"
                  id="phone"
                  autoComplete="on"
                  placeholder="Phone Number"
                  ref={phoneInputRef}
                  pattern="[0-9]{10}"
                  title="Please enter your 10 digit number "
                  required
                />
              </div>
            </motion.div>
          )}
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

          {props.pagename === "Signup" && <div className="input-group mb-3">
            <input
              className="form-control"
              type="address"
              id="address"
              autoComplete="on"
              placeholder="address"
              ref={addressInputRef}
              title="Please enter a valid address"
              required
            />
          </div>}

          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder={!showPassword ? " · · · · · · · · " : "password"}
              ref={passwordInputRef}
              pattern=".{8,}"
              title="Password must be at least 8 characters long"
              required
            />
            <span className="input-group-text" onClick={handleTogglePassword}>
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </span>
          </div>

          <div className={classes.buttons}>
            <button
              className="btn btn-primary w-100"
              type="submit"
              onClick={signupLoginHandler}
            >
              {props.pagename}
            </button>
          </div>
          <div className={classes.pagechange}>
            <b>
              <p
                onClick={loginpageHandler}
                className={"small font-monospace text-center row text-dark " + classes.signin}
              >
                {props.pagename === "Signup" ? "Already" : "Don't"} have an
                account? {props.pagename === "Signup" ? "Login " : "Signup"}
              </p>
              <motion.p
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className={"small d-flex justify-content-end font-monospace row text-dark " + classes.signin}
                style={{ fontSize: "2vh" }}
                onClick={forgotPasswordHandler}
              >
                {" "}
                {props.pagename === "Login"
                  ? "Forgot Password?"
                  : "                  "}
              </motion.p>
            </b>
          </div>
        </motion.form>
      </div>
    </>
  );
};
export default Signin;
