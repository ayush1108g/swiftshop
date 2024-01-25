import React from "react";
import { useEffect, useState } from "react";
import CartContext from "./cart-context.js";
import LoginContext from "./login-context.js";
import axios from "axios";
import { ToLink } from "../../constants.js";
import { useCookies } from "react-cookie";
import { useContext } from "react";

const CartContextProvider = (props) => {
  const loginCtx = useContext(LoginContext);
  const [lengthx, setLengthx] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cookie] = useCookies(["token"]);

  const isLoggedIn = loginCtx.isLoggedIn;
  const resp = async () => {
    if (!isLoggedIn) return;
    try {
      console.log("resp rendered", cookie.token);

      const data = await axios.get(`${ToLink}/cart`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
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
        newItem.product_category_tree = JSON.parse(item.product_category_tree);
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

  const addtoCartHandler = (productid, quantity = 1) => {
    const quant = Math.floor(quantity * 1);

    const sendData = async () => {
      console.log("addtoCartHandler rendered");

      try {
        const data = {
          product_id: productid,
          quantity: quant,
        };
        if (!isLoggedIn) return alert("Please login to add to cart");
        const response = await axios.post(`${ToLink}/cart`, data, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        });
        console.log(response);
        if (response.status === 200) {
          resp();
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
      try {
        const data = {
          product_id: productid,
          quantity: 0,
        };
        if (!isLoggedIn) return alert("Please login to add to cart");
        await axios.post(`${ToLink}/cart`, data, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        });
        await resp();
      } catch (err) {
        console.log(err);
      }
    };
    deleteData();
  };
  const refresh = () => {
    console.log("refresh rendered", cookie.token);
    resp();
  };
  const clear = () => {
    setLengthx(0);
    setCart([]);
    setTotalPrice(0);
  };

  useEffect(() => {
    resp();
  }, [cookie.token, isLoggedIn]);

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
