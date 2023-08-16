import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAdmin } from "../../utils/adminSlice";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUser] = useState("");
  const [pass, setPass] = useState("");
  const statusLogin = useSelector((state) => state.admin.statusLogin);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const hadelLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login/admin",
        {
          username,
          pass,
        }
      );
      dispatch(updateAdmin({ username, statusLogin: true }));
      Cookies.set("token", response.data.refreshToken, {
        expires: 1,
      });
      navigation("/dashboard/admin");
    } catch (err) {
      console.log({ login: err });
    }
  };
  useEffect(() => {
    if (statusLogin) navigation("/dashboard/admin");
  }, []);
  return (
    <div className="flex justify-center mt-4 items-center md:min-h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Log In
        </Typography>
        <Typography variant="paragraph" className="text-sm" color="blue-gray">
          Continue for login as Admin
        </Typography>
        <form
          onSubmit={hadelLogin}
          className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              placeholder="Username"
              onChange={(e) => setUser(e.target.value)}
            />
            <Input
              type="password"
              size="lg"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <Button
            className="mt-4 bg-sky-400 hover:bg-sky-600 transition-all"
            fullWidth
            type="submit"
          >
            Log In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
