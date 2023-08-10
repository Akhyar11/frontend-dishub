import React from "react";
import User from "./layouts/user";
import { useState } from "react";
import Admin from "./layouts/admin";

function App() {
  const [isAdmin, setAdmin] = useState(true);
  return <>{!isAdmin ? <User /> : <Admin />}</>;
}

export default App;
