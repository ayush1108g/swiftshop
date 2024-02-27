import "./cart.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CartContext from "../../store/context/cart-context.js";
import { FromLink, ImageLink } from "../../constants.js";
import Overlay from "../modalOverlay/overlay";
import { FaShareAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAlert } from "../../store/context/Alert-context.js";

export default function Cart(props) {
  const alertCtx = useAlert();
  const navigate = useNavigate();
  const color = useSelector(state => state.themeMode.color);
  const cartCtx = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState('0');
  const [isentervalue, setIsentervalue] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [value, setValue] = useState(props.data.quantity);
  const [image, setImage] = useState(props.data.image[currentIndex * 1]);
  const [seeMoreLikeThis, setSeeMoreLikeThis] = useState('watch');

  useEffect(() => {
    const ltx =
      props.data.product_category_tree && props.data.product_category_tree[0] && props.data.product_category_tree[0].split(">>")[1] &&
      props.data.product_category_tree[0].split(">>")[1].trim().split(" ");
    setSeeMoreLikeThis(ltx && ltx[ltx.length - 1]);
  }, [props.data.product_category_tree, setSeeMoreLikeThis]);

  // const userid = localStorage.getItem("id");
  const productid = props.data._id;

  const changeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
  };
  useEffect(() => {
    const intervalId = setInterval(changeImage, 60000);
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
    const val = value * 1;
    Math.floor(val);
    if (val < 0) {
      alertCtx.showAlert('danger', 'Quantity cannot be negative');
      return;
    }
    if (val * 1 === 0) {
      deleteHandler();
      return;
    }
    if (val * 1 > 20) {
      alertCtx.showAlert('danger', 'Quantity cannot be more than 20');
      return;
    }
    cartCtx.addInCart(productid, val);
    setIsentervalue(false);
    setValue(props.data.quantity * 1);
    cartCtx.refresh();

  }
  const deleteHandler = () => {
    cartCtx.removeFromCart(productid);
    // if (props.length === 1) {
    //   cartCtx.clear();
    // }
    // cartCtx.refresh();
    // setValue(props.data.quantity);
  }
  const OverLayShowHandler = () => {
    setShowOverlay(!showOverlay);
  }

  useEffect(() => {
    setValue(props.data.quantity);
  }, [props.data.quantity]);

  const seeMoreHandler = (event) => {
    navigate(`/page/?search=${seeMoreLikeThis}&page=1&limit=20&sort=null`);
  }


  return (
    <section id='main-cover' style={{ backgroundColor: color.itembg }}>
      {showOverlay && <Overlay link={FromLink + productid} onClose={OverLayShowHandler} />}

      <div id="cart-content">
        {image !== props.data.image[currentIndex * 1] ? <img
          src={image}
          alt={props.data.product_name}
          loading="lazy"
        /> : <Skeleton height={250} width={250} />}
        <div id="cart-detail" style={{ color: color.text }}>
          <h3 style={{ color: color.text }}>{props.data.product_name}</h3>
          <p>In Stock</p>
          <span>
            <input type="checkbox"></input>
            <label htmlFor="Quantiy">This will be a Gift</label>
          </span>
          <span >
            <span id='input-span'>
              <label>Quantity:</label>
              <input type="number" value={value} onChange={(e) => { setValue(e.target.value) }} disabled={!isentervalue} />
              {isentervalue && <button onClick={SubmitHandler}>Submit</button>}
            </span>
            <span id='cart-checkbox'>
              <br></br>
              <label htmlFor="Quantiy">Change Quantity</label>
              <input

                type="checkbox"
                checked={isentervalue}
                onChange={valueEnterHandler}
              ></input>
            </span>

          </span>
        </div>



        <span id="cart-price" style={{ backgroundColor: color.itembg }}>
          <h3 style={{ color: color.text }}>&#8377;{(props.data.discounted_price === " " ? props.data.retail_price : props.data.discounted_price)}  x  {props.data.quantity * 1}</h3>
        </span>
      </div>
      <span id='cart-buttons'>
        <button onClick={deleteHandler}> Delete</button>
        {/* <button> Save for Later</button> */}
        <button onClick={seeMoreHandler}> See More Like This</button>
        <button onClick={OverLayShowHandler}> Share &nbsp; <FaShareAlt /></button>
      </span>

    </section >
  );
}
