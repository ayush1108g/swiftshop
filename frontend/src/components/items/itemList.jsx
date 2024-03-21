import "./items.css";
import Items from './items.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToLink } from '../../constants.js';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from "react-router";
import DataContext from "../../store/context/data-context.js";
import { useContext } from "react";
import { useSelector } from "react-redux";


export default function ItemList({ parameter }) {
    const color = useSelector(state => state.themeMode.color);
    const dataCtx = useContext(DataContext);
    const navigate = useNavigate();
    const [data, setData] = useState([
        {
            [parameter]: dataCtx.data[parameter] || [],
            name: parameter,
        },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const changeImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    useEffect(() => {
        const intervalId = setInterval(changeImage, 3 * 60000);
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        const allresp = async (parameter, datavar) => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products?search=${parameter}&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData([{ [parameter]: newData, name: parameter }]);
                dataCtx.setData(datavar, newData);
            } catch (err) {
                console.log(err);
            }
        }
        setTimeout(() => {
            (!dataCtx.data || !dataCtx.data[parameter] || dataCtx.data[parameter].length <= 0) && allresp(parameter, parameter);
        }, 1000);
    }, []);

    const itemHandler = (e, id) => {
        e.stopPropagation();
        navigate(`/${id}`);
    }
    const ProdDivhandler = (event) => {
        const sectionName = event.currentTarget.getAttribute('name');
        navigate(`/page/?search=${sectionName}&page=1&limit=20&sort=null`);
    }

    const currentData = data[0];
    if (!currentData || currentData[parameter] === undefined || currentData[parameter]?.length === 0) {
        let arr = [1, 2, 3, 4];
        return <section key={currentData.name} id="core-concepts" name={currentData.name} >
            <div style={{ position: 'relative', left: '0%', paddingLeft: '30px', padding: '30px', cursor: 'pointer' }} name={currentData.name} onClick={ProdDivhandler}>
                {currentData.name.charAt(0).toUpperCase() + currentData.name.slice(1)}
                <br />
            </div>
            <ul >
                {arr.map((itemData, itemIndex) => (
                    <Items
                        key={itemIndex + currentData.name}
                    />
                ))}
            </ul>
        </section>
    }

    return (
        <section key={currentData.name} id="core-concepts" name={currentData.name} >
            <div style={{ position: 'relative', left: '5%', paddingLeft: '30px', padding: '30px', cursor: 'pointer' }} name={currentData.name} onClick={ProdDivhandler} >
                {currentData.name.charAt(0).toUpperCase() + currentData.name.slice(1)}
                <br />
            </div>
            <ul >
                <div style={{
                    width: '10px',
                    scrollSnapAlign: 'start',
                }}>
                </div>

                {currentData[parameter].map((itemData, itemIndex) => (
                    <Items
                        id={itemData._id}
                        key={itemIndex}
                        title={itemData.product_name.slice(0, 20) + (itemData.product_name.length > 25 ? '...' : '') || 'name'}
                        image={itemData.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                        alt={itemData.brand}
                        onClick={(event) => itemHandler(event, itemData._id)}
                        description={itemData.description.slice(0, 60) + '...' || 'abcd'}
                        price={itemData.discounted_price || itemData.retail_price}
                    />

                ))}
            </ul>
        </section>
    );
}
