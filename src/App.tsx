import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./router";

import Home from "./pages/Home";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
