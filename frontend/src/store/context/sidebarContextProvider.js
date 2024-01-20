import SidebarContext from "./sidebar-context";
import { useState } from "react";

const SidebarContextProvider = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const context = {
    isSidebarOpen: sidebarOpen,
    toggleSidebar: toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={context}>
      {props.children}
    </SidebarContext.Provider>
  );
};
export default SidebarContextProvider;
