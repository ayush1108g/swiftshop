import React, { useState } from "react";
import classes from "./overlay.module.css";

function StudentSidebarModal(props) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(props.link);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    const handleWhatsAppShare = () => {
        const whatsappMessage = encodeURIComponent(`Check out this link: ${props.link}`);
        window.open(`https://api.whatsapp.com/send?text=${whatsappMessage}`, '_blank');
    };

    const handleTelegramShare = () => {
        const telegramMessage = encodeURIComponent(`Check out this link: ${props.link}`);
        window.open(`https://t.me/share/url?url=${telegramMessage}`, '_blank');
    };
    const handleEmailShare = () => {
        const emailSubject = encodeURIComponent("Check out this link");
        const emailBody = encodeURIComponent(`I thought you might be interested in this link: ${props.link}`);
        window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    };
    const handleOpenInNewTab = () => {
        window.open(props.link, '_blank');
    };

    return (
        <div className={classes.sidebar} onClick={props.onChangeModal}>
            {
                <div className={classes.modal}>
                    <div className={classes["modal-content"]}>
                        <h2 className={classes["modal-title"]}>Share</h2>
                        <ul className={classes["student-list"]}>
                            <p >{isCopied ? 'Link copied!' : 'Share this link:'}</p>
                            <input className={classes["student-item"]} type="text" value={props.link} readOnly />
                            <button className={classes["student-item"]} onClick={handleCopy}>
                                {isCopied ? 'Copied!' : 'Copy Link'}
                            </button>
                            <button className={classes["student-item"]} onClick={handleEmailShare}>
                                Share on Email
                            </button>
                            <button className={classes["student-item"]} onClick={handleWhatsAppShare}>
                                Share on WhatsApp
                            </button>
                            <button className={classes["student-item"]} onClick={handleTelegramShare}>
                                Share on Telegram
                            </button>
                            <button className={classes["student-item"]} onClick={handleOpenInNewTab}>
                                Open in New Tab
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
