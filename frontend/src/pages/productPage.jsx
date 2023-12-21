import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToLink } from '../App';
import classes from './productPage.module.css';
import Card from '../components/card/card';
import { useNavigate, useLocation } from 'react-router-dom';


const ProductPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [pagex, setPagex] = useState(1);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('No Data Found');

    const search = searchParams.get('search');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');

    const backPageHandler = () => {
        if (page * 1 > 1) {
            navigate(`/page/?search=${search.split(" ").join('+')}&page=${page * 1 - 1}&limit=${limit}&sort=${sort}`);
        }
    }
    const nextPageHandler = () => {
        navigate(`/page/?search=${search.split(" ").join('+')}&page=${page * 1 + 1}&limit=${limit}&sort=${sort}`);
    }
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
                setData(newData);
                if (newData.length > 1) setMessage("");
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const handlerFilerItem = (e) => {
        const sort = e.target.getAttribute('name');
        navigate(`/page/?search=${search.split(" ").join('+')}&page=${page}&limit=${limit}&sort=${sort}`);
    }

    const goToPageHandler = () => {
        navigate(`/page/?search=${search.split(" ").join('+')}&page=${pagex}&limit=${limit}&sort=${sort}`);
    }
    return (
        <div>
            {message !== '' && <div className='h4 d-flex justify-content-center'>{message}</div>}
            {data && <>
                <div className="dropdown" style={{ position: "absolute ", right: "10vw" }} >
                    <button className="btn"
                        type="button" id="dropdownMenuButton" data-toggle="dropdown" ><h2>Filter by</h2 >
                    </button>
                    <div className="dropdown-menu bg-light" aria-labelledby="dropdownMenuButton">
                        <li className="dropdown-item" name="discounted_price" onClick={handlerFilerItem}>Increasing Discounted Price </li>
                        <li className="dropdown-item" name="-discounted_price" onClick={handlerFilerItem}>Decreasing Discounted Price</li>
                        <li className="dropdown-item" name="retail_price" onClick={handlerFilerItem}>Increasing Retail Price</li>
                        <li className="dropdown-item" name="-retail_price" onClick={handlerFilerItem}>Decreasing Retail Price</li>
                        <li className='dropdown-item' name="discount_percentage" onClick={handlerFilerItem}>Increasing Discount</li>
                        <li className='dropdown-item' name="-discount_percentage" onClick={handlerFilerItem}>Decreasing Discount</li>
                    </div>
                </div>
                <br />
                <br />
                <br />
            </>}
            {data.map((item, index) => {
                if (index % 2 === 0) {
                    return (
                        <Card
                            key={index}
                            data={[data[index], data[index + 1] ? data[index + 1] : null]}
                        />);
                } else {
                    return null;
                }
            })}

            <div className={classes.pagination}>
                <button onClick={backPageHandler}>Back</button>
                <span>{page}</span>
                <button onClick={nextPageHandler}>Next</button>
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

            </div>
            <div className={classes.pagination2}>
                <input
                    type="number"
                    value={page}
                    onChange={(e) => setPagex(parseInt(e.target.value, 10))}
                    min="1"
                    step="1"
                />
                <button onClick={goToPageHandler}>Go to Page</button>
            </div>
        </div>
    );
};
export default ProductPage;