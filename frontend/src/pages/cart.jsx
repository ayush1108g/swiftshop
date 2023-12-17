import classes from './cart.module.css';
import CartItem from "../components/cart/cart";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { ToLink } from '../App';

const Cart = () => {
    // const [prodid, setProdid] = useState([]);
    const [cart, setCart] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const resp = async () => {
            try {
                const data = await axios.get(`${ToLink}/cart/${id}`);
                const ProductId = data.data.data.cart;
                console.log(id);
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

                setCart(newData);
                console.log(newData);
            } catch (err) {
                console.log(err);
            }
        }
        resp();
    }, []);


    return (
        <div>
            <h1>Cart</h1>
            {cart.length > 0 && cart.map((item) => {
                return <CartItem data={item} />
            })}
        </div>
    );
}
export default Cart;