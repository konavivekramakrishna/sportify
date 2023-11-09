import LiveMatches from "../components/LiveMatches/LiveMatches";
import { Appbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

import { Articles } from "../components/SportArticles";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Home() {
  return (
    <div style={{ overflowY: "auto", height: "100vh" }}>
      <Appbar />

      <ErrorBoundary>
        <LiveMatches />
      </ErrorBoundary>

      <ErrorBoundary>
        <Articles />
      </ErrorBoundary>

      <Outlet />
    </div>
  );
}
