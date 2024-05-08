import React from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

import MainItems from "../components/items/itemsMain.jsx";
import TypeWriter from "../components/dynamicType.tsx";

export default function HomePage() {
  return (
    < div >
      <MainItems />
      <Outlet />
    </div >
  );
}

interface HeaderMainProps {
  navStyle: {
    backgroundColor: string;
    backdropFilter: string;
    transition: string;
  }
}
export const HeaderMain:React.FC<HeaderMainProps> = ({ navStyle }) => {
  const navigate = useNavigate();

  return (
    <div className="h2 d-flex align-item-center justify-content-center" style={{ marginBottom: '0px', ...navStyle }} onClick={() => navigate('/')}>
      <TypeWriter textToType='SwiftShop' fontFamily='Courier' duration={500} isBold='true' />
    </div>
  )
}
