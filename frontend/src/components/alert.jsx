import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useAlert } from '../store/context/Alert-context';

const Alert = ({ type, message }) => {
    const { hideAlert } = useAlert();
    type = type || 'success';
    const color = useSelector(state => state.themeMode.color);
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState('show');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible((visible) => !visible);
            setShow((show) => (show === 'show' ? 'hide' : 'show'));
            setTimeout(() => {
                hideAlert();
            }, 500);
        }, 4000);

        return () => {
            clearTimeout(timeout);
        };
    }, [message, setShow, setVisible, hideAlert, show, visible, type,]);

    const hideHandler = () => {
        setVisible(false);
        setShow('hide');
        setTimeout(() => {
            hideAlert();
        }, 500);
    };

    const divmotion = {
        initial: { y: '200%' },
        animate: { y: 0 },
        exit: { y: '200%', transition: { duration: 0.5 } },
        transition: { duration: 0.5 },
    }

    return (
        <>
            <AnimatePresence mode='wait'>
                {visible && (
                    <motion.div
                        key={(visible === true ? 'show' : 'hide')}
                        {...divmotion}
                        className={`alert alert-${type}`} role="alert"
                        style={{
                            backgroundColor: color.background,
                            color: color.text,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            position: 'fixed',
                            bottom: '80px',
                            right: 'calc(50% - 125px)',
                            zIndex: '1000',
                            minWidth: '250px',
                        }}
                    >
                        {message}
                        <button
                            type="button"
                            className="btn btn-outline-primary close"
                            onClick={() => hideHandler()}
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    );
};

export default Alert;
