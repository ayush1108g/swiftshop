import { Outlet } from "react-router";
import MainItems from "../components/items/itemsMain";
import TypeWriter from "../components/dynamicType";

import { useNavigate } from "react-router";
export default function HomePage() {
  // const dispatch = useDispatch();

  return (
    < div >
      <MainItems />
      <Outlet />
    </div >
  );
}

export const HeaderMain = ({ navStyle }) => {
  const navigate = useNavigate();

  return (
    <div className="h2 d-flex align-item-center justify-content-center" style={{ marginBottom: '0px', ...navStyle }} onClick={() => navigate('/')}>
      <TypeWriter textToType='SwiftShop' fontFamily='Courier' duration='500' isBold='true' />
    </div>
  )
}
