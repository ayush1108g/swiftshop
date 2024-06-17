import axios from "axios";
import { ToLink } from "./../../constants.js";
export const refreshAccessToken = async (func, loginCtx, refreshToken) => {
  const rtoken = refreshToken || loginCtx.RefreshToken;

  if (!rtoken) return alert("Please login again");
  loginCtx.setLoading(true);
  try {
    const resp = await axios.get(`${ToLink}/user/verifyrefreshtoken`, {
      headers: {
        Authorization: `Bearer ${rtoken}`,
      },
    });
    console.log(resp);
    if (
      resp.status === 200 ||
      resp.status === 201 ||
      resp.status === "success" ||
      resp.status === "Success"
    ) {
      loginCtx.setAccessToken(resp.data.AccessToken);
      loginCtx.setRefreshToken(resp.data.RefreshToken);
      setTimeout(() => {
        func(resp.data.AccessToken);
      }, 1000);
    } else {
      alert("Please login again");
    }
  } catch (err) {
    console.log(err);
    alert("Please login again");
  } finally {
    setTimeout(() => {
      loginCtx.setLoading(false);
    }, 500);
  }
};
