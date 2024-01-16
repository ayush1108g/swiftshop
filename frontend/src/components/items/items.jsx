import "./items.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { ImageLink } from "../../App";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

export const CustomisedSkeleton = ({ children }) => {
    const color = useSelector(state => state.themeMode.color);

    return <SkeletonTheme color={color.SkeletonColor} highlightColor="#444">{children}</SkeletonTheme>
}

export default function Item(props) {
    const color = useSelector(state => state.themeMode.color);
    const [image, setImage] = useState(props.image);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getImage = async () => {
            try {
                const res = await axios.get(ImageLink + '?' + props.image, { responseType: 'arraybuffer', });
                const blob = new Blob([res.data], { type: res.headers['content-type'] });
                const imageUrl = URL.createObjectURL(blob);
                setImage(imageUrl);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        props.image && getImage();
    }, [props.image]);

    // const animateVariants = {
    //     // iniitial: {

    //     // },
    //     show: {
    //         x:[100,0],

    //     },
    //     exit: {

    //     }


    // }

    const framerSidebarPanel = {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '100%', transition: { duration: 0.3 } },
        transition: { duration: 0.3 },
    }


    return (

        <AnimatePresence initial={false} mode='wait'>
            <motion.li
                id={props.id}
                // key={image}
                style={{ borderColor: 'black', overflowX: 'clip', backgroundColor: color.itembg, borderRadius: '10px' }}>
                <AnimatePresence mode="wait">
                    {image !== props.image && !loading ? <motion.img
                        key={props.image}
                        {...framerSidebarPanel}
                        src={image} alt={props.alt}
                        style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
                    /> : <div> <CustomisedSkeleton> <Skeleton height={250} width={'100%'} /></CustomisedSkeleton></div>}
                </AnimatePresence>
                <div style={{ display: 'block', textAlign: 'left', minHeight: '100px', paddingTop: '10px', paddingLeft: props.title ? '10px' : '' }}>
                    {props.title ? <h6>{props.title}</h6> : <CustomisedSkeleton><Skeleton width={"100%"} /></CustomisedSkeleton>}
                    {props.description ? <p>{props.description}</p> : <CustomisedSkeleton><Skeleton count={2} width={"100%"} /></CustomisedSkeleton>}
                </div>
                <div className="d-flex flex-row justify-content-between flex-wrap">
                    <div style={{ textAlign: 'right', paddingLeft: '10px', color: color.cartCount, cursor: 'pointer' }}>
                        {props.title ? <h6 onClick={props.onClick} >Read More...</h6> : <CustomisedSkeleton><Skeleton width={150} /></CustomisedSkeleton>}
                    </div>
                    <div style={{ textAlign: 'right', paddingRight: '10px' }}>
                        {props.price ? <h6 >₹{props.price}</h6> : <CustomisedSkeleton><Skeleton width={50} /></CustomisedSkeleton>}
                    </div>
                </div>
                {/* </div> */}
            </motion.li>
        </AnimatePresence >
    )
}