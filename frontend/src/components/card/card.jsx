// import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToLink } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";
import Overlay from "./../modalOverlay/overlay";
import { FromLink } from "../../App";

export default function Card(props) {
  const navigate = useNavigate();
  const [showOverlay1, setShowOverlay1] = useState(false);
  const [showOverlay2, setShowOverlay2] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const changeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  useEffect(() => {
    const intervalId = setInterval(changeImage, 500000);
    return () => clearInterval(intervalId);
  }, []);

  const discount = 0;
  const clickHandler = (e) => {
    const id = e.currentTarget.id;
    console.log(id);
    navigate(`/${id}`);
  }

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
        console.log(resp);
        alert("Added to cart successfully");
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
  }
  return (
    <>
      {showOverlay1 && <Overlay link={FromLink + props.data[0]._id} onClose={(e) => { OverLayShowHandler1(e) }} />}
      {showOverlay2 && <Overlay link={FromLink + props.data[1]._id} onClose={(e) => { OverLayShowHandler2(e) }} />}

      <div className="cardx">
        <div className="card-content" id={props.data[0]._id} onClick={clickHandler}>
          <div className="card-body">
            <img
              src={props.data[0].image[currentIndex]}
              alt={props.data[0].product_name}
            />
            <span>
              <h5 className="card-title">{props.data[0].product_name}</h5>
              {/* <p className="card-text">
              Some quick example dnjkfdfsk
            </p> */}
              <h5>Product Specification:</h5>
              {props.data[0].product_specifications && props.data[0].product_specifications.product_specification && props.data[0].product_specifications.product_specification.length > 0 &&
                <div>
                  {props.data[0].product_specifications.product_specification.map((ele, index) => (
                    <div key={index}>
                      <span style={{ fontWeight: ele.key ? 'bold' : 'normal' }}>{ele.key}</span>: {ele.value}
                    </div>
                  ))}
                </div>
              }
            </span>
          </div>
          <span>
            <strong>
              <h5>&#8377;{props.data[0].discounted_price}</h5>
            </strong>
            <p>
              <s>&#8377;{props.data[0].retail_price}</s> <span className="discount">{(((props.data[0].retail_price - props.data[0].discounted_price) / props.data[0].retail_price) * 100).toFixed(2) || discount}% off</span>
            </p>
          </span>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
          <div>
            <h3 > <span className="rounded" style={{ backgroundColor: 'cyan', }} onClick={OverLayShowHandler1}>Share &nbsp;<FaShareAlt /></span></h3>
            <br />
            <br />
            <h3> <span className="rounded" style={{ backgroundColor: 'cyan' }} onClick={(e) => { addtoCartHandler(e, props.data[0]._id) }}>Add to Cart</span></h3>

          </div>
        </div>


        {props.data[1] && <div className="card-content" id={props.data[0]._id} onClick={clickHandler}>
          <div className="card-body" >
            <img
              src={props.data[1].image[currentIndex]}
              alt={props.data[1].product_name}
            />
            <span>
              <h5 className="card-title">{props.data[1].product_name}</h5>
              {/* <p className="card-text">
              Some quick example dnjkfdfsk
            </p> */}
              <h5>Product Specification:</h5>
              {props.data[1].product_specifications && props.data[1].product_specifications.product_specification && props.data[1].product_specifications.product_specification.length > 1 &&
                <div>
                  {props.data[1].product_specifications.product_specification.map((ele, index) => (
                    <div key={index}>
                      <span style={{ fontWeight: ele.key ? 'bold' : 'normal' }}>{ele.key}</span>: {ele.value}
                    </div>
                  ))}
                </div>
              }
            </span>
          </div>
          <span>
            <strong>
              <h5>&#8377;{props.data[1].discounted_price}</h5>
            </strong>
            <p>
              <s>&#8377;{props.data[1].retail_price}</s> <span className="discount">{(((props.data[1].retail_price - props.data[1].discounted_price) / props.data[0].retail_price) * 100).toFixed(2) || discount}% off</span>
            </p>
          </span>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
          <div>
            <h3 > <span className="rounded" style={{ backgroundColor: 'cyan', }} onClick={OverLayShowHandler2}>Share &nbsp;<FaShareAlt /></span></h3>
            <br />
            <br />
            <h3> <span className="rounded" style={{ backgroundColor: 'cyan' }} onClick={(e) => { addtoCartHandler(e, props.data[1]._id) }}>Add to Cart</span></h3>
          </div>
        </div>}
      </div>
    </>
  );
}
