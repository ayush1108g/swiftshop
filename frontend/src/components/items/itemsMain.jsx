import "./items.css";
import Items from './items.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToLink } from '../../App.jsx';
import axios from 'axios';
import { useNavigate } from "react-router";
import DataContext from "../../store/data-context.js";
import { useContext } from "react";

export default function MainItem() {
    const dataCtx = useContext(DataContext);
    const navigate = useNavigate();
    const [data1, setData1] = useState(dataCtx.data.data1);
    const [data2, setData2] = useState(dataCtx.data.data2);
    const [data3, setData3] = useState(dataCtx.data.data3);
    const [data4, setData4] = useState(dataCtx.data.data4);
    const [data5, setData5] = useState(dataCtx.data.data5);
    const [data6, setData6] = useState(dataCtx.data.data6);
    const [data7, setData7] = useState(dataCtx.data.data7);
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(dataCtx.data);

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
                const data1x = await axios.get(`${ToLink}/product_data/products?search=footwear&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData1(newData);
                dataCtx.setData('data1', newData);
            } catch (err) {
                console.log(err);
            }
        }
        const resp1 = async () => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products?search=Electronic&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData2(newData);
                dataCtx.setData('data2', newData);

            } catch (err) {
                console.log(err);
            }
        }
        const resp2 = async () => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products?search=sunglass&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData3(newData);
                dataCtx.setData('data3', newData);

            } catch (err) {
                console.log(err);
            }
        }
        const resp3 = async () => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products?search=kid&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData4(newData);
                dataCtx.setData('data4', newData);

            } catch (err) {
                console.log(err);
            }
        }
        const resp4 = async () => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products?search=bag&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData5(newData);
                dataCtx.setData('data5', newData);

            } catch (err) {
                console.log(err);
            }
        }
        const resp5 = async () => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products?search=watch&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData6(newData);
                dataCtx.setData('data6', newData);

            } catch (err) {
                console.log(err);
            }
        }
        const resp6 = async () => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products?search=umbrella&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData7(newData);
                dataCtx.setData('data7', newData);

            } catch (err) {
                console.log(err);
            }
        }

        (data1.length === 0) && resp();
        (data2.length === 0) && resp1();
        (data3.length === 0) && resp2();
        (data4.length === 0) && resp3();
        (data5.length === 0) && resp4();
        (data6.length === 0) && resp5();
        (data7.length === 0) && resp6();
    }, []);

    const itemHandler = (e, id) => {
        e.stopPropagation();
        console.log(id);
        navigate(`/${id}`);
    }
    const ProdDivhandler = (event) => {
        const sectionName = event.currentTarget.getAttribute('name');
        // console.log(sectionName);
        navigate(`/page/?search=${sectionName}&page=1&limit=20&sort=null`);
    }

    return (<>
        {data3 && <>
            <section id="core-concepts" name="sunglasses" onClick={ProdDivhandler}>
                SunGlasses
                <ul onClick={ProdDivhandler} >
                    {data3.map((item, index) => (
                        <Items
                            key={index}
                            title={item.product_name || 'name'}
                            image={item.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                            alt={item.brand}
                            onClick={(event) => itemHandler(event, item._id)}
                            description={item.description.slice(0, 200) || 'abcd'}
                        />
                    ))}
                </ul>
            </section>
            <br />
        </>
        }

        {data1 && <>
            <section id="core-concepts" name="footwear" onClick={ProdDivhandler}>Footwear
                <ul onClick={ProdDivhandler}>
                    {/* <Items title={data1[0].product_name || 'name'} image={data1[0].image} alt='' description={data1[0].description.slice(0, 500) || 'abcd'}></Items>
                <Items title={data1[1].product_name || 'name'} image='https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg' alt='' description={data1[0].description.slice(0, 500) || 'abcd'}></Items>
                <Items title={data1[2].product_name || 'name'} image='https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg' alt='' description={data1[0].description.slice(0, 500) || 'abcd'}></Items>
                <Items title={data1[3].product_name || 'name'} image='https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg' alt='' description={data1[0].description.slice(0, 500) || 'abcd'}></Items> */}
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
        {data2 && <>
            <section id="core-concepts" onClick={ProdDivhandler} name="electronic">Electronics
                <ul onClick={ProdDivhandler}>
                    {data2.map((item, index) => (
                        <Items
                            key={index}
                            title={item.product_name || 'name'}
                            image={item.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                            alt={item.brand}
                            onClick={(event) => itemHandler(event, item._id)}
                            description={item.description.slice(0, 200) || 'abcd'}
                        />
                    ))}
                </ul>
            </section>
            <br />
        </>}
        {data4 && <><section id="core-concepts" onClick={ProdDivhandler} name="kid">Kids Wear
            <ul onClick={ProdDivhandler}>
                {data4.map((item, index) => (
                    <Items
                        key={index}
                        title={item.product_name || 'name'}
                        image={item.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                        alt={item.brand}
                        onClick={(event) => itemHandler(event, item._id)}
                        description={item.description.slice(0, 200) || 'abcd'}
                    />
                ))}
            </ul>
        </section>
            <br />
        </>}
        {data5 && <><section id="core-concepts" onClick={ProdDivhandler} name="bags">Bags
            <ul onClick={ProdDivhandler}>
                {data5.map((item, index) => (
                    <Items
                        key={index}
                        title={item.product_name || 'name'}
                        image={item.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                        alt={item.brand}
                        onClick={(event) => itemHandler(event, item._id)}
                        description={item.description.slice(0, 200) || 'abcd'}
                    />
                ))}
            </ul>
        </section>
            <br />
        </>}
        {data6 && <><section id="core-concepts" onClick={ProdDivhandler} name="watch">Watch
            <ul onClick={ProdDivhandler}>
                {data6.map((item, index) => (
                    <Items
                        key={index}
                        title={item.product_name || 'name'}
                        image={item.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                        alt={item.brand}
                        onClick={(event) => itemHandler(event, item._id)}
                        description={item.description.slice(0, 200) || 'abcd'}
                    />
                ))}
            </ul>
        </section>
            <br />
        </>}
        {data7 && <><section id="core-concepts" onClick={ProdDivhandler} name="umbrella">Umbrella
            <ul onClick={ProdDivhandler}>
                {data7.map((item, index) => (
                    <Items
                        key={index}
                        title={item.product_name || 'name'}
                        image={item.image[currentIndex] || 'https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg'}
                        alt={item.brand}
                        onClick={(event) => itemHandler(event, item._id)}
                        description={item.description.slice(0, 200) || 'abcd'}
                    />
                ))}
            </ul>
        </section>
            <br />
        </>}
    </>);
}