import React,{ useContext, useEffect } from "react";
import CartContext from "../store/context/cart-context.js";
import CartItem from "../components/cart/cart";
import { useNavigate } from 'react-router-dom';
import LoginContext from "../store/context/login-context.js";


const Cart:React.FC = () => {
    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);
    const loginCtx = useContext(LoginContext);
    const cart = cartCtx.cart;
    const totalPrice = cartCtx.total;
    useEffect(() => {
        if (!loginCtx.isLoggedIn)
        setTimeout(() => {
        navigate('/login');
        }, 1000);
    }, [loginCtx.isLoggedIn, navigate]);
    
    const updateDetailHandler = () => {
        if (!loginCtx.isLoggedIn)
            navigate('/login');
        navigate(`/updatedetail`);
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