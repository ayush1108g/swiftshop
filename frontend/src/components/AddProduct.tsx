import React,{useState} from 'react'
import axios from 'axios';

import { ToLink } from '../constants';

const AddProduct:React.FC = () => {
    const [msg, setMsg] = useState<string>('');
    const [product_id, setProduct_id] = useState('');
    const [formData, setFormData] = useState({
        product_name: '',
        product_category_tree: '',
        retail_price: '',
        discounted_price: '',
        images: '',
        description: '',
        product_rating: '',
        overall_rating: '',
        brand: '',
        product_specifications: '',
    });

    // Function to handle the form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Function to format the product specifications
    const formatSpecifications = (input) => {
        const keyValuePairs = input.split(',');
        console.log(keyValuePairs);
        const newkmap = keyValuePairs.map((val => { return val.split('-') }));
        console.log(newkmap);
        const formattedPairs = newkmap.map(
            ([key, value]) => `{"key":"${key}", "value":"${value}"}`
        );
        return formattedPairs.join(', ');
    };

    // Function to submit the form data
    const submitFormHandler = async (e) => {
        e.preventDefault();
        let data;
        data = { ...formData };
        data.image = JSON.stringify(data.images.split(','))
        data.product_category_tree = JSON.stringify([data.product_category_tree]);

        console.log(data);
        let nspString = `{ "product_specification": [${formatSpecifications(formData.product_specifications)}] }`;
        nspString = nspString.replace(/":/g, '"=>');
        let nsp = JSON.stringify(nspString);
        data.product_specifications = nsp;
        // console.log(data.product_specifications);
        console.log(data);
        try {
            const resp = await axios.post(ToLink + '/product_data/products', data);
            console.log(resp);
            setFormData({
                product_name: '',
                product_category_tree: '',
                retail_price: '',
                discounted_price: '',
                images: '',
                description: '',
                product_rating: '',
                overall_rating: '',
                brand: '',
                product_specifications: '',
            });
            setProduct_id(`https://ayush1108g.github.io/winter_code_week_2/#/${resp.data.prod_id}`);
            setMsg('Product Added Successfully.\n');
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            {msg && <div className="alert alert-success d-flex flex-column justify-content-center" style={{ width: '80%', marginLeft: '10%' }}>{msg}
                <a href={product_id} target='_blank' rel='noreferrer'>{product_id}</a>
            </div>}
            <h1>Product Form</h1>
            <form onSubmit={submitFormHandler} className='d-flex flex-column justify-content-center ' style={{ width: '80%', paddingLeft: '10%' }}>
                <label>Product Name:</label>
                <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} required />

                <label>Product Category Tree:</label>
                <input type="text" name="product_category_tree" value={formData.product_category_tree} onChange={handleChange} required placeholder="Clothing&gt;&gt; Women's Clothing &gt;&gt; Sleep & Swimwear &gt;&gt; Shorts &gt;&gt; Alisha Shorts &gt;&gt; Alisha Solid Women's Cycling Shorts" />

                <label>Retail Price:</label>
                <input type="number" name="retail_price" value={formData.retail_price} onChange={handleChange} required placeholder='599' />

                <label>Discounted Price:</label>
                <input type="number" name="discounted_price" value={formData.discounted_price} onChange={handleChange} required placeholder='399' />

                <label>Description:</label>
                <textarea type="text" name="description" value={formData.description} onChange={handleChange} required />

                <label>Product Rating:</label>
                <input type="number" name="product_rating" value={formData.product_rating} onChange={handleChange} required />

                <label>Overall Rating:</label>
                <input type="number" name="overall_rating" value={formData.overall_rating} onChange={handleChange} required />

                <label>Brand:</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />

                <label>Product Specifications:</label>
                <input type="text" name="product_specifications" value={formData.product_specifications} onChange={handleChange} required placeholder="Enter product specifications in key value pair in array {'key'-'value'},{'anotherkey '-'anotherValue '} separated by comma( , )" />

                <label>Images:</label>
                <input type="text" name="images" value={formData.images} onChange={handleChange} required placeholder="Enter image links separated by commma( , )" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default AddProduct;