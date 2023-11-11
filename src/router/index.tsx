import React, { Suspense } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
const ResetPassword = React.lazy(() => import("../components/ResetPassword"));
const Preferences = React.lazy(() => import("../components/Preferences"));
const Signout = React.lazy(() => import("../components/Signout"));
const Error = React.lazy(() => import("../components/404Error"));

const ArticleModal = React.lazy(
  () => import("../components/SportArticles/SportsArticleModal"),
);

const LoginAndSignUp = React.lazy(() => import("../pages/LoginAndSignUp"));

const Home = React.lazy(() => import("../pages/Home"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: "article/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <ArticleModal />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "preferences",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Preferences />
          </Suspense>
        ),
      },

      {
        path: "resetpassword",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/signout",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Signout />,
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginAndSignUp />
      </Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Error />
      </Suspense>
    ),
  },
]);

export default routes;
