import React from "react";

const SidebarContext = React.createContext(
    {
        isSidebarOpen: false,
        toggleSidebar: () => {}
    }
);

export default SidebarContext;