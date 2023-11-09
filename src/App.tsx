import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./router";
import { UserProvider } from "./context/user";
import { TeamProvider } from "./context/teams";
import { SportProvider } from "./context/sports";
function App() {
  return (
    <>
      <UserProvider>
        <TeamProvider>
          <SportProvider>
            <RouterProvider router={routes} />
          </SportProvider>
        </TeamProvider>
      </UserProvider>
    </>
  );
}

export default App;
