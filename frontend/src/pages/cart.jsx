import classes from './cart.module.css';
import CartItem from "../components/cart/cart";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { ToLink } from '../App';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    // const [prodid, setProdid] = useState([]);
    const [cart, setCart] = useState([]);
    const { id } = useParams();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const resp = async () => {
            try {
                const data = await axios.get(`${ToLink}/cart/${id}`);
                const ProductId = data.data.data.cart;
                // console.log(id);
                // setProdid(data.data.data.cart);
                const productPromises = ProductId.map(async (item) => {
                    const productData = await axios.get(`${ToLink}/product_data/products/${item.product_id}`);
                    productData.data.data.quantity = item.quantity;
                    // productData.image = JSON.parse(item.image);
                    return productData.data.data;
                });

                const productDataArray = await Promise.all(productPromises);
                const newData = productDataArray.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                const TP = newData
                    .map(item => (item.discounted_price || item.retail_price) * 1 * item.quantity * 1)
                    .reduce((acc, itemTotal) => acc + itemTotal, 0);
                setTotalPrice(TP);
                // console.log(TP);
                setCart(newData);
                // console.log(newData);
            } catch (err) {
                console.log(err);
            }
        }
        resp();
    }, []);

    const updateDetailHandler = () => {
        const userid = localStorage.getItem("id");
        if (userid === null || userid === undefined || userid === '')
            navigate('/login');
        navigate(`/${userid}/updatedetail`);
    };

    return (
        <div className='d-flex flex-column justify-content-center align-item-center'>
            <h1>Cart</h1>
            {cart.length > 0 && cart.map((item) => {
                return <CartItem data={item} />
            })}
            <div className='h2 d-flex justify-content-center'>Total Price : {totalPrice}</div>
            <div className='h1 d-flex justify-content-center'>Buy Now</div>
            <div className='h4 d-flex justify-content-end' onClick={updateDetailHandler}>Update Your Detail</div>
        </div>
    );
}
export default Cart;