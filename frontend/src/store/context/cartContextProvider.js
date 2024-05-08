import React from "react";
import { useEffect, useState, useContext } from "react";
import CartContext from "./cart-context.js";
import LoginContext from "./login-context.js";
import axios from "axios";
import { ToLink } from "../../constants.js";
import { useCookies } from "react-cookie";
import { useAlert } from "./Alert-context.js";
import { refreshAccessToken } from "../utils/refreshAccessToken.js";

const CartContextProvider = (props) => {
  const { showAlert } = useAlert();
  const loginCtx = useContext(LoginContext);
  const [lengthx, setLengthx] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cookie] = useCookies(["token"]);

  const isLoggedIn = loginCtx.isLoggedIn;
  const resp = async () => {
    const sendData = async (AccessToken) => {
      if (!isLoggedIn) return;
      try {
        console.log("resp rendered", cookie.token);

        const data = await axios.get(`${ToLink}/cart`, {
          headers: { Authorization: `Bearer ${AccessToken}` },
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
          newItem.product_category_tree = JSON.parse(
            item.product_category_tree
          );
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
        if (
          err.message === "jwt expired" ||
          err?.response?.data?.message === "jwt expired"
        ) {
          console.log("jwt expired");
          return refreshAccessToken(sendData, loginCtx);
        }
        console.log(err);
      }
    };
    sendData(loginCtx.AccessToken);
  };

  const addtoCartHandler = (productid, quantity = 1) => {
    const quant = Math.floor(quantity * 1);
    const sendData = async (AccessToken) => {
      console.log("addtoCartHandler rendered");
      try {
        const data = {
          product_id: productid,
          quantity: quant,
        };
        if (!isLoggedIn)
          return showAlert("success", "Please login to add to cart");
        const response = await axios.post(`${ToLink}/cart`, data, {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        });
        console.log(response);
        if (response.status === 200) {
          resp();
        }
        showAlert("success", "Added to cart successfully");
      } catch (err) {
        if (
          err.message === "jwt expired" ||
          err?.response?.data?.message === "jwt expired"
        ) {
          console.log("jwt expired");
          return refreshAccessToken(sendData, loginCtx);
        }
        console.log(err);
      }
    };
    sendData(loginCtx.AccessToken);
  };

  const deleteHandler = (productid) => {
    const deleteData = async (AccessToken) => {
      console.log("deleteHandler rendered");
      try {
        const data = {
          product_id: productid,
          quantity: 0,
        };
        if (!isLoggedIn) return showAlert("success", "Please login first");
        const response = await axios.post(`${ToLink}/cart`, data, {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        });
        // console.log(response);
        if (cart.length === 1) {
          clear();
        }
        if (response.status === 200) {
          await resp();
        }
        showAlert("success", "Removed from cart successfully");
      } catch (err) {
        if (
          err.message === "jwt expired" ||
          err?.response?.data?.message === "jwt expired"
        ) {
          console.log("jwt expired");
          return refreshAccessToken(deleteData, loginCtx);
        }
        console.log(err);
      }
    };
    deleteData(loginCtx.AccessToken);
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
  }, [cookie.AccessToken, isLoggedIn]);

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
