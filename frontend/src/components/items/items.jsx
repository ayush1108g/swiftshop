import "./items.css"
import { IoIosHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import WishContext from "../../store/context/wish-context.js";
import CartContext from "../../store/context/cart-context.js";
import { ImageLink } from "../../constants.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

export const CustomisedSkeleton = ({ children }) => {
    const color = useSelector(state => state.themeMode.color);

    return <SkeletonTheme color={color.SkeletonColor} highlightColor="#444">{children}</SkeletonTheme>
}

export default function Item(props) {
    const cartCtx = useContext(CartContext);
    const wishCtx = useContext(WishContext);
    const color = useSelector(state => state.themeMode.color);
    const [image, setImage] = useState(props.image);
    const [loading, setLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const productid = props.id;

    const wish = wishCtx.wish;

    useEffect(() => {
        if (wish.some((item) => item._id === productid)) {
            setIsInWishlist(true);
        }
    }, [wish, productid, setIsInWishlist]);

    useEffect(() => {
        const getImage = async () => {
            try {
                const res = await axios.get(ImageLink + '?' + props.image, { responseType: 'arraybuffer', });
                const blob = new Blob([res.data], { type: res.headers['content-type'] });
                const imageUrl = URL.createObjectURL(blob);
                setImage(imageUrl);
                setLoading(false);
            } catch (err) {
                // console.log(err);
            }
        }
        props.image && getImage();
    }, [props.image]);

    const framerSidebarPanel = {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '100%', transition: { duration: 0.3 } },
        transition: { duration: 0.3 },
    }
    const addinwishHandler = () => {
        wishCtx.addInWish(props.id);
        // wishCtx.refresh();
    }
    const deletefromwishHandler = () => {
        wishCtx.removeFromWish(props.id);
        setIsInWishlist(false);
        setTimeout(() => {
            wishCtx.refresh();
        }, 1000);
    }
    const addtoCartHandler = () => {
        cartCtx.addInCart(props.id);
        deletefromwishHandler();
        // cartCtx.refresh();
    }

    const scrollStyle = {
        scrollSnapType: 'x mandatory',
        scrollSnapAlign: 'start',
        scrollPadding: '10px',
        scrollPaddingInlineStart: '100px',
    };

    return (

        <AnimatePresence initial={false} mode='wait'>
            <motion.li
                id={props.id}
                // key={image}
                style={{ borderColor: 'black', overflowX: 'clip', backgroundColor: color.itembg, borderRadius: '10px', ...scrollStyle }}>
                <AnimatePresence mode="wait">
                    {image !== props.image && !loading ? <motion.img
                        key={props.image}
                        {...framerSidebarPanel}
                        // alt={props.alt}
                        src={image}
                        loading="lazy"
                        style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
                    /> : <CustomisedSkeleton> <Skeleton height={250} width={'100%'} /></CustomisedSkeleton>}
                </AnimatePresence>
                {image !== props.image && !loading && isInWishlist && <IoIosHeart onClick={deletefromwishHandler} style={{ position: 'relative', fontSize: '20px', color: color.cartCount, cursor: 'pointer', marginLeft: '-20px', top: '-110px' }} />}
                {image !== props.image && !loading && !isInWishlist && <CiHeart onClick={addinwishHandler} style={{ position: 'relative', fontSize: '20px', color: color.cartCount, cursor: 'pointer', marginLeft: '-20px', top: '-110px' }} />}
                <div style={{ display: 'block', textAlign: 'left', minHeight: '100px', paddingTop: '10px', paddingLeft: props.title ? '10px' : '' }}>
                    {props.title ? <h6>{props.title}</h6> : <CustomisedSkeleton><Skeleton width={"100%"} /></CustomisedSkeleton>}
                    {props.description ? <p>{props.description}</p> : <CustomisedSkeleton><Skeleton count={2} width={"100%"} /></CustomisedSkeleton>}
                </div>

                <div className="d-flex flex-row justify-content-between flex-wrap">
                    <div style={{ textAlign: 'right', paddingLeft: '10px', color: color.cartCount, cursor: 'pointer' }}>
                        {props.title ? <h6 onClick={props.onClick} >Read More...</h6> : <CustomisedSkeleton><Skeleton width={150} /></CustomisedSkeleton>}
                    </div>
                    {props.addtocart && <div style={{ textAlign: 'right', paddingLeft: '10px', color: color.cartCount, cursor: 'pointer' }}>
                        <em>  <h6 onClick={addtoCartHandler} >Add to Cart</h6></em>
                    </div>}
                    <div style={{ textAlign: 'right', paddingRight: '10px' }}>
                        {props.price ? <h6 >₹{props.price}</h6> : <CustomisedSkeleton><Skeleton width={50} /></CustomisedSkeleton>}
                    </div>
                </div>
            </motion.li>
        </AnimatePresence >
    )
}