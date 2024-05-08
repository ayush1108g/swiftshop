import React,{ useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import classes from "./ContactUsPage.module.css";
import { ToLink } from "../constants.js";

const ContactUsPage:React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errormsg, setErrormsg] = useState<string>("");
    const numberRef = useRef<HTMLInputElement>(null);
    const queryInputref = useRef<HTMLTextAreaElement>(null);

    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("email") || "";

    //Function to submit the query
    const proceedtoSubmit = async (event) => {
        event.preventDefault();
        const enteredNumber = numberRef.current!.value;
        const enteredQuery = queryInputref.current!.value;
        console.log(enteredNumber);
        console.log(enteredQuery);
        if (
            enteredNumber.toString().length !== 10 ||
          enteredNumber.length !== 10 || enteredNumber.toString().length === 0 ||
          enteredQuery.length === 0
        ) {
            return setErrormsg("Please enter valid details");
        }
        const body = {name: name,email: email,phoneno: enteredNumber, massage: enteredQuery};
        try {
            setIsLoading(true);
            const response = await axios.post(`${ToLink}/feedback`, body);
            setErrormsg("Your query has been submitted successfully");
            if (response.status === 200 || response.status === 201) {
                numberRef.current!.value = "";
                queryInputref.current!.value = "";
            }
        }
        catch (err) {
            setErrormsg("Something went wrong");
        }
        setIsLoading(false);
    }
    //Animation for form
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
            <div className={`row d-flex align-items-center justify-content-center ${classes.container}`}>
                {<motion.form className={`border-bottom-0 ${classes.form}`}>
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
                    <p className="h2">Contact Us</p>

                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            autoComplete="on"
                            placeholder="Name"
                            value={name}
                            disabled
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            autoComplete="on"
                            placeholder="Email"
                            value={email}
                            disabled
                            required
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="number"
                            id="number"
                            autoComplete="on"
                            placeholder="Phone Number"
                            ref={numberRef}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Query</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1"ref={queryInputref} ></textarea>
                    </div>
                    <div className={classes.buttons}>
                        <button
                            className="btn btn-primary w-100"
                            type="submit"
                            onClick={proceedtoSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </motion.form>}
            </div>
        </>
    );
};

export default ContactUsPage;