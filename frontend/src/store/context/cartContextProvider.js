import React from "react";
import { useEffect, useState } from "react";
import CartContext from "./cart-context.js";
import axios from "axios";
import { ToLink } from "../../constants.js";

const CartContextProvider = (props) => {
  const [lengthx, setLengthx] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const resp = async (userid) => {
    if (userid === null || userid === undefined || userid === "") return;
    const id = userid;
    try {
      console.log("resp rendered");

      const data = await axios.get(`${ToLink}/cart/${id}`);
      const ProductId = data.data.data.cart;
      if (ProductId.length === 0) {
        setLengthx(0);
        setCart([]);
        setTotalPrice(0);
        return;
      }

      let length = 0;
      data.data.data.cart.forEach((item) => {
        length += item.quantity;
      });
      setLengthx(length);
      const productPromises = ProductId.map(async (item) => {
        const productData = await axios.get(
          `${ToLink}/product_data/products/${item.product_id}`
        );
        productData.data.data.quantity = item.quantity;
        return productData.data.data;
      });

      const productDataArray = await Promise.all(productPromises);
      const newData = productDataArray.map((item) => {
        const newItem = { ...item };
        newItem.image = JSON.parse(item.image);
        return newItem;
      });
      console.log("newData: ", newData);
      const TP = newData
        .map((item) => {
          const price = item.discounted_price || item.retail_price;
          const quantity = item.quantity;
          const total = price * 1 * quantity * 1;
          return total;
        })
        .reduce((acc, itemTotal) => acc + itemTotal, 0);
      setTotalPrice(TP);
      setCart(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const userid = localStorage.getItem("id");
  useEffect(() => {
    console.log("useEffect rendered");
    resp(userid);
  }, [userid]);

  const addtoCartHandler = (productid, quantity = 1) => {
    const quant = Math.floor(quantity * 1);

    const sendData = async () => {
      console.log("addtoCartHandler rendered");
      const userid = localStorage.getItem("id");
      try {
        const data = {
          id: userid,
          product_id: productid,
          quantity: quant,
        };
        if (data.id === null || data.id === undefined || data.id === "")
          return alert("Please login to add to cart");
        const response = await axios.post(`${ToLink}/cart/${data.id}`, data);
        console.log(response);
        if (response.status === 200) {
          resp(userid);
        }
        alert("Added to cart successfully");
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
  };

  const deleteHandler = (productid) => {
    const deleteData = async () => {
      console.log("deleteHandler rendered");
      const userid = localStorage.getItem("id");
      try {
        const data = {
          id: userid,
          product_id: productid,
          quantity: 0,
        };
        if (data.id === null || data.id === undefined || data.id === "")
          return alert("Please login to add to cart");
        await axios.post(`${ToLink}/cart/${userid}`, data);
        await resp(userid);
      } catch (err) {
        console.log(err);
      }
    };
    deleteData();
  };
  const refresh = () => {
    const userid = localStorage.getItem("id");
    console.log("refresh rendered");
    resp(userid);
  };
  const clear = () => {
    setLengthx(0);
    setCart([]);
    setTotalPrice(0);
  };

  const context = {
    cartItemNumber: lengthx,
    cart: cart,
    addInCart: addtoCartHandler,
    removeFromCart: deleteHandler,
    total: totalPrice,
    clear: clear,
    refresh: refresh,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
