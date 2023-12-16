import classes from "./productDetail.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ToLink } from "../App";
import { useParams } from "react-router";
import Items from "./items/items";
import { useNavigate } from "react-router";


const ProductDetail = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [data1, setData1] = useState([]);
    const [dataProd, setDataProd] = useState('watch');
    const [isSpec, setIsSpec] = useState(false);
    const [currentIndex, setCurrentIndex] = useState('0');


    const { productid } = useParams();
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
                console.log(`${ToLink}/product_data/products?search=${dataProd}&limit=4`);
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
        const prod = async () => {
            try {
                const response = await axios.get(`${ToLink}/product_data/products/${productid}`);
                let data = response.data.data;
                const specificationsString = data.product_specifications;
                let validJSONString = specificationsString.replace(/"=>/g, '": ');
                console.log(validJSONString);
                const parsedData = {
                    ...data,
                    product_category_tree: JSON.parse(data.product_category_tree),
                    image: JSON.parse(data.image),
                    product_specifications: JSON.parse(validJSONString),
                };
                setProduct(parsedData);
                setIsSpec(true);
                let ltx = parsedData.product_category_tree;
                ltx = ltx[0].split(">>")[1].trim().split(" ");
                ltx = ltx[ltx.length - 1];
                console.log(ltx);
                setDataProd(ltx);
            } catch (err) {
                console.log(err);
            }
        }
        prod();
    }, [productid]);
    const itemHandler = (e, id) => {
        console.log(id);
        navigate(`/${id}`);
    }


    const discount = 0;
    return (
        <div>
            <span className={classes.categorytree}>{product.product_category_tree}</span>
            <div className={classes.container}>
                <div className={classes.left}>
                    {product.image && <img src={product.image[currentIndex]} alt="product" className={classes.productImage} />}
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
                            {product.product_specifications.product_specification && product.product_specifications.product_specification.map((ele, index) => (
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