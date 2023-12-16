import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToLink } from '../App';
import classes from './productPage.module.css';
import Card from '../components/card/card';
import { useNavigate, useLocation } from 'react-router-dom';


const ProductPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('No Data Found');

    console.log(searchParams);
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');

    console.log(search, page, limit, sort);



    const backPageHandler = () => {
        if (page * 1 > 1) {
            // setPage(page * 1 - 1);
            navigate(`/page/?search=${search.split(" ").join('+')}&page=${page * 1 - 1}&limit=${limit}&sort=${sort}`);
        }
    }
    const nextPageHandler = () => {
        console.log(page);
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
                    console.log(newItem);
                    return newItem;
                });
                console.log(newData);
                setData(newData);
                if (newData.length > 1) setMessage("");
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {message !== '' && <div className='h4 d-flex justify-content-center'>{message}</div>}
            {data.map((item, index) => {
                if (index % 2 === 0) {
                    return (
                        <Card
                            key={index}
                            data={[data[index], data[index + 1]]}
                        />);
                } else {
                    return null;
                }
            })}
            <div className={classes.pagination}>
                <button onClick={backPageHandler}>Back</button>
                <span>{page}</span>
                <button onClick={nextPageHandler}>Next</button>
            </div>
        </div>
    );
};
export default ProductPage;