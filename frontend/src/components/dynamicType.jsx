import React from 'react'
import { useState, useEffect } from 'react'
import classes from './dynamicType.module.css'
const DynamicType = (props) => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const textToType = props.textToType;
    const duration = props.duration * 1 || 100;

    useEffect(() => {
        const timer = setInterval(() => {
            if (index < textToType.length) {
                setText((prevText) => prevText + textToType[index]);
                setIndex(index + 1);
            } else {
                clearInterval(timer);
            }
        }, duration);

        return () => clearInterval(timer);
    }, [index, text, duration, textToType]);

    const borderStyle = index < textToType.length - 1
        ? { borderRight: '2px solid black' }
        : {};
    const fontWeight = props.isBold === 'true' ? 'bold' : 'normal';


    return (
        <div className={classes.typewriter} style={{ 'fontFamily': `${props.fontFamily}`, 'fontWeight': `${fontWeight}`, ...borderStyle }}>
            &nbsp;{text}
        </div>);
}

export default DynamicType;