import "./cart.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToLink, FromLink, ImageLink } from "../../App";
import Overlay from "../modalOverlay/overlay";
import { FaShareAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

export default function Cart(props) {
  const [currentIndex, setCurrentIndex] = useState('0');
  const [isentervalue, setIsentervalue] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [value, setValue] = useState(props.data.quantity);
  const [image, setImage] = useState(props.data.image[currentIndex * 1]);

  const userid = localStorage.getItem("id");
  const productid = props.data._id;

  const changeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
  };
  useEffect(() => {
    const intervalId = setInterval(changeImage, 1000000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await axios.get(ImageLink + '?' + props.data.image[currentIndex], { responseType: 'arraybuffer', });
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        // console.log(imageUrl);
        setImage(imageUrl);
      } catch (err) {
        console.log(err);
      }
    }
    getImage();
  }, [props.data.image[currentIndex]]);
  const valueEnterHandler = () => {
    setIsentervalue((prev) => (!prev));
  }
  if (props.data.quantity > 4) {
    // setIsentervalue(true);
    // console.log(valueInputRef);
  }
  const SubmitHandler = (e) => {
    e.preventDefault();
    const sendData = async () => {
      if (value === null || value === undefined || value === "") return alert("Please enter a valid quantity");
      try {
        const data = {
          id: userid,
          product_id: productid,
          quantity: value,
        }
        // const resp =
        await axios.post(`${ToLink}/cart/${userid}`, data);
        // console.log(resp);
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  const deleteHandler = () => {
    const deleteData = async () => {
      try {
        const data = {
          id: userid,
          product_id: productid,
          quantity: 0,
        }
        // const resp =
        await axios.post(`${ToLink}/cart/${userid}`, data);
        // console.log(resp);
      } catch (err) {
        console.log(err);
      }
    };
    deleteData();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  const OverLayShowHandler = () => {
    setShowOverlay(!showOverlay);
  }

  return (
    <section>
      {showOverlay && <Overlay link={FromLink + productid} onClose={OverLayShowHandler} />}

      <div id="cart-content">
        {image !== props.data.image[currentIndex * 1] ? <img
          src={image}
          alt={props.data.product_name}
        /> : <Skeleton height={200} width={200} />}
        <div id="cart-detail" style={{ paddingLeft: '15px' }}>
          <h3>{props.data.product_name}</h3>
          <p>In Stock</p>
          <span>
            <input type="checkbox"></input>
            <label htmlFor="Quantiy">This will be a Gift</label>
          </span>
          <span>
            <label>Quantity:</label>
            <input type="number" value={value} onChange={(e) => { setValue(e.target.value) }} disabled={!isentervalue} />
            {isentervalue && <button onClick={SubmitHandler}>Submit</button>}
            <span>
              <label htmlFor="Quantiy">Change Quantity</label>
              <input type="checkbox"
                checked={isentervalue}
                onChange={valueEnterHandler}
              ></input>
            </span>

          </span>
          <span>
            <button onClick={deleteHandler}> Delete</button>
            {/* <button> Save for Later</button> */}
            <button> See More Like This</button>
            <button onClick={OverLayShowHandler}> Share &nbsp; <FaShareAlt /></button>
          </span>
        </div>
        <span id="cart-price">
          <h3>&#8377;{props.data.quantity * 1 * (props.data.discounted_price === " " ? props.data.retail_price : props.data.discounted_price)}</h3>
        </span>
      </div>

    </section >
  );
}
