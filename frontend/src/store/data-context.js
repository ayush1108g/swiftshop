import React from "react";

const DataContext = React.createContext({
  data: [],
  setData: () => {},
});
export default DataContext;
