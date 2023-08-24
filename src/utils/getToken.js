import axios from "axios";
import Cookies from "js-cookie";

const getToken = async () => {
  const token = Cookies.get("token");
  const url = window.location.href;
  console.log({ url });
  try {
    const res = await axios.post("http://localhost:5000/api/v1/auth/token", {
      token,
    });
    return res.data.accsessToken;
  } catch (err) {
    return err;
  }
};

export default getToken;
