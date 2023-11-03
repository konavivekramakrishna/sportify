import { Navigate } from "react-router-dom";

import React, { useEffect } from "react";
import { UserContext } from "../context/user";

export default function Signout() {
  const { setUser } = React.useContext(UserContext);

  useEffect(() => {
    setUser(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("userData");
  }, []);

  return <Navigate to={"/home"} />;
}
