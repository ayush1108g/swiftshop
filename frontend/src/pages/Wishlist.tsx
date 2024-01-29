import React, { useContext, useEffect,useState } from "react";
import Items from '../components/items/items.jsx';
import WishContext from "../store/context/wish-context.js";
import { useNavigate } from 'react-router-dom';
import LoginContext from "../store/context/login-context.js";
import { useSelector } from "react-redux";
import { RootState } from "../store/utils/index.js";

const Wishlist = () => {
    const color = useSelector((state:RootState) => state.themeMode.color);
    const navigate = useNavigate();
    const wishCtx = useContext(WishContext);
    const loginCtx = useContext(LoginContext);
    const data = wishCtx.wish;

    useEffect(() => {
        if (!loginCtx.isLoggedIn){
            navigate('/');
        }
    }, [loginCtx.isLoggedIn]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const changeImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    useEffect(() => {
        const intervalId = setInterval(changeImage, 15000);
        return () => clearInterval(intervalId);
    }, []);
   
    const itemHandler = (e, id) => {
        e.stopPropagation();
        navigate(`/${id}`);
    }
    return (

         <div style={{ background: `linear-gradient(${color.belowNavbg2},'#ffffff',${color.belowNavbg1})`, maxWidth: '100%' }}>
            <section id="core-concepts" >
                <div style={{ position: 'relative', left: '0%', paddingLeft: '30px', padding: '30px', cursor: 'pointer' }}>
                    Wishlist
                    <br />
                </div>
                <ul style={{}}>
                    {data.map((itemData, itemIndex) => (
                        <Items
                            addtocart={true}
                            id={itemData._id}
                            key={itemIndex}
                            title={itemData.product_name || 'name'}
                            image={itemData.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                            alt={itemData.brand}
                            onClick={(event) => itemHandler(event, itemData._id)}
                            description={itemData.description.slice(0, 100) || 'abcd'}
                            price={itemData.discounted_price || itemData.retail_price}
                        />
                    ))}
                    {
                        data.length ===0 && <div>
                            <h1>Wishlist is empty</h1>
                        </div>
                    }
                </ul>
            </section>
        </div>
    )
}

export default Wishlist