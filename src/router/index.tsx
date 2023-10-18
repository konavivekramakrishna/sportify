import React, { Suspense } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";

const LoginAndSignUp = React.lazy(() => import("../pages/LoginAndSignUp"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginAndSignUp />
      </Suspense>
    ),
  },
]);

export default routes;
