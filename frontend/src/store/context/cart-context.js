import React from "react";

const CartContext = React.createContext({
  cartItemNumber: 0,
  cart: [],
  addInCart: () => {},
  removeFromCart: () => {},
  total: 0,
  clear: () => {},
  refresh: () => {},
});

export default CartContext;
