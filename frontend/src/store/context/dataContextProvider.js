import DataContext from "./data-context";
import { useState } from "react";

const DataContextProvider = (props) => {
  const [data, setData] = useState({
    // electronic: [],
    // watch: [],
    // footwear: [],
    // sunglass: [],
    // kid: [],
    // bag: [],
    // umbrella: [],
  });

  const addDataHandler = (key, newData) => {
    setData((prevData) => {
      //   console.log("prevData: ", prevData);
      return { ...prevData, [key]: newData };
    });
  };
  const context = {
    data: data,
    setData: addDataHandler,
  };

  return (
    <DataContext.Provider value={context}>
      {props.children}
    </DataContext.Provider>
  );
};
export default DataContextProvider;
