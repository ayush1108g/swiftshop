import DataContext from "./data-context";
import { useState } from "react";

const DataContextProvider = (props) => {
  const [data, setData] = useState({
    data1: [],
    data2: [],
    data3: [],
    data4: [],
    data5: [],
    data6: [],
    data7: [],
  });

  const addDataHandler = (key, newData) => {
    setData((prevData) => {
      //   console.log("prevData: ", prevData);
      //   console.log("key: ", key);
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
