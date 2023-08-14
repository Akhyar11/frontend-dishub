import React from "react";
import User from "./layouts/user";
import Admin from "./layouts/admin";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useLogin } from "./utils/ceklogin";

function App() {
  const statusLogin = useSelector((state) => state.admin.statusLogin);
  useLogin();
  return <>{!statusLogin ? <User /> : <Admin />}</>;
}

export default App;
