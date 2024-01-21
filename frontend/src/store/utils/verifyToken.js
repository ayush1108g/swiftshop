import axios from "axios";
import { ToLink } from "../../constants";

const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${ToLink}/user/verifytoken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (response.status === 200) {
      return { isLoggedin: true, name: response.data.name };
    }
  } catch (err) {
    console.log(err);
    return { isLoggedin: false, name: null };
  }
};
export default verifyToken;
