import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./overlay.module.css";
import { ToLink } from "../../App";


function StudentSidebarModal(props) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(props.link);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    return (
        <div className={classes.sidebar} onClick={props.onChangeModal}>
            {
                <div className={classes.modal}>
                    <div className={classes["modal-content"]}>
                        <h2 className={classes["modal-title"]}>Share</h2>
                        <ul className={classes["student-list"]}>
                            <p>{isCopied ? 'Link copied!' : 'Share this link:'}</p>
                            <input type="text" value={props.link} readOnly />
                            <button onClick={handleCopy}>
                                {isCopied ? 'Copied!' : 'Copy Link'}
                            </button>
                        </ul>
                        <button
                            className={classes["close-button"]}
                            onClick={props.onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default StudentSidebarModal;
