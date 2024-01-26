import React from "react";

const WishContext = React.createContext({
  wishItemNumber: 0,
  wish: [],
  addInWish: () => {},
  removeFromWish: () => {},
  total: 0,
  clear: () => {},
  refresh: () => {},
});

export default WishContext;
