import LiveMatches from "../components/LiveMatches/LiveMatches";
import { ComplexNavbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

import { Articles } from "../components/SportArticles";

export default function Home() {
  return (
    <>
      <ComplexNavbar />
      <LiveMatches />
      <Articles />
      <Outlet />
    </>
  );
}
