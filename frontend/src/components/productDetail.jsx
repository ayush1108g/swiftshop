import classes from "./productDetail.module.css";
const productDetail = () => {
    const discount = 11;
    return (
        <div>
            <span className={classes.categorytree}>Product Category tree</span>
            <div className={classes.container}>
                <div className={classes.left}>
                    <img src="https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg" alt="product" className={classes.productImage} />
                </div>
                <div className={classes.right}>
                    <div className={classes.productTitle}>Product Title</div>
                    <div className={classes.brand}>Brand</div>
                    <hr />
                    <div className={classes.price}>
                        <span>
                            <span className={classes.discount}>{discount}% off &nbsp;&nbsp;</span>
                            <span className={classes.discountPrice}>₹ 1,999.00</span>
                        </span>
                        <span>
                            <span className={classes.actualPrice}>₹ 1,999.00</span>
                        </span>
                        <br />
                        <span className={classes.tax}>inclusive of all taxes</span>
                        <span>EMI starts at ₹1,164. No Cost EMI available</span>
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
                        {/* <div>
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key}>
                                <span style={{ fontWeight: key === 'Cellular Technology' ? 'bold' : 'normal' }}>{key}</span>: {value}
                            </div>
                        ))}
                    </div> */}
                    </div>
                    <hr />
                    <div className={classes.description}>
                        <h4>About this item</h4>
                        <p>Product Description</p>
                    </div>

                </div>
            </div>
            <hr />
        </div>
    )
};
export default productDetail;