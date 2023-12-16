import "./items.css";
import Items from './items.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToLink } from '../../App.jsx';
import axios from 'axios';

export default function MainItem() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
    const [data6, setData6] = useState([]);
    const [data7, setData7] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

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
            } catch (err) {
                console.log(err);
            }
        }
        const resp6 = async () => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products?search=watch&limit=4`);
                let data = data1x.data.data.newProduct;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    return newItem;
                });
                setData7(newData);
            } catch (err) {
                console.log(err);
            }
        }

        resp();
        resp1();
        resp2();
        resp3();
        resp4();
        resp5();
        resp6();
    }, []);

    const itemHandler = (e, id) => {
        console.log(id);
    }

    return (<>
        {data3 && <>
            <section id="core-concepts">
                SunGlasses
                <ul>
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
            <section id="core-concepts">Footwear
                <ul>
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
            <section id="core-concepts">Electronics
                <ul>
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
        {data4 && <><section id="core-concepts">Kids Wear
            <ul>
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
        {data5 && <><section id="core-concepts">Bags
            <ul>
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
        {data6 && <><section id="core-concepts">Watch
            <ul>
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
        {data7 && <><section id="core-concepts">Watch
            <ul>
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