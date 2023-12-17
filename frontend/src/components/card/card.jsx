// import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToLink } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate();

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
  return (
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
      </div>}
    </div>
  );
}
