import LiveMatches from "../components/LiveMatches/LiveMatches";
import { Appbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

import { Articles } from "../components/SportArticles";

export default function Home() {
  return (
    <div style={{ overflowY: "auto", height: "100vh" }}>
      <Appbar />
      <LiveMatches />
      <div className=" ">
        <div className=" ">
          <Articles />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
