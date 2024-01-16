import "./items.css";
import Items from './items.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToLink } from '../../App.jsx';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from "react-router";
import DataContext from "../../store/data-context.js";
import { useContext } from "react";
import { useSelector } from "react-redux";

export default function MainItem() {
    const color = useSelector(state => state.themeMode.color);
    const dataCtx = useContext(DataContext);
    const navigate = useNavigate();
    const [data, setData] = useState([
        {
            data1: dataCtx.data.data1,
            name: 'footwear',
        },

        {
            data3: dataCtx.data.data3,
            name: 'sunglass',
        },
        {
            data4: dataCtx.data.data4,
            name: 'kid',
        },
        {
            data5: dataCtx.data.data5,
            name: 'bag',
        },
        {
            data6: dataCtx.data.data6,
            name: 'watch',
        },
        {
            data7: dataCtx.data.data7,
            name: 'umbrella',
        },
        {
            data2: dataCtx.data.data2,
            name: 'electronic',
        },
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const changeImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    useEffect(() => {
        const intervalId = setInterval(changeImage, 10000);
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
                // console.log(newData);
                setData((prevData) => {
                    const newDatax = [...prevData];
                    // console.log(newDatax);
                    newDatax.forEach((item) => {
                        if (item.name === parameter) {
                            item[datavar] = newData;
                        }
                    });
                    return newDatax;
                });
                dataCtx.setData(datavar, newData);
            } catch (err) {
                console.log(err);
            }
        }


        (dataCtx.data.data1.length === 0) && allresp('footwear', 'data1');
        (dataCtx.data.data2.length === 0) && allresp('electronic', 'data2');
        (dataCtx.data.data3.length === 0) && allresp('sunglass', 'data3');
        (dataCtx.data.data4.length === 0) && allresp('kid', 'data4');
        (dataCtx.data.data5.length === 0) && allresp('bag', 'data5');
        (dataCtx.data.data6.length === 0) && allresp('watch', 'data6');
        (dataCtx.data.data7.length === 0) && allresp('umbrella', 'data7');
        // console.log(data)
    }, []);

    const itemHandler = (e, id) => {
        e.stopPropagation();
        // console.log(id);
        navigate(`/${id}`);
    }
    const ProdDivhandler = (event) => {
        const sectionName = event.currentTarget.getAttribute('name');
        // console.log(sectionName);
        navigate(`/page/?search=${sectionName}&page=1&limit=20&sort=null`);
    }

    return (
        <div style={{ background: `linear-gradient(${color.belowNavbg2},'#ffffff',${color.belowNavbg1})`, maxWidth: '100%' }}>
            {Object.keys(data).map((key, index) => {
                const currentData = data[key];
                const newObj = Object.keys(currentData);
                if (currentData[newObj[0]].length <= 0) {
                    let arr = [1, 2, 3, 4]
                    return <section key={currentData.name} id="core-concepts" name={currentData.name} >
                        <div style={{ position: 'relative', left: '0%', paddingLeft: '30px' }} name={currentData.name} onClick={ProdDivhandler}>
                            {currentData.name.charAt(0).toUpperCase() + currentData.name.slice(1)}
                            <br />
                        </div>
                        <ul >
                            {arr.map((itemData, itemIndex) => (
                                <Items
                                    key={itemIndex + currentData.name}
                                // title={itemData.product_name || 'name'}
                                // image={itemData.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                                // alt={itemData.brand}
                                // onClick={(event) => itemHandler(event, itemData._id)}
                                // description={itemData.description.slice(0, 30) || 'abcd'}
                                />
                            ))}
                        </ul>
                    </section>
                }
                return (
                    <section key={currentData.name} id="core-concepts" name={currentData.name}

                    >
                        <div style={{ position: 'relative', left: '0%', paddingLeft: '30px', padding: '30px', cursor: 'pointer' }} name={currentData.name} onClick={ProdDivhandler} >
                            {currentData.name.charAt(0).toUpperCase() + currentData.name.slice(1)}
                            <br />
                        </div>
                        <ul>
                            {currentData[newObj[0]].map((itemData, itemIndex) => (
                                <Items
                                    key={itemIndex}
                                    title={itemData.product_name || 'name'}
                                    image={itemData.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                                    alt={itemData.brand}
                                    onClick={(event) => itemHandler(event, itemData._id)}
                                    description={itemData.description.slice(0, 100) || 'abcd'}
                                    price={itemData.discounted_price || itemData.retail_price}
                                />
                            ))}
                        </ul>
                    </section>
                );
            })}
        </div>
    );

}