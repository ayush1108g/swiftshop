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
        exit: { x: '100%', transition: { delay: 0.5 } },
        transition: { duration: 0.5 },
    }


    return (

        <AnimatePresence initial={false}>
            <motion.li className="core-conceptsLI"
                // key={props.image}
                onClick={props.onClick}
                id={props.id}
                style={{ borderColor: 'black', overflowX: 'clip' }}>
                {image !== props.image && !loading ? <motion.img
                    key={props.image}
                    {...framerSidebarPanel}
                    src={image} alt={props.alt} /> : <CustomisedSkeleton> <Skeleton height={64} width={200} /></CustomisedSkeleton>}
                {props.title ? <h6 style={{ paddingTop: '10px' }}>{props.title}</h6> : <CustomisedSkeleton><Skeleton width={200} /></CustomisedSkeleton>}
                {props.description ? <p>{props.description}</p> : <CustomisedSkeleton><Skeleton count={1} width={200} /></CustomisedSkeleton>}
            </motion.li>
        </AnimatePresence >
    )
}