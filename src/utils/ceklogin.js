import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateAdmin } from "./adminSlice";
import axios from "axios";

export const useLogin = async (
  isLogin = () => console.log("sudah login"),
  notLogin = () => console.log("belum login")
) => {
  const username = useSelector((state) => state.admin.username);
  const dispatch = useDispatch();
  try {
    await axios.post("http://localhost:5000/api/v1/auth/token", {
      username,
    });
    dispatch(updateAdmin({ statusLogin: true, username: "Admin" }));
    isLogin();
  } catch (err) {
    dispatch(updateAdmin({ statusLogin: false, username: "User" }));
    notLogin();
  }
};
