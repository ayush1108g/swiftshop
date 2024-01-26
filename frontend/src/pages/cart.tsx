import React,{ useContext, useEffect} from "react";
import CartContext from "../store/context/cart-context.js";
import CartItem from "../components/cart/cart";
import { useNavigate } from 'react-router-dom';
import LoginContext from "../store/context/login-context.js";
import { useSelector } from "react-redux";
import { RootState } from "../store/utils/index.js";

const Cart:React.FC = () => {
    const color = useSelector((state:RootState) => state.themeMode.color);
    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);
    const loginCtx = useContext(LoginContext);
    const [retailPrice,setRetailPrice] = React.useState(0);
    const cart = cartCtx.cart;
    const totalPrice = cartCtx.total;
    // console.log(cartCtx.cart);

    useEffect(() => {
        let retailPrice = 0;
    if(cart.length>0){
        cart.map((item) => retailPrice += item.retail_price*item.quantity*1);
    }
    setRetailPrice(retailPrice);
},[cart]);
    const updateDetailHandler = () => {
        if (!loginCtx.isLoggedIn)
            navigate('/login');
        navigate(`/updatedetail`);
    };

    return (
        <div className='d-flex flex-column justify-content-center align-item-center' style={{ 
            display: 'flex',
            flexDirection:'column',
            justifyContent:'center',
            
            // alignItems:'center'
            }}>
            <h1 className="d-flex justify-content-center" style={{position:'sticky',top:'60px'}}>Cart</h1>
            {cart.length > 0 && cart.map((item) => {
                return <CartItem length={cart.length} data={item} />
            })}
       {cart.length >0 &&   <div style={{ 
                display: 'flex',
                flexDirection:'row',
                justifyContent:'space-evenly',
                gap:'10vw',
                flexWrap:'wrap',


                }}>
                <div className="d-flex justify-content-center" style={{ 
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent:'space-between',
                    minWidth:'25%',
                    maxWidth:'70%',
                    padding:'10px',
                    border:'1px solid black',
                    boxShadow:'0 2px 8px rgba(0, 0, 0, 0.26)',
                    backgroundColor:color.background,
                }}>
                    <span>Price Details :</span>
                    <hr/>
                    <div style={{display:'flex',justifyContent:'space-between',paddingBottom:'10px'}}>
                        <span> Price ({cart.length} items) : &nbsp;</span>
                        <span> &#8377;{retailPrice}</span> 
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between',paddingBottom:'10px'}}>
                        <span>Discount : &nbsp;</span>
                        <span>-&#8377;{retailPrice-totalPrice}</span>
                    </div>


                    <div style={{display:'flex',justifyContent:'space-between',paddingBottom:'10px'}}>
                        <span>Delivery Charges : &nbsp;</span>
                        <span><s>&#8377;80</s>&nbsp; FREE</span>
                    </div>

                    <hr style={{
                            width: '100%',
                            height: '1px',
                            border: 'none',
                            borderTop: `2px dotted ${color.text}`,
                            margin: '10px 0',}}
                    />
                    <div style={{display:'flex',justifyContent:'space-between',paddingBottom:'10px'}}>
                        <span><b>Total Amount :&nbsp;</b></span>
                        <span><b>&#8377;{totalPrice}</b></span>
                    </div>
                    <hr style={{
                            width: '100%',
                            height: '1px',
                            border: 'none',
                            borderTop: `2px dotted ${color.text}`,
                            margin: '10px 0',}}
                    />
                    <div style={{display:'flex',justifyContent:'space-between',paddingBottom:'10px'}}>
                        <span><b>You will Save :&nbsp;&#8377;{retailPrice-totalPrice}</b></span>
                    </div>
                
                </div>  
                <button className='h1 d-flex' style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'flex-end',
                    alignItems:'flex-end',
                    marginTop:'auto',
                    textWrap:'nowrap'}}>Place Order {'>>'}
                </button>
            </div>}
               <hr style={{
                    width: '100%',
                    height: '1px',
                    border: 'none',
                    borderTop: `2px dotted ${color.text}`,
                    margin: '10px 0',}}
                />
            <div className='h4 d-flex justify-content-end' onClick={updateDetailHandler}>Update Your Detail</div>
        </div>
    );
}
export default Cart;