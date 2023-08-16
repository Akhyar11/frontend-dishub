import { useDispatch } from "react-redux";
import { updateAdmin } from "./adminSlice";
import axios from "axios";
import Cookies from "js-cookie";

export const useLogin = async (
  isLogin = () => console.log("sudah login"),
  notLogin = () => console.log("belum login")
) => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const url = window.location.href;
  console.log({ url });
  try {
    await axios.post("http://localhost:5000/api/v1/auth/token", {
      token,
    });
    dispatch(updateAdmin({ statusLogin: true, username: "Admin" }));
    isLogin();
  } catch (err) {
    dispatch(updateAdmin({ statusLogin: false, username: "User" }));
    notLogin();
  }
};
