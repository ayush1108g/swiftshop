import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { ToLink } from '../constants.js';
import classes from './productPage.module.css';
import Card from '../components/card/card.jsx';
import { RootState } from "../store/utils/index.ts";

const ProductPage:React.FC = () => {
    const color = useSelector((state:RootState) => state.themeMode.color);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const [length, setlength] = useState<number>(1);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState<string>('');
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const search: string | null = searchParams.get('search');

    const page:number =parseInt( searchParams.get('page')|| '1');
    const limit:number = parseInt(searchParams.get('limit')|| '10');
    const sort:string|null = searchParams.get('sort');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data1x = await axios.get(`${ToLink}/product_data/products/page?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
                const data = data1x.data.data;
                const newData = data.map((item) => {
                    const newItem = { ...item };
                    newItem.image = JSON.parse(item.image);
                    newItem.product_category_tree = JSON.parse(item.product_category_tree);
                    const specificationsString = item.product_specifications;
                    let validJSONString = specificationsString.replace(/"=>/g, '": ');
                    if (validJSONString) {
                        newItem.product_specifications = JSON.parse(validJSONString);
                    }
                    return newItem;
                });
                setData(newData)
                console.log(data1x);
                setDataLoaded(true);
                setlength(Math.ceil(data1x.data.totalLength / limit));
                if (newData.length > 1) setMessage("");
                else setMessage('No data found');
            } catch (err) {
                console.log(err);
                setMessage('No data found');
            }
        }
        fetchData();
    }, [search, page, limit, sort]);

    const generateNumber = () => {
        let numbers:(number | string)[] = [];
        let start:number = Math.max(page * 1 - 2, 1);
        let end:number = Math.min(page * 1 + 2, length);

        if (length === 1) {
            numbers.push(1);
            return numbers;

        }
        if (start > 2) {
            numbers.push(1);
            numbers.push(2);
            // numbers.push('...');
        } else if (start > 1) {
            numbers.push(1);
            // numbers.push('...');
        }
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        if (!numbers.includes(length - 1)) {
            // numbers.push('...');
            numbers.push(length - 1);
            numbers.push(length);
        }
        else if (!numbers.includes(length)) {
            // numbers.push('...');
            numbers.push(length);
        }
        numbers = [...new Set(numbers)];
        numbers.sort((a, b) => a * 1 - b * 1);
        numbers.filter((ele) => Number(ele) > 0);

        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] * 1 - 1 !== numbers[i - 1] * 1) {
                numbers.splice(i, 0, '...');
                i++;
            }
        }


        return numbers;
    }
    const handlerFilerItem = (e) => {
        const sort = e.target.getAttribute('name');
        navigate(`/page/?search=${search?.split(" ").join('+')}&page=${page}&limit=${limit}&sort=${sort}`);
    }

    const goToPageHandler = (pageno) => {
        navigate(`/page/?search=${search?.split(" ").join('+')}&page=${pageno}&limit=${limit}&sort=${sort}`);
        window.scrollTo(0, 0);
    }
    let arr = [1, 2, 3, 4];
    return (
        <div>
            {message !== '' && <div className='h4 d-flex justify-content-center' style={{ padding: '100px' }}>{message}</div>}
            {/* {data && data.length > 0 && <> */}
            <div className="dropdown" style={{ position: "absolute ", right: "10vw", color: color.text }} >
                <button className="btn"
                    type="button" id="dropdownMenuButton" data-toggle="dropdown" ><h2 style={{ color: color.itembg1 }}>{(dataLoaded && message === '') ? 'Filter by' : ''}</h2 >
                </button>
                <div className="dropdown-menu bg-light" aria-labelledby="dropdownMenuButton"
                    style={{ padding: '0px' }}>
                    <li className="dropdown-item" name="discounted_price" onClick={handlerFilerItem} style={{ color: color.text, backgroundColor: color.itembg3 }}>Increasing Discounted Price </li>
                    <li className="dropdown-item" name="-discounted_price" onClick={handlerFilerItem} style={{ color: color.text, backgroundColor: color.itembg3 }}>Decreasing Discounted Price</li>
                    <li className="dropdown-item" name="retail_price" onClick={handlerFilerItem} style={{ color: color.text, backgroundColor: color.itembg3 }}>Increasing Retail Price</li>
                    <li className="dropdown-item" name="-retail_price" onClick={handlerFilerItem} style={{ color: color.text, backgroundColor: color.itembg3 }}>Decreasing Retail Price</li>
                    <li className='dropdown-item' name="discount_percentage" onClick={handlerFilerItem} style={{ color: color.text, backgroundColor: color.itembg3 }}>Increasing Discount</li>
                    <li className='dropdown-item' name="-discount_percentage" onClick={handlerFilerItem} style={{ color: color.text, backgroundColor: color.itembg3 }}>Decreasing Discount</li>
                </div>
            </div>
            <br />
            <br />
            <br />
            {/* </>} */}
            {!dataLoaded && arr.map((ele, index) => {
                if (index % 2 === 0) {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', height: 'auto' }}>
                            <div className={classes.carddiv}>
                                <Card
                                    key={index}
                                    data={[null, null]}
                                />
                            </div >
                            <div className={classes.carddiv}>
                                <Card
                                    key={index}
                                    data={[null, null]}
                                />
                            </div>
                        </div>);
                } return null;
            })
            }
            {data.map((item, index) => {
                if (index % 4 === 0) {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', height: 'auto' }}>
                            <div className={classes.carddiv}>
                                <Card
                                    key={index}
                                    data={[data[index], data[index + 1] ? data[index + 1] : null]}
                                />
                            </div >
                            <div className={classes.carddiv}>
                                <Card
                                    key={index}
                                    data={[data[index + 2] ? data[index + 2] : null, data[index + 3] ? data[index + 3] : null]}
                                />
                            </div>
                        </div>);
                } else {
                    return null;
                }
            })}

            {data.length > 0 && <div className={classes.pagination}>
                {generateNumber().map((ele, index) => {
                    return <span style={{ fontWeight: Number(ele) === Number(page) ? 'bold' : '' }} onClick={() => ele === '...' ? ' ' : goToPageHandler(ele)} >&nbsp;{ele}&nbsp;</span>
                })}
            </div>}
        </div >
    );
};
export default ProductPage;