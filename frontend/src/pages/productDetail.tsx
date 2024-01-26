import React from "react";
import { IoIosHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import classes from "./productDetail.module.css";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { ToLink, ImageLink, FromLink } from "../constants.js";
import { useParams, useNavigate } from "react-router";
import Items from "../components/items/items.jsx";
import { FaShareAlt } from "react-icons/fa";
import Overlay from "../components/modalOverlay/overlay.jsx";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { CustomisedSkeleton } from "../components/items/items.jsx";
import { RootState } from "../store/utils/index.ts";
import CartContext from "../store/context/cart-context.js";
import WishContext from "../store/context/wish-context.js";


interface Product {
    _id: string;
    product_name: string;
    brand: string;
    description: string;
    product_category_tree: string;
    image: string[];
    product_specifications: {
        product_specification: {
            key: string;
            value: string;
        }[];
    };
    retail_price: number| null;
    discounted_price: number| null;
}

const ProductDetail:React.FC = () => {
    const wishCtx = useContext(WishContext);
    const color = useSelector((state:RootState) => state.themeMode.color);
    const navigate = useNavigate();
    const { productid } = useParams();
    const cartCtx = useContext(CartContext);
    const [product, setProduct] = useState<Product| null>(null);
    const [data1, setData1] = useState<Product[]| null>(null);
    const [dataProd, setDataProd] = useState<string>("watch");
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [isSpec, setIsSpec] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [image, setImage] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const changeImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    useEffect(() => {
        const intervalId = setInterval(changeImage, 15000);
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        if (wishCtx.wish.some((item) => item._id === productid)) {
            setIsInWishlist(true);
        }
    }, [wishCtx.wish, productid, setIsInWishlist]);


    useEffect(() => {
        const resp = async () => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products?search=${dataProd}&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData1(newData);

            } catch (err) {
                console.log(err);
            }
        }
        resp();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(changeImage, 100000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${ToLink}/product_data/products/${productid}`
                );

                const specificationsString = response.data.data.product_specifications;
                const validJSONString = specificationsString.replace(/"=>/g, '": ');

                const parsedData = {
                    ...response.data.data,
                    product_category_tree: JSON.parse(
                        response.data.data.product_category_tree
                    ),
                    image: JSON.parse(response.data.data.image),
                    product_specifications: JSON.parse(validJSONString),
                };

                setProduct(parsedData);
                setCurrentIndex(0);
                setImage(parsedData.image && parsedData.image[0]);
                setIsSpec(true);
                setDataLoaded(true);

                const ltx =
                    parsedData.product_category_tree &&
                    parsedData.product_category_tree[0].split(">>")[1].trim().split(" ");
                setDataProd(ltx && ltx[ltx.length - 1]);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [productid]);

    const getImage = async () => {
        try {
            const res = await axios.get(ImageLink + '?' + product?.image[currentIndex], {
                responseType: "arraybuffer",
            });

            const blob = new Blob([res.data], {
                type: res.headers["content-type"],
            });

            const imageUrl = URL.createObjectURL(blob);
            setImage(imageUrl);
            setLoading(false);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        product?.image && product?.image[currentIndex] && getImage();
        console.log(product?.image);
    }, [currentIndex, product?.image]);
   

    const itemHandler = (id) => {
        navigate(`/${id}`);
    }

    const OverLayShowHandler = () => {
        setShowOverlay(!showOverlay);
    }

    const addinwishHandler = () => {
        wishCtx.addInWish(productid);
        // wishCtx.refresh();
    }
    const deletefromwishHandler = () => {
        wishCtx.removeFromWish(productid);
        setIsInWishlist(false);
        setTimeout(() => {
            wishCtx.refresh();
        }, 1000);
    }

    const addtoCartHandler = () => {
        cartCtx.addInCart(productid);
    }
    const framerSidebarPanel = {
        initial: { x: '-100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '10%', opacity: 0, transition: { duration: 0.3 } },
        transition: { duration: 0.3 },
    }

    const discount = 0;
    let arr = [1, 2, 3, 4];
    return (
        <div>
            {showOverlay && <Overlay link={FromLink + productid} onClose={OverLayShowHandler} />}
            {dataLoaded ? <span className={classes.categorytree}>{product?.product_category_tree}</span> : <div style={{ paddingLeft: '15px' }}><CustomisedSkeleton><Skeleton width={"80%"} /></CustomisedSkeleton></div>}
            <div className={classes.container}>
                <div className={classes.left}>
                    <AnimatePresence mode='wait'>
                        {!loading && image && product?.image ?
                            <motion.img
                                key={image}
                                {...framerSidebarPanel}
                                src={image} alt="product"
                                className={classes.productImage}
                                style={{ width: '100%', height: 'auto', minHeight: '500px', objectFit: 'cover', borderRadius: '10px', zIndex: '-1' }}
                            /> :
                            <CustomisedSkeleton>   <Skeleton height={500} width={'100%'} /></CustomisedSkeleton>}
                    </AnimatePresence>
                    {!loading && isInWishlist && <IoIosHeart onClick={deletefromwishHandler} style={{ position: 'relative', fontSize: '20px', color: color.cartCount, cursor: 'pointer', marginLeft: '-20px', top: '-200px' }} />}
                {!loading && !isInWishlist && <CiHeart onClick={addinwishHandler} style={{ position: 'relative', fontSize: '20px', color: color.cartCount, cursor: 'pointer', marginLeft: '-20px', top: '-200px' }} />}
                </div>
                <div className={classes.right} style={{ paddingLeft: '10px' }}>
                    {dataLoaded ? <div className={classes.productTitle}>{product?.product_name}</div> : <CustomisedSkeleton><Skeleton width={"60%"} /></CustomisedSkeleton>}
                    {dataLoaded ? <div className={classes.brand}>{product?.brand}</div> : <CustomisedSkeleton><Skeleton width={"40%"} /></CustomisedSkeleton>}
                    <hr />
                    <div className={classes.price}>
                        {dataLoaded && product && product.retail_price && product.discounted_price ? <span>
                            <span className={classes.discount}>{(((product.retail_price - product.discounted_price) / product.retail_price) * 100).toFixed(2) || discount}% off &nbsp;&nbsp;</span>
                            <span className={classes.discountPrice}>₹{product?.discounted_price || product?.retail_price}</span>
                        </span> : <CustomisedSkeleton><Skeleton count={2} width={"50%"} /></CustomisedSkeleton>}
                        {dataLoaded && <span>MRP:&nbsp;
                            <span className={classes.actualPrice}>₹{product?.retail_price}</span>
                        </span>}
                        <br />
                        {dataLoaded ? <span className={classes.tax}>inclusive of all taxes</span> : <CustomisedSkeleton><Skeleton width={"40%"} /></CustomisedSkeleton>}
                        {dataLoaded && product && product.retail_price && product.discounted_price ? <span>EMI starts at ₹{product?.discounted_price / 20 || product?.retail_price / 20} No Cost EMI available</span> : <CustomisedSkeleton><Skeleton width={"80%"} /></CustomisedSkeleton>}
                        {dataLoaded ? <span>Cash on Delivery Available</span> : <CustomisedSkeleton><Skeleton width={"50%"} /></CustomisedSkeleton>}
                    </div>
                    <hr />
                    <div className={classes.availability}>
                        <span className={classes.availabilityTitle}>Availability </span>
                        {dataLoaded ? <span className={classes.availabilityContent}>In stock</span> : <CustomisedSkeleton><Skeleton width={"20%"} /></CustomisedSkeleton>}
                    </div>
                    <hr />
                    <div className={classes.specification}>
                        <h4>Product Specification:</h4>
                        {dataLoaded ? isSpec && product && <div>
                            {product?.product_specifications.product_specification && product?.product_specifications.product_specification.length > 1 && product?.product_specifications.product_specification.map((ele, index) => (
                                <div key={index}>
                                    <span style={{ fontWeight: ele.key ? 'bold' : 'normal' }}>{ele.key}</span>: {ele.value}
                                </div>
                            ))}
                        </div> : <CustomisedSkeleton><Skeleton count={5} width={"90%"} /></CustomisedSkeleton>}
                    </div>
                    <hr />
                    <div className={classes.description}>
                        <h4>About this item</h4>
                        {dataLoaded ? <p>{product?.description}</p> : <CustomisedSkeleton><Skeleton count={5} width={"90%"} /></CustomisedSkeleton>}
                    </div>

                </div>
                <div className={classes.corner} >
                    <h3> < span className="rounded" style={{ color: color.cartIcon }} onClick={OverLayShowHandler}>Share &nbsp;<FaShareAlt /></span></h3>
                    <br />
                    <br />
                    <h3> <span className="rounded" style={{ color: color.cartIcon }} onClick={addtoCartHandler}>Add to Cart</span></h3>

                </div>
            </div >
            <hr />
            <div>
                Similar products
                <>
                    <section id="core-concepts">{dataProd || <CustomisedSkeleton><Skeleton width={"20%"} /></CustomisedSkeleton>}
                        <ul>
                            {data1?.length === 0 && arr.map((item, index) => {
                                return <Items key={index} />
                            })
                            }
                            {data1 && data1.map((item, index) => (
                                <Items
                                    key={index}
                                    id={item._id}
                                    title={item?.product_name || 'name'}
                                    image={item.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                                    alt={item.brand}
                                    description={item.description.slice(0, 100) || 'abcd'}
                                    onClick={() => itemHandler(item._id)}
                                    price={item.discounted_price || item.retail_price}
                                />
                            ))}
                        </ul>
                        {/* <img src="http://img6a.flixcart.com/image/sandal/t/h/y/multicolor-fwl-wgs00238-shopoj-8-1000x1000-imaejtb3mjvgk5hu.jpeg" alt="" /> */}
                    </section>
                    <br />
                </>
            </div>
        </div >
    )
};
export default ProductDetail;