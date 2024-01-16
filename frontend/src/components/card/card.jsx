import 'react-loading-skeleton/dist/skeleton.css'
import "./card.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Overlay from "./../modalOverlay/overlay";
import { useState, useEffect } from "react";
import { ToLink, ImageLink, FromLink } from "../../App";
import { FaShareAlt } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import { useSelector } from "react-redux";
import { CustomisedSkeleton } from '../items/items';
import { AnimatePresence, motion } from 'framer-motion';

export default function Card(props) {
  const isData = props.data[0] === null || props.data[0] === undefined || props.data[0] === "" ? false : true;
  const color = useSelector(state => state.themeMode.color);
  const navigate = useNavigate();
  const [showOverlay1, setShowOverlay1] = useState(false);
  const [showOverlay2, setShowOverlay2] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [image1, setImage1] = useState(props.data[0] && props.data[0].image[currentIndex]);
  const [image2, setImage2] = useState(props.data[1] && props.data[1].image && props.data[1].image[currentIndex] ? props.data[1].image[currentIndex] : "");


  const changeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  useEffect(() => {
    const intervalId = setInterval(changeImage, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const discount = 0;
  const clickHandler = (id) => {
    // const id = e.currentTarget.id;
    console.log(id);

    navigate(`/${id}`);
  }
  useEffect(() => {
    const getImage1 = async () => {
      try {
        const res = await axios.get(ImageLink + '?' + props.data[0].image[currentIndex], { responseType: 'arraybuffer', });
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        // console.log(imageUrl);
        setImage1(imageUrl);
      } catch (err) {
        console.log(err);
      }
    }
    const getImage2 = async () => {
      try {
        const res = await axios.get(ImageLink + '?' + props.data[1].image[currentIndex], { responseType: 'arraybuffer', });
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        // console.log(imageUrl);
        setImage2(imageUrl);
      } catch (err) {
        console.log(err);
      }
    }
    getImage1();

    props.data[1] && getImage2();
  }, [currentIndex]);


  // console.log(props);
  const OverLayShowHandler1 = (e) => {
    e.stopPropagation();
    setShowOverlay1(!showOverlay1);
  }
  const OverLayShowHandler2 = (e) => {
    e.stopPropagation();
    setShowOverlay2(!showOverlay2);
  }
  const addtoCartHandler = (e, prodid) => {
    e.stopPropagation();
    const sendData = async () => {
      try {
        const data = {
          id: localStorage.getItem("id"),
          product_id: prodid,
          quantity: 1,
        };
        if (data.id === null || data.id === undefined || data.id === "") return alert("Please login to add to cart");
        const resp = await axios.post(`${ToLink}/cart/${data.id}`, data);
        // console.log(resp);
        alert("Added to cart successfully");
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
  }


  const framerSidebarPanel = {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '100%', transition: { duration: 0.3 } },
    transition: { duration: 0.3 },
  }

  return (
    <div>
      <AnimatePresence>

        {showOverlay1 && <Overlay link={FromLink + props.data[0]._id} onClose={(e) => { OverLayShowHandler1(e) }} />}
        {showOverlay2 && <Overlay link={FromLink + props.data[1]._id} onClose={(e) => { OverLayShowHandler2(e) }} />}

        <div className="cardx">
          <div className="card-content" id={isData ? props.data[0]._id : Math.random() * 1000} style={{ backgroundColor: color.itembg }}>
            <div className="card-body">
              <AnimatePresence mode='wait'>
                {isData && image1 !== props.data[0].image[currentIndex] ? <motion.img
                  key={image1}
                  src={image1}
                  alt={props.data[0].product_name}
                  {...framerSidebarPanel}
                /> : <CustomisedSkeleton><Skeleton height={250} width={"100%"} /></CustomisedSkeleton>}
              </AnimatePresence>
            </div>
            <div className="card-bodyx">
              <div className="card-body1">
                <span style={{ paddingLeft: '15px', color: color.text, backgroundColor: color.itembg }}>
                  {isData ? <h5 className="card-title">{props.data[0].product_name}</h5> : <CustomisedSkeleton><Skeleton width={"50%"} /></CustomisedSkeleton>}

                  <h5>Product Specification:</h5>
                  {!isData && <CustomisedSkeleton><Skeleton count={5} width={"60%"} /></CustomisedSkeleton>}
                  {isData && props.data[0].product_specifications && props.data[0].product_specifications.product_specification && props.data[0].product_specifications.product_specification.length > 0 &&
                    <div>
                      {props.data[0].product_specifications.product_specification.map((ele, index) => {
                        if (index > 4) return <></>;
                        return <div key={index}>
                          <span style={{ fontWeight: ele.key ? 'bold' : 'normal' }}>{ele.key}</span>: {ele.value.slice(0, 20)}
                        </div>
                      })}
                    </div>
                  }
                  {isData ? <span style={{ color: 'red', }} onmouseover="this.style.color='#fff'" onmouseout="this.style.color='red'" onClick={() => { clickHandler(props.data[0]._id) }}>Read More...</span> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
                </span>
              </div>

              <div className="card-body2">
                <span>
                  <strong>
                    {isData ? <h5>&#8377;{props.data[0].discounted_price}</h5> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
                  </strong>
                  <p>
                    {isData ? <><s>&#8377;{props.data[0].retail_price}</s> <span className="discount">{(((props.data[0].retail_price - props.data[0].discounted_price) / props.data[0].retail_price) * 100).toFixed(2) || discount}% off</span></> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
                  </p>
                </span>

                <div>
                  {isData ? <h3 > <span className="rounded" style={{ color: color.cartIcon }} onClick={OverLayShowHandler1}>Share &nbsp;<FaShareAlt /></span></h3> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
                  <br />
                  <br />
                  {isData ? <h3> <span className="rounded" style={{ color: color.cartIcon }} onClick={(e) => { addtoCartHandler(e, props.data[0]._id) }}>Add to Cart</span></h3> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
                </div>
              </div>
            </div>
          </div>

          {!isData && <Nodata data={props.data} />}
          {props.data[1] && <div className="card-content" id={props.data[1]._id} style={{ backgroundColor: color.itembg }}>
            <div className="card-body" >
              <AnimatePresence mode='wait'>
                {image2 !== props.data[1].image[currentIndex] ? props.data[1].image && <motion.img
                  key={image2}
                  {...framerSidebarPanel}
                  src={image2}
                  alt={props.data[1].product_name}
                /> : <div className="d-flex flex-column"><Skeleton height={200} width={200} /><span>{props.data[1].product_name}</span></div>
                }
              </AnimatePresence >
            </div>
            <div className="card-bodyx">
              <div className="card-body1">
                <span style={{ paddingLeft: '15px', color: color.text, backgroundColor: color.itembg }}>
                  <h5 className="card-title">{props.data[1].product_name}</h5>

                  <h5>Product Specification:</h5>
                  {props.data[1].product_specifications && props.data[1].product_specifications.product_specification && props.data[1].product_specifications.product_specification.length > 1 &&
                    <div>
                      {props.data[1].product_specifications.product_specification.map((ele, index) => {
                        if (index > 4) return <></>;
                        return <div key={index}>
                          <span style={{ fontWeight: ele.key ? 'bold' : 'normal' }}>{ele.key}</span>: {ele.value.slice(0, 20)}
                        </div>
                      })}


                    </div>
                  }
                  <span style={{ color: 'red', }} onmouseover="this.style.color='#fff'" onmouseout="this.style.color='red'" onClick={() => { clickHandler(props.data[1]._id) }}>Read More...</span>

                </span>
              </div>

              <div className="card-body2">
                <span>
                  <strong>
                    <h5>&#8377;{props.data[1].discounted_price}</h5>
                  </strong>
                  <p>
                    <s>&#8377;{props.data[1].retail_price}</s> <span className="discount">{(((props.data[1].retail_price - props.data[1].discounted_price) / props.data[0].retail_price) * 100).toFixed(2) || discount}% off</span>
                  </p>
                </span>
                <div>

                  <h3 > <span className="rounded" style={{ color: color.cartIcon }} onClick={OverLayShowHandler2}>Share &nbsp;<FaShareAlt /></span></h3>
                  <h3> <span className="rounded" style={{ color: color.cartIcon }} onClick={(e) => { addtoCartHandler(e, props.data[1]._id) }}>Add to Cart</span></h3>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </AnimatePresence>
    </div>
  );
}


const Nodata = (props) => {
  const isData = props.data[0] === null || props.data[0] === undefined || props.data[0] === "" ? false : true;
  const color = useSelector(state => state.themeMode.color);
  const discount = 0;
  return (
    <div className="card-content" id={isData ? props.data[0]._id : Math.random() * 1000} style={{ backgroundColor: color.itembg }}>
      <div className="card-body">
        {!isData && <CustomisedSkeleton><Skeleton width={"100%"} height={250} /></CustomisedSkeleton>}
      </div>
      <div className="card-bodyx">
        <div className="card-body1">
          <span style={{ paddingLeft: '15px', color: color.text, backgroundColor: color.itembg }}>
            {isData ? <h5 className="card-title">{props.data[0].product_name}</h5> : <CustomisedSkeleton><Skeleton width={"50%"} /></CustomisedSkeleton>}

            <h5>Product Specification:</h5>
            {!isData && <CustomisedSkeleton><Skeleton count={5} width={"60%"} /></CustomisedSkeleton>}
            {isData && props.data[0].product_specifications && props.data[0].product_specifications.product_specification && props.data[0].product_specifications.product_specification.length > 0 &&
              <div>
                {props.data[0].product_specifications.product_specification.map((ele, index) => {
                  if (index > 4) return <></>;
                  return <div key={index}>
                    <span style={{ fontWeight: ele.key ? 'bold' : 'normal' }}>{ele.key}</span>: {ele.value}
                  </div>
                })}
              </div>
            }
            {isData ? <span style={{ color: 'red', }} onmouseover="this.style.color='#fff'" onmouseout="this.style.color='red'" >Read More...</span> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
          </span>
        </div>

        <div className="card-body2">
          <span>
            <strong>
              {isData ? <h5>&#8377;{props.data[0].discounted_price}</h5> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
            </strong>
            <p>
              {isData ? <><s>&#8377;{props.data[0].retail_price}</s> <span className="discount">{(((props.data[0].retail_price - props.data[0].discounted_price) / props.data[0].retail_price) * 100).toFixed(2) || discount}% off</span></> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
            </p>
          </span>

          <div>
            {isData ? <h3 > <span className="rounded" style={{ color: color.cartIcon }}>Share &nbsp;<FaShareAlt /></span></h3> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
            <br />
            <br />
            {isData ? <h3> <span className="rounded" style={{ color: color.cartIcon }} >Add to Cart</span></h3> : <CustomisedSkeleton><Skeleton width={"30%"} /></CustomisedSkeleton>}
          </div>
        </div>
      </div>
    </div>
  )
};
