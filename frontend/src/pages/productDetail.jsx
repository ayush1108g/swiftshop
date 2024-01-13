import classes from "./productDetail.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ToLink, ImageLink } from "../App";
import { useParams } from "react-router";
import Items from "../components/items/items";
import { useNavigate } from "react-router";
import { FaShareAlt } from "react-icons/fa";
import Overlay from "../components/modalOverlay/overlay";
import { FromLink } from "../App";
import Skeleton from "react-loading-skeleton";

const ProductDetail = () => {
    const navigate = useNavigate();
    const { productid } = useParams();
    const [product, setProduct] = useState({});
    const [data1, setData1] = useState([]);
    const [dataProd, setDataProd] = useState("watch");
    const [showOverlay, setShowOverlay] = useState(false);
    const [isSpec, setIsSpec] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const changeImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    useEffect(() => {
        const intervalId = setInterval(changeImage, 500000);
        return () => clearInterval(intervalId);
    }, []);



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
        const intervalId = setInterval(changeImage, 500000);
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
            const res = await axios.get(ImageLink + '?' + product.image[currentIndex], {
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
        product.image && product.image[currentIndex] && getImage();
    }, [currentIndex, product.image]);
    // useEffect(() => {

    //     product.image && product.image[currentIndex] && getImage();
    // }, []);
    const itemHandler = (e, id) => {
        // console.log(id);
        navigate(`/${id}`);
    }
    const OverLayShowHandler = () => {
        setShowOverlay(!showOverlay);
    }
    const addtoCartHandler = () => {
        const sendData = async () => {
            try {
                const data = {
                    id: localStorage.getItem("id"),
                    product_id: productid,
                    quantity: 1,
                };
                if (data.id === null || data.id === undefined || data.id === "") return alert("Please login to add to cart");
                // const resp = 
                await axios.post(`${ToLink}/cart/${data.id}`, data);
                // console.log(resp);
                alert("Added to cart successfully");
            } catch (err) {
                console.log(err);
            }
        };
        sendData();
    }

    console.log(loading);
    const discount = 0;
    return (
        <div>
            {showOverlay && <Overlay link={FromLink + productid} onClose={OverLayShowHandler} />}
            <span className={classes.categorytree}>{product.product_category_tree}</span>
            <div className={classes.container}>
                <div className={classes.left}>
                    {!loading && image && product.image ? <img src={image} alt="product" className={classes.productImage} /> : <Skeleton height={500} width={500} />}
                </div>
                <div className={classes.right}>
                    <div className={classes.productTitle}>{product.product_name}</div>
                    <div className={classes.brand}>{product.brand}</div>
                    <hr />
                    <div className={classes.price}>
                        <span>
                            <span className={classes.discount}>{(((product.retail_price - product.discounted_price) / product.retail_price) * 100).toFixed(2) || discount}% off &nbsp;&nbsp;</span>
                            <span className={classes.discountPrice}>₹{product.discounted_price || product.retail_price}</span>
                        </span>
                        <span>MRP:&nbsp;
                            <span className={classes.actualPrice}>₹{product.retail_price}</span>
                        </span>
                        <br />
                        <span className={classes.tax}>inclusive of all taxes</span>
                        <span>EMI starts at ₹{product.discounted_price / 20 || product.retail_price / 20} No Cost EMI available</span>
                        <span>Cash on Delivery Available</span>
                    </div>
                    <hr />
                    <div className={classes.availability}>
                        <span className={classes.availabilityTitle}>Availability </span>
                        <span className={classes.availabilityContent}>In stock</span>
                    </div>
                    <hr />
                    <div className={classes.specification}>
                        <h4>Product Specification:</h4>
                        {isSpec && product && <div>
                            {product.product_specifications.product_specification && product.product_specifications.product_specification.length > 1 && product.product_specifications.product_specification.map((ele, index) => (
                                <div key={index}>
                                    <span style={{ fontWeight: ele.key ? 'bold' : 'normal' }}>{ele.key}</span>: {ele.value}
                                </div>
                            ))}
                        </div>}
                    </div>
                    <hr />
                    <div className={classes.description}>
                        <h4>About this item</h4>
                        <p>{product.description}</p>
                    </div>

                </div>
                <div className={classes.corner}>
                    <h3 > <span className="rounded" style={{ backgroundColor: 'cyan', }} onClick={OverLayShowHandler}>Share &nbsp;<FaShareAlt /></span></h3>
                    <br />
                    <br />
                    <h3> <span className="rounded" style={{ backgroundColor: 'cyan' }} onClick={addtoCartHandler}>Add to Cart</span></h3>

                </div>
            </div>
            <hr />
            <div>
                Similar products
                {data1 && <>
                    <section id="core-concepts">{dataProd || 'Watch'}
                        <ul>
                            {data1.map((item, index) => (
                                <Items
                                    key={index}
                                    id={item._id}
                                    title={item.product_name || 'name'}
                                    image={item.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                                    alt={item.brand}
                                    description={item.description.slice(0, 200) || 'abcd'}
                                    onClick={(event) => itemHandler(event, item._id)}
                                />
                            ))}
                        </ul>
                        {/* <img src="http://img6a.flixcart.com/image/sandal/t/h/y/multicolor-fwl-wgs00238-shopoj-8-1000x1000-imaejtb3mjvgk5hu.jpeg" alt="" /> */}
                    </section>
                    <br />
                </>
                }
            </div>
        </div>
    )
};
export default ProductDetail;